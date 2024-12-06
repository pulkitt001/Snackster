import express from "express"
import { addToCart, removeFromCart, getCart } from "../controllers/cartController.js"

//mimddleware
import authMiddleware from "../middlewares/Auth.js";

const cartRouter=express.Router();

cartRouter.post("/add",authMiddleware,addToCart);
cartRouter.post("/remove",authMiddleware,removeFromCart);
cartRouter.post("/get",authMiddleware,getCart);

export default cartRouter;