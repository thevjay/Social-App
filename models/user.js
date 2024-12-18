const mongoose=require('mongoose')
const validator=require("validator")

const userSchema= new mongoose.Schema({
    firstName:{
        type:String,
        required:true , //required field is takes boolen or fun return boolen it is used to create a document on db mandotary fields 
        minlength:4,
        maxlength:50
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        validate(value){
            if(validator.isEmail(value)){
                throw new Error("Invalid email address" + value)
            }
        }
    },
    password:{
        type:String,
        required:true,
        validate(value){
            if(validator.isStrongPassword(value)){
                throw new Error("Invalid password value" + value)
            }
        }
    },
    age:{
        type:String,
        min:18,
    },
    gender:{
        type:String,
        validate(value){
            if(["male","famale","others"].includes(value)){
                throw new Error("Gender data is not validate")
            }
        }
    },
    photoUrl:{
        type:String,
        default:'www.google.com',
        validate(value){
            if(validator.isURL(value)){
                throw new Error("It is not valid String")
            }
        }
    },
    about:{
        type:String,
        default: "This is a default about of the User"
    },
    skills:{
        type:[String],
    }
},{timestamps : true})

module.exports=mongoose.model("User",userSchema);

