const mongoose=require("mongoose");
const gigs=new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    postedBy:{type:String,required:true},
    budget:{type:Number,required:true},
    status:{type:String,default:"open"},
    assignedto:{type:String,default:null},
    bids:[{type:mongoose.Schema.Types.ObjectId,ref:"Bids"}]
})
module.exports=mongoose.model("Gigs",gigs);