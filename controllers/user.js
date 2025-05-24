const User=require("../models/user")

async function handlegetallusers(req,res) {
    const allUsers=await User.find({});

    
    
    //always add x to custom header
    return res.json(allUsers);
    
}

async function handlegetuserbyid(req,res) {
    const user=await User.findById(req.params.id);
    // const id=Number(req.params.id);
    // const user=users.find(user=>user.id===id)
    if(!user)return res.status(404).json({error:"user not found"})
    return res.json(user);
}

async function handleupdateuserbyid(req,res) {
     await User.findByIdAndUpdate(req.params.id,{firstname:"buba"});

     return res.send("success");

    
}

async function handledeleteuserbyid(req,res) {
      await User.findByIdAndDelete(req.params.id);
      return res.send("success");
    
}

async function handlecreateuser(req,res) {
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
    return res.status(201).json({status:"success",id:result.id});
    
}
module.exports={
   handlegetallusers,
   handlegetuserbyid,
   handleupdateuserbyid,
   handledeleteuserbyid,
   handlecreateuser,

}