const mongoose=require("mongoose");

const userModel= mongoose.Schema({
    name:String,
    age:Number,
    email:String,
    password:String
},{
    collection:"userData",
    versionKey:false
})

const usersModel=mongoose.model("userData",userModel);

module.exports=usersModel;