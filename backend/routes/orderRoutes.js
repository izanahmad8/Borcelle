import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  listOrders,
  placeOrder,
  updateStatus,
  userOrder,
} from "../controllers/orderController.js";
import verifyPayment from "../controllers/paymentController.js";

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/payment", authMiddleware, verifyPayment);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
orderRouter.post("/status", updateStatus);

export default orderRouter;
