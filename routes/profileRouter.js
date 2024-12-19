const express=require("express")
const route=express.Router();
const {userAuth} =require('../middleware/auth')



route.get('/profile',userAuth,async(req,res)=>{
    try{

        // const cookies=req.cookies;

        // const {token}=cookies;

        // if(!token){
        //     throw new Error("Invalid Token")
        // }

        // //validation my token
        // //verify(token,secret key)
        // const decodedMessage=await jwt.verify(token,"kjbfkjdbkjds")  

        // const { _id }=decodedMessage;

    

        // const user=await User.findById(_id)

        const user=req.user;

        res.send(user)
    }
    catch(error){

    }
})

module.exports=route;