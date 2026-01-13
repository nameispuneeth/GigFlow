const express = require("express");
const app = express();
const port = 8000;
const mongoose=require("mongoose");
const cors=require("cors");
const dotenv=require("dotenv");
const User=require("./models/user.model");
const bcrypt=require("bcrypt");

dotenv.config();
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://localhost:27017/GigFlow")

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
        return res.send({status:'ok'});
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