const jwt =require('jsonwebtoken')
const User=require('../models/user')

const userAuth=async(req,res,next)=>{

    try{
    //Read the token from the reg cookies
    const {token}=req.cookies;

    const decodedObj=await jwt.verify(token,"fsd")
    //validate the token


    const {_id}=decodedObj;

    const user=await User.findById(_id);

    if(!user){
        throw new Error("User not found")
    }
    next(); //is called to move the request handler
    //Find the user
    }catch(error){
        res.status(400).send("Error :" + error.message)
    }

};

module.exports={userAuth};