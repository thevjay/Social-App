const express=require('express')

const app=express();


app.use('/user',(req,res,next)=>{
    console.log("Handleing the route user!!")
    res.send("Response");
    next();
},(req,res)=>{
    console.log("Handleing the route user 2!!")
    res.send("2nd Response")
})

app.listen(7777,()=>{
    console.log('Server is successfully listening on port 7777...')
})


