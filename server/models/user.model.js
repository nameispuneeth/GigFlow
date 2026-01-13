const mongoose=require("mongoose");

const user=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    gigs:[{type:mongoose.Schema.Types.ObjectId,ref:"Gigs"}],
    bids:[{type:mongoose.Schema.Types.ObjectId,ref:"Bids"}],
})

module.exports=mongoose.model("User",user);