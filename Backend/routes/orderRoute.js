import express from "express"
import authMiddleware from "../middlewares/Auth.js"
import { placeOrder, verifyOrder, userOrders, listOrders, updateStatus } from "../controllers/orderController.js"

const orderRouter=express.Router();



//end points
orderRouter.post("/place",authMiddleware,placeOrder);

orderRouter.post("/verify",verifyOrder);

orderRouter.post("/userorders",authMiddleware,userOrders)

orderRouter.get('/list',listOrders)

orderRouter.post("/status",updateStatus)

export default orderRouter;