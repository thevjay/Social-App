const mongoose=require('mongoose')

const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://vijay930:pXq5tMSejMp4fq7t@cluster0.qyuho.mongodb.net/devTinder") 
}

module.exports=connectDB;
