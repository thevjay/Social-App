const express=require('express')
const route=express.Router()
const {userAuth}=require("./middleware/auth")


route.post('/sendConnectionRequest',userAuth,async(req,res)=>{
    try{
        const user=req.user;
        //sending a connection request
        console.log(user.firstName + "Sending a connection request")

        res.send("Connection Request Sent !!")
    }
    catch(error){

    }
})


module.exports=route;