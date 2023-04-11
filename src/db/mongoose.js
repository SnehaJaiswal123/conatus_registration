const mongoose=require('mongoose');
mongoose.connect('mongodb+srv://snehajais270703:EIzXxruWjOVodLgO@cluster0.3pmqhsa.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log("db connected successfully")
})
.catch((err)=>{
    console.log(err);
})
module.exports=mongoose;