const express=require("express")
const router=express.Router();

const jwt=require("jsonwebtoken");
const { UserSignup } = require("../middleware");
const { User } = require("../db");
const secret=process.env.SECRET_KEY;

router.get("/",(req,res)=>{
    res.json({
        data:"hello form user"
    })
    console.log("hello from user")
})
//user signup
router.post("/signup",async (req,res)=>{
let data=req.body;

try{
    data=await UserSignup.parseAsync(data);
    console.log(data)
    if(!data){
        res.json({
            message:data
        })
        return
    }
    let user=await User.findOne({
        email:data.email,
        password:data.password
    })
    console.log(user)
    if(user){
        res.json({
            message:"User already exists"
        })
        return
    }
    user =await User.create({
        name:data.name,
        email:data.email,
        password:data.password
    })
    res.json({
        message:"User created",
        data:user
    })

}catch(err){
    res.json({
        message:"somehting went wrong"
    })
}

})


//user login
router.post("/login",(req,res)=>{

})

//get score table



module.exports={router}