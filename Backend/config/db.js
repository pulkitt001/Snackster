import mongoose from "mongoose"


export const connectDB=async()=>{
    await mongoose.connect('mongodb+srv://pulkitpal0001:1teKc0wWp83y0fFk@cluster0.sjscg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(()=>console.log("DB connected"));
}
