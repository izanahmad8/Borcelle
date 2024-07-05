import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Razorpay from "razorpay";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_KEY,
});

//placing user order

const placeOrder = async (req, res) => {
  const { userId, items, amount, address } = req.body;
  try {
    const newOrder = new orderModel({
      userId: userId,
      items: items,
      amount: amount,
      address: address,
    });
    await newOrder.save();

    const options = {
      amount: amount * 100, // amount in the smallest currency unit (paisa for INR)
      currency: "INR",
      receipt: newOrder._id.toString(), // Use order ID as the receipt ID
    };

    const razorpayOrder = await instance.orders.create(options);

    if (!razorpayOrder) {
      return res.json({ success: false, message: "Order creation failed" });
    }
    //clear cart data
    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in placing order" });
  }
};

//user order for frontend

const userOrder = async (req, res) => {
  const { userId } = req.body;
  try {
    const orders = await orderModel.find({ userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//listing order for admin panel

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//order status update

const updateStatus = async (req, res) => {
  const { orderId, status } = req.body;
  try {
    await orderModel.findByIdAndUpdate(orderId, { status: status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { placeOrder, userOrder, listOrders, updateStatus };
