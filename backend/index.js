const express=require("express")
const cors=require("cors");
const user = require("./routes/user");
const data =require("./routes/Data")
const app=express()
app.use(cors());
const port=4000;
app.use(express.json());

app.get("",(req,res)=>{
    res.json({
        data:"hello"
    })
    console.log("hello")
})
app.use("/user",user)
app.use("/score",data)

app.listen(port,()=>{
    console.log("port running on "+port);
})
