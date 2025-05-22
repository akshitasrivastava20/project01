const express=require("express");
const app=express();
const PORT=8000;
const users=require("./MOCK_DATA.json")
const fs=require('fs');
const mongoose=require('mongoose');
const { type } = require("os");
const { timeStamp } = require("console");
//connection
mongoose
.connect('mongodb://127.0.0.1:27017/youtube-app-1')
.then(()=>console.log("mongodb connected"))
.catch((err)=>console.log("Mongo error",err))


//Schema
const userSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,

    },
    email:{
        type:String,
        required:true,
        unique:true,

    },
    jobtitle:{
        type:String,
    },
    gender:{
        type:String
    }
},
{timestamps:true});
//model
const User=mongoose.model("user",userSchema);


//middleware
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    fs.appendFile("./log.txt",`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
      next();
    })
  
});




app.get('/api/users',(req,res)=>{
   
    console.log(req.headers);
    res.setHeader('X-myName',"Akshuububu");
    //always add x to custom header
    return res.json(users);
})
app.get('/users',(req,res)=>{
    const html=`
    <ul>
    ${users.map((user)=>`<li>${user.first_name}</li>`)}
    </ul>
    `;
    res.send(html);
})

app
.route('/api/users/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id)
    if(!user)return res.status(404).json({error:"user not found"})
    return res.json(user);

})
.patch((req,res)=>{
    //edit user

    return res.send("pending");

})
.delete((req,res)=>{
    //delete user
    return res.send("pending");
})




app.post('/api/users',async(req,res)=>{
    //create a new user
    const body=req.body
    if(!body||!body.first_name||!body.last_name||!body.email||!body.gender||!body.job_title){
        return res.status(400).json({msg:"all req"});
    }
    const result= await User.create({
        firstname:body.first_name,
        lastname:body.last_name,
        email:body.email,
        gender:body.gender,
        jobtitle:body.job_title,
    })
    console.log(result);
    return res.status(201).json({status:"success"});

    // users.push({...body,id: users.length+1});
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    // return res.status(201).json({status:"success",id:users.length});
    // })
    

})






app.listen(PORT,()=>console.log("Server is running"));
