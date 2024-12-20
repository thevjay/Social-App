const express=require('express')
const route=express.Router()
const {userAuth}=require("./middleware/auth");
const ConnectionRequest = require('../models/connectionRequest');
const User=require('../models/user')


route.post('/request/send/:status/:toUserId',userAuth,async(req,res)=>{
    try{
        const fromUserId=req.user._id;
        const toUserId=req.params.toUserId;
        const status=req.params.status;

        const allowedStatus=["ignored","interested"]
        if(!allowedStatus.includes(status)){
            return res.json({message:"Invalid status type :",status})
        }

        

        const toUser= await User.findById(toUserId);
        if(!toUser){
            return res.status(404).json({
                success:true,
                message:"User not found! "
            })
        }


        //if there is an existing ConnectionRequest
        const existingConnectionRequest=await ConnectionRequest.findOne({
            $or:[
                {fromUserId,toUserId},
                {fromUserId:toUserId,toUserId:fromUserId},
            ],
        })


        if(!existingConnectionRequest){
            return res.status(400).send({
                message:"Connection Request Already Exists!!"
            })
        }

        const connectionRequest=new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        })

        const data=await connectionRequest.save();


        //sending a connection request

        res.json({
            message: req.user.firstName + "is" + status + "in" +toUser.firstName,
            data,
        })
    }
    catch(error){
        res.send("Error in :" + error)
    }
})




module.exports=route;