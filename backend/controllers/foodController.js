import foodModel from "../models/foodModel.js";
import fs from "fs";

//add food item

const addFood = async (req, res) => {
  const img_file = `${req.file.filename}`;
  if (!img_file) {
    return res
      .status(400)
      .json({ message: "Image file is required", success: false });
  }

  const { name, description, price, category } = req.body;
  if (!name || !description || !price || !category) {
    return res
      .status(400)
      .json({ message: "All fields are required", success: false });
  }

  // Number conversion for price, with validation
  const priceNum = Number(price);
  if (isNaN(priceNum) || priceNum < 0) {
    return res
      .status(400)
      .json({ message: "Price must be a positive number", success: false });
  }
  
  const food = new foodModel({
    name: name,
    description: description,
    price: price,
    image: img_file,
    category: category,
  });

  try {
    await food.save();
    res
      .status(201)
      .json({ message: "Food item added successfully", success: true });
  } catch (err) {
    console.error("Error adding food item:", err);
    return res
      .status(500)
      .json({ message: "Internal server error", success: false });
  }
};

//all food items
const listFood = async (req,res) =>{
    try{
        const foodItems = await foodModel.find({});
        res.status(200).json({ data:foodItems, success: true });
    }catch(err){
        console.error("Error listing food items:", err);
        return res
        .status(500)
        .json({ message: "Internal server error", success: false });
    }
}

//remove food items
const removeFood = async (req,res)=>{
  const { foodId } = req.params; 
    console.log("Food ID to remove:", req.params.foodId);

    try{
        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).json({ message: "Food item not found", success: false });
        }
        await fs.promises.unlink(`uploads/${food.image}`,()=>{});
        await foodModel.findByIdAndDelete(foodId);
        res.status(200).json({ message: "Food item removed successfully", success: true });
    }catch(err){
        console.error("Error removing food item:", err);
        return res
        .status(500)
        .json({ message: "Internal server error", success: false });

    }
}

export { addFood, listFood,removeFood };
