const express=require('express');
const nodemailer=require('nodemailer')
const router=express.Router();
require('dotenv').config()
const verifyModel=require('../model/verifymodel');
const getRandomNumber=(max)=>{
    return Math.floor(Math.random()*max);
}

const sendOtp=async(req,res)=>{
   try{
    const email=req.body.email;
    const otp=getRandomNumber(10000);
    if(otp<1000){
        otp=otp+1000;
    }
    const existinguser=await verifyModel.findOne({email:email})
    if(existinguser){
        res.status(409).json({
            message:"user already registered"
        })
        throw new err;
    }
    const user=await verifyModel.create({email:email,otp:otp});
    const id=user.id;
    var transporter = nodemailer.createTransport({
        service: "gmail",
        port: 587,
        auth: {
          user: process.env.AUTH_EMAIL, 
          pass: process.env.AUTH_PASS, 
        },
      });
      const data={
        from: '"Sneha Jaiswal" <sneha2112046@akgec.ac.in>',  
        to:email,
        subject: "User verification", 
        text: "Hello!", 
        html: `<b>Your OTP is:${otp}</b>`,          
       }
       transporter.sendMail(data,async(error,info)=>{
        if(error){
            throw new error;
        }
            console.log("email sent",info.messageId);
            res.json({
                message:"mail sent",
                id:id
            })
       });
   }
   catch(e){
     console.log(e);
   }  
}

const verifyOtp=async(req,res)=>{
    try{
        const { email , otp } = req.body;

        const user=await verifyModel.findOne({email:email});
        if(user){
            const userOtp=user.otp;
            if(otp==userOtp){
                console.log("user verified");
                res.status(200).json({
                    message:"user verified"
                })
            }
            else{
                console.log("Otp doesn't match");
                res.status(401).json({
                    message:"Otp doesn't match"
                })
            }
        }
    }
    catch(e){
        console.log(e);
    }
}

router
.route('/sendotp')
.post(sendOtp)

router
.route('/verifyotp')
.post(verifyOtp)

module.exports=router;