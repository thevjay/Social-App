const express=require('express')
const connectDB=require('./config/database');
const app=express();
const User=require('./models/user')

//EP-8
//middlewares
//the req.body is sent over the json data format  but the server not able to READ the JSON data;
//To READ that JSON Data we will need a (middleware) means i will have to use it for all  my  API's that can check the incoming req  and convert the JSON into JSON 
//it can just read the JSON data  convert into the JSON put into the req.body give the access to the over here
//
//(use) method means- if i pass in a function over here what will happend
//this function req.handler will on run every request 

app.use(express.json())

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

app.get('/user',async(req,res)=>{
    const userEmail=req.body.email
    try{
        // {} - it is a filter it is take a filter
        const users=await User.find({ emailId : userEmail})
        if(!users){
            res.status(404).send("User did not Found")
        }else{
            res.send(users);
        }
        
    }catch(error){
        res.status(400).send("Something went Wrong")
    }
})

//Feed API - GET / feed - get all the users from the database
app.get('/feed',async(req,res)=>{
    try{
        const users=await User.find({})

        res.send(users)
    }catch(error){
        res.status(400).send("Something went Wrong")
    }
})


app.delete('/user',async(req,res)=>{
    try{

        const userId=req.body.userId;

        const user=await User.findByIdAndDelete({ _id : userId })

        res.send('User deleted successfully')
    }
    catch(error){
        res.send("Somthing went wrong")
    }
})


app.patch('/user/:userId',async(req,res)=>{
    const data= req.params?.userId;
    const userId= req.body.userId;

    const ALLOWED_UPDATES=["photoUrl","about","gender","age","skills"];

    //{
        // "userId":"1234",
        // "emailId":".com",
        // "gender":"m",
        // "skills":"c++",
        // "xyz":"sk"
    //}

    const isUpdateAllowed=Object.keys(data).every((k)=>{
        ALLOWED_UPDATES.includes(k)
    })

    if(!isUpdateAllowed){
        throw new Error("Update not allowed")
    }

    if(data?.skills.length > 10){
        throw new Error("Skills cannot be more than 10")
    }
    try{
        await User.findByIdAndUpdate({_id:userId}, ...data)

        res.send("User updated Successfully")
    }catch(error){
        res.status(400).send("Something went wrong ")
    }
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



