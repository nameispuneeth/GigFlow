const mongoose=require("mongoose");
const bids=new mongoose.Schema({
    title:{type:String,required:true},
    message:{type:String,required:true},
    price:{type:String,required:true},
    gig:{type:mongoose.Schema.Types.ObjectId,ref:"Gigs"}
})
module.exports=mongoose.model("Bids",bids);