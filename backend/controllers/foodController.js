import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  const { name, description, price, category } = req.body;

  if (!name || !description || !price || !category || !req.file) {
    return res.json({ success: false, message: "All fields are required" });
  }

  let image_filename = `${req.file.filename}`;

  const food = new foodModel({
    name,
    description,
    price,
    category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food added" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//all food list

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//remove food

const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);
    console.log(food);
    if (!food) {
      return res.json({ success: false, message: "Food not found" });
    }
    fs.unlink(`uploads/${food.image}`, () => {});
    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};
export { addFood, listFood, removeFood };
