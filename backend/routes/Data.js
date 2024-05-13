
const express=require("express");
const { middleware } = require("../middleware");
const { Score, User } = require("../db");
const router =express.Router()
require("dotenv").config();
const key=process.env.SECRET_KEY;

//add wpm
router.post("/add",middleware,async(req,res)=>{
const userId=req.userId;
const data=req.body;


const user=await Score.findOne({id:userId})
if(!user){
    res.status(400).json({
        message:"user not found"
    })
}
console.log(user)

const wpm=user.wpm;
if(wpm<=data.wpm){
await Score.updateOne({_id:user._id},
        {
            $set:{
                wpm:data.wpm,
                accuracy:data.accuracy
            }
        })
return res.json({
    message:"new Highest record"+data.wpm+"WPM"
})}

})

//get wpm for single
router.get("/score",middleware,async(req,res)=>{
    const userId=req.userId;
    const user=await Score.findOne({id:userId})
    if(!user){
        res.status(400).json({
            message:"user not found"
        })
        return
    }
    const U=await User.findOne({_id:userId})
    

    res.json({
        message:"user found",
        wpm:user.wpm,
        accuracy:user.accuracy,
        name:U.name
    })
}) 

module.exports=router