const express=require("express");
const router=express.Router();
const {handlegetallusers,handlegetuserbyid,handleupdateuserbyid,handledeleteuserbyid,handlecreateuser}=require("../controllers/user")

router.get('/',handlegetallusers);
// router.get('/users',async(req,res)=>{
//     const allUsers=await User.find({});
//     const html=`
//     <ul>
//     ${allUsers.map((user)=>`<li>${user.firstname}-${user.email}</li>`)}
//     </ul>
//     `;
//     res.send(html);
// })

router
.route('/:id')
.get(handlegetuserbyid)
.patch(handleupdateuserbyid)
.delete(handledeleteuserbyid)



router.post('/',handlecreateuser)

module.exports=router