import express from "express";
import { listOrder, placeOrder, updateOrderStatus, userOrder, verifyOrder } from "../controllers/orderController.js";

import authMiddelware from "../middleware/auth.js";

const orderRouter = express.Router();

orderRouter.post('/place-order',authMiddelware,placeOrder);
orderRouter.post('/orderConfirm',verifyOrder)

orderRouter.post('/user-orders',authMiddelware,userOrder);
orderRouter.get('/list',listOrder);
orderRouter.put('/status',updateOrderStatus);

export default orderRouter;