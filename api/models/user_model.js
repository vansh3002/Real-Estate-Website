import mongoose  from "mongoose";
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },   
    password:{
        type:String,
        required:true,
    },
    avatar:{
        type:String,
        dafault:"https://w0.peakpx.com/wallpaper/979/89/HD-wallpaper-purple-smile-design-eye-smily-profile-pic-face-thumbnail.jpg"
    }    
},{timestamps:true});//IT WILL WRITE TIME OF CREATION OF USER AND ALSO TIME OF UPDATE OF USER

const User=mongoose.model('User',userSchema)

export default User;
