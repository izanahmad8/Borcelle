import userModel from "../models/userModel.js";

//add items to user cart

const addToCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "user not found" });
    }
    let cartData = await userData.cartData;
    if (!cartData[itemId]) {
      cartData[itemId] = 1;
    } else {
      cartData[itemId] += 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Added to cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove items from the cart

const removeFromCart = async (req, res) => {
  const { userId, itemId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    if (cartData[itemId] > 0) {
      cartData[itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Remove from cart" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//fetch user cart data

const getCart = async (req, res) => {
  const { userId } = req.body;
  try {
    let userData = await userModel.findById(userId);
    let cartData = await userData.cartData;
    res.json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.json({ success: true, message: "Error" });
  }
};

export { addToCart, removeFromCart, getCart };
