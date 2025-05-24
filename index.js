const express=require("express");

const PORT=8000;



const mongoose=require('mongoose');

const userRouter=require("./routes/user");
const {connectMongoDb}=require("./connection");
const {logReqRes}=require("./middlewares")


//connection

connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-1")
// mongoose
// .connect('mongodb://127.0.0.1:27017/youtube-app-1')
// .then(()=>console.log("mongodb connected"))
// .catch((err)=>console.log("Mongo error",err))





//middleware
app.use(express.urlencoded({extended: false}));

// app.use((req,res,next)=>{
//     fs.appendFile("./log.txt",`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
//       next();
//     })
  
// });
app.use(logReqRes("log.txt"))
app.use("/user",userRouter);








app.listen(PORT,()=>console.log("Server is running"));
