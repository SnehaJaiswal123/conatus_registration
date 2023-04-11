const mongoose=require('../db/mongoose');
const verifySchema=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:Number
    }
})

const verifyModel=mongoose.model('verifymodel',verifySchema);
module.exports=verifyModel;