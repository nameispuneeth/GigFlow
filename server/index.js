const express = require("express");
const app = express();
const port = 8000;
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser=require("cookie-parser");

const User=require("./models/user.model");
const Gig=require("./models/gigs.model");
const Bid=require("./models/bids.modal")
const secretCode="ThisisASecretCode";


dotenv.config();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(cookieParser());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/GigFlow")

function authMiddleWare(req,res,next){
    try{
        const encryptedEmail=req.cookies.email;
        const decoded=jwt.verify(encryptedEmail,secretCode);
        req.user=decoded;
        next();
    }catch(e){
        res.send({status:'error',error:'Session Expired'});
    }
}

app.post("/api/auth/register",async(req,res)=>{
    const {name,email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(user) return res.send({status:'error',error:'Email Exists'});
        const hashedpassword=await bcrypt.hash(password,10);
        const isMatch=await User.create({email:email,name:name,password:hashedpassword});
        if(!isMatch) return res.send({status:'error',error:'Network Issues'});
        return res.send({status:'ok'});
    }catch(e){
        res.send({status:'error',error:'Network Issues'});
    }
})

app.post("/api/auth/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email:email});
        if(!user) return res.send({status:'error',error:'User Doesnt Exist'});
        const isMatch=await bcrypt.compare(password,user.password);
        if(!isMatch) return res.send({status:'error',error:'Invalid Credintials'});
        const encryptedEmail=jwt.sign({email},secretCode);
        res.cookie("email", encryptedEmail, {
            httpOnly: true,
            secure: false,    
            sameSite: "lax",
            maxAge: 24*60 * 60 * 1000
          });
        return res.send({status:'ok'});
    }catch(e){
        res.send({status:'error',error:'Network Issues'});
    }
})

app.post("/api/gigs",authMiddleWare,async (req,res)=>{
    const {title,desc,budget}=req.body;
    const email=req.user.email;
    try{
        const user=await User.findOne({email:email});
        const gig=await Gig.create({
            title:title,
            description:desc,
            budget:budget,
            postedBy:user.email
        })
        user.gigs.push(gig._id);
        await user.save();
        res.send({status:"ok"});
    }catch(e){
        res.send({status:"error"});    
    }
})
app.get("/api/gigs",async(req,res)=>{
    try{
        const gigs=await Gig.find();
        res.send({status:"ok",gigs:gigs});
    }catch(e){
        res.send({status:'error'});
    }
})

app.get("/api/getusergigs",authMiddleWare,async(req,res)=>{
    const email=req.user.email;
    try{
        const user=await User.findOne({email:email});
        const usergigs=await Gig.find({_id:{$in:user.gigs}});
        res.send({status:'ok',gigs:usergigs});
    }catch(e){
        res.send({status:'error',error:'Network Issues'});
    }
})

app.get("/", (req, res) => {
    res.send("Hello World");
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 