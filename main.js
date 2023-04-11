const express=require('express');
const app=express();
app.use(express.json())
const userRouter=require('./src/router/userrouter')
app.use('/',userRouter)
app.listen(7000,()=>{
    console.log("server is running");
})