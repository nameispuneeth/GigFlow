const mongoose=require("mongoose");
const bids=new mongoose.Schema({
    message:{type:String,required:true},
    price:{type:String,required:true},
    email:{type:String,required:true},
    assigned:{type:Boolean,default:false},
    gig:{type:mongoose.Schema.Types.ObjectId,ref:"Gigs"}
})
module.exports=mongoose.model("Bids",bids);