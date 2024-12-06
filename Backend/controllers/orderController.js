import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)



//Placing user order from frontend

const placeOrder=async (req,res)=>{

    const frontend_url= "https://snackster.onrender.com"
    
    

    try {
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>({  //line_items is necessary for the stripe payments
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{                                  //Whatever item we get from the user we are using that item and we are creating this line_items that is necessary for stripe payments
                    name:"Delivery Charges"
                },
                unit_amount:20*100                                   
            },
            quantity:1
        })

        const session= await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:'payment',
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}` ,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })
        res.json({success:true,session_url:session.url});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
// for verifying the order Payment
const verifyOrder=async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true")
        {
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,message:"Paid"});
        }
        else {
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,message:"Not Paid"})
        }
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}
// User Orders for Frontend
//we can send the users order using api
const userOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({userId:req.body.userId})
        res.json({success:true,data:orders});
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}


//listing orders for admin panel
//In admin panel we want to all orders from all the users

const listOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(errror);
        res.json({success:false,message:"Error"});
    }
}

//api for updating Order Status

const updateStatus=async(req,res) =>{
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}




export {placeOrder,verifyOrder,userOrders,listOrders,updateStatus}