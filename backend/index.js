const express=require("express")
const cors=require("cors");
const { router } = require("./routes/user");
require('dotenv').config()
const app=express()
app.use(cors());
const port=3000;
app.use(express.json());

app.get("",(req,res)=>{
    res.json({
        data:"hello"
    })
    console.log("hello")
})
app.use("/user",router)

app.listen(port,()=>{
    console.log("port running on "+{port});
})
