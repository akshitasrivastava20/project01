const mongoose=require('mongoose');

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

module.exports=User;