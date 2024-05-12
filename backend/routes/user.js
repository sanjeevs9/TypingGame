const express = require("express")
const router = express.Router();
const { ZodError } = require("zod")

const jwt = require('jsonwebtoken');
const { UserSignup, UserLogin, middleware } = require("../middleware");
const { User, Score } = require("../db");
require("dotenv").config()
const secret = process.env.SECRET_KEY;

router.get("/", (req, res) => {
    res.json({
        data: "hello form user"
    })
    console.log("hello from user")
})
//user signup
router.post("/signup", async (req, res) => {
    let data = req.body;

    try {
        data = await UserSignup.parseAsync(data);

        if (!data) {
            res.json({
                message: data
            })
            return
        }

        let user = await User.findOne({
            email: data.email,
            password: data.password
        })
        if (user) {
            res.json({
                message: "User already exists"
            })
            return
        }
        user = await User.create({
            name: data.name,
            email: data.email,
            password: data.password
        })

        await Score.create({
            id: user._id,
            wpm: 0,
            accuracy:0
        })
        const userId = user._id;
        const token = await jwt.sign({ userId }, secret)

        res.json({
            message: "User created",
            data: user,
            token
        })

    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({
                message: err.issues[0].message
            })
        } else {
            res.json({
                message: err
            })
        }
    }
})


//user login
router.post("/login", async (req, res) => {
    let data = req.body;
    try {
        data = await UserLogin.parseAsync(data);
        let user = await User.findOne({
            email: data.email,
            password: data.password
        })
        if (!user || user===null) {
            res.status(404).json({
                message: "Invalid email or password"
            })
            return
        }
        const userId = user._id;
        const token = jwt.sign({ userId }, secret);
        return res.json({
            message: "User SignedIn successfully",
            token,
            data: user
        })

    } catch (err) {
        if (err instanceof ZodError) {
            res.status(400).json({
                message: err.issues[0].message
            })
        } else {
            res.json({
                message: "something went wrong"
            })
        }
    }
})

//get user name
router.get("/user",middleware,async(req,res)=>{
    const userId=req.userId;
    try{
        const user=await User.findOne({_id:userId})
        if(!user){
            res.status(404).json({
                message:"user not found"
            })
            return
        }
        res.json({
            message:user.name
        })

    }catch{
        res.status(404).json({
            message:"Something went wrong"
        })
    }
})


module.exports = router 