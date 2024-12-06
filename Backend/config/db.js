import mongoose from "mongoose"


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://ABit908:7320028794@cluster0.wjg1rkg.mongodb.net/food-delivery').then(()=>console.log("DB connected"));
}
