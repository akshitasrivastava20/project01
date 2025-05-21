const express=require("express");
const app=express();
const PORT=8000;
const users=require("./MOCK_DATA.json")
const fs=require('fs');
//middleware
app.use(express.urlencoded({extended: false}));

app.use((req,res,next)=>{
    fs.appendFile("./log.txt",`\n${Date.now()}: ${req.ip}: ${req.method}: ${req.path}`,(err,data)=>{
      next();
    })
  
});




app.get('/api/users',(req,res)=>{
    console.log(req.myUserName);
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




app.post('/api/users',(req,res)=>{
    //create a new user
    const body=req.body
    users.push({...body,id: users.length+1});
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
    return res.json({status:"success",id:users.length})
    })
    

})






app.listen(PORT,()=>console.log("Server is running"));
