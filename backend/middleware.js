const  {z} =require("zod")
require("dotenv").config();
const key=process.env.SECRET_KEY;
const jwt=require("jsonwebtoken")


const UserSignup=z.object({
    name:z
    .string({required_error:"Name is required"})
    .min(1,{message:"Name is required"}),

    email:z
    .string().email({required_error:"email is required"}),

    password:z
    .string({required_error:"password is required"})
    .min(6,{message:"6 digits of pass is required"})
})

const UserLogin=z.object({
    email:z
    .string().email({required_error:"Email is required"}),

    password:z
    .string({required_error:"Password is required"})
    .min(6,{message:"6 digits of pass is required"})
})

const middleware=async(req,res,next)=>{
    let token=req.headers.authorization

    console.log(token+"token")
    
    if(!token || !token.startsWith("Bearer")){
        return res.status(400).json({
            message:"Please Login"
        })
    }
    token=token.split(" ")[1];
    const decoded=await jwt.verify(token,key);
    if(decoded){
        req.userId=decoded.userId;
        next();
    }else{
        res.status(400).json({
            message:"plese login"
        })
    }
}


module.exports={
    UserSignup,UserLogin,middleware
}