import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

//token generation
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

//login user

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  //validating email and password
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Invalid email" });
  }
  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "Email doesn't exists" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Enter the correct password",
      });
    }

    const token = generateToken(user._id);
    res.json({ success: true, message: "Login successful", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//Register User

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({ success: false, message: "All fields are required" });
  }

  //validating email and password
  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Invalid email" });
  }
  if (password.length < 8) {
    return res.json({
      success: false,
      message: "Password must be at least 8 characters",
    });
  }

  //checking if user already exist
  const existUser = await userModel.findOne({ email });
  if (existUser) {
    return res.json({ success: false, message: "email already exist" });
  }
  //hashing password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  try {
    const user = await newUser.save();
    const token = generateToken(user._id);
    res.json({ success: true, message: "User successfully register", token });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

export { loginUser, registerUser };
