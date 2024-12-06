import foodModel from "../models/foodModel.js";
import fs from 'fs'  //file System


//add food item

const addFood=async (req,res)=>{
    let image_filename=`${req.file.filename}`;

    const food=new foodModel({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
        category:req.body.category,
        image:image_filename
    })
    try{
        await food.save();
        res.json({success:true,message:"Food Added"})
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// all food list
const listfood=async(req,res)=>{
    try{
        const foods=await foodModel.find({});
        res.json({success:true,data:foods})
    }catch(error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//remove food item
const removefood=async(req,res)=>{
    try {
        const food=await foodModel.findById(req.body.id); // finding foodModel usng by id
        fs.unlink(`uploads/${food.image}`,()=>{}) // delete the image from the floder

        await foodModel.findByIdAndDelete(req.body.id); //food data deleted from the database
        res.json({success:true,message:"Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}







export {addFood,listfood,removefood}