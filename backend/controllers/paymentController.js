import crypto from "crypto";
import orderModel from "../models/orderModel.js";

const verifyPayment = async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    orderId,
  } = req.body;
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET_KEY);
  hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    try {
      // Update order payment to true or similar in your database
      const order = await orderModel.findOne({ _id: orderId });
      order.payment = true;
      await order.save();

      res.json({ success: true, message: "Payment verified successfully" });
    } catch (error) {
      console.error("Error updating order status:", error);
      res.json({
        success: false,
        message: "Payment verified but order update failed",
      });
    }
  } else {
    await orderModel.findByIdAndDelete({ _id: orderId });
    res.json({ success: false, message: "Payment verification failed" });
  }
};

export default verifyPayment;
