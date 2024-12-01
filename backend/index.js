const express=require("express")
const cors=require("cors");
const user = require("./routes/user");
const data =require("./routes/Data")
const app=express()
app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins or specify your frontend URL
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Allow specific methods
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allow specific headers
//     next();
// });
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
