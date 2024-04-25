const  {z} =require("zod")

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

module.exports={
    UserSignup,UserLogin
}