const express=require('express')
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user')


app.post("/signup",async(req,res)=>{
    const usreObj={
        firstName:"virat",
        lastName:"kohli",
        emailId:"viratkohli@gmail.com",
        password:"123456"

    }

    //Creating a new instance of the User model
    const user=new User(usreObj);
    
    await user.save();
    res.send("User Added Successfully")

})


connectDB()
    .then(()=>{
        console.log("Database connection established...")
        app.listen(7777,()=>{
            console.log('Server is successfully listening on port 7777...')
        })
    })
    .catch((error)=>{
        console.log("Database cannot be connected!!")
    })



