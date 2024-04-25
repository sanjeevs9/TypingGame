const mongoose= require("mongoose")
require("dotenv").config()
const url=process.env.URL;
console.log(url)
mongoose.connect(`${url}`)

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:6
    }
})

const scoreSchema=new mongoose.Schema({
    id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    score:{
        type:Number,
        required:true
    }
})

const User=mongoose.model("User",userSchema);
const Score=mongoose.model("Score",scoreSchema);

module.exports={User,Score};

