const express=require('express');
const app=express();
const cors=require('cors')
app.use(express.json())
app.use(cors({
    origin:"*"
}))
const userRouter=require('./src/router/userrouter')
app.use('/',userRouter)
app.listen(7000,()=>{
    console.log("server is running");
})