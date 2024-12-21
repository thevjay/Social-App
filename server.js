const express=require('express')
const connectDB=require('./config/database');
const app=express();
const cookieParser=require('cookie-parser')

const authRouter=require('./routes/authRouter')
const profileRouter=require('./routes/profileRouter')
const request=require('./routes/request')
const userRoute=require('./routes/userRouter')

//EP-8
//middlewares
//the req.body is sent over the json data format  but the server not able to READ the JSON data;
//To READ that JSON Data we will need a (middleware) means i will have to use it for all  my  API's that can check the incoming req  and convert the JSON into JSON 
//it can just read the JSON data  convert into the JSON put into the req.body give the access to the over here
//
//(use) method means- if i pass in a function over here what will happend
//this function req.handler will on run every request 

app.use(express.json());
app.use(cookieParser());


app.use('/',authRouter)
app.use('/',profileRouter)
app.use('/',request)
app.use('/',userRoute)







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