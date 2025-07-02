import userModel from "../models/userModel.js";

//add item to user cart
const addToCart= async (req,res)=>{
    const {id}=req.body;
    console.log("iddddd",id);
    console.log(req.body.itemId);
    try{
        const userData = await userModel.findById(id);
        console.log(userData);
        let cartData = userData.cartData;
        if(!cartData[req.body.itemId]){
            cartData[req.body.itemId] = 1;
        }else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate({_id: req.body.id},{cartData});
        res.status(200).json({message: "Item added to cart", success: true});
    }catch(err){
        console.log("Error in add to cart:", err);
        res.status(500).json({message: "Internal server error", success: false});
    }
}

//remove item to user cart
const removeToCart = async (req,res) => {
    const {id} = req.body;
    console.log(id);
    try{
        const userData = await userModel.findById(id);
        let cartData = await userData.cartData;
        if(cartData[req.body.itemId] > 0){
            cartData[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.id,{cartData});
        res.status(200).json({message: "Item removed from cart", success: true});
    }catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error from remove to cart", success: false});
    }
   

};

//fetch to user cart item
const fetchUserCatrData = async (req, res) => {
  try {
    const { id } = req.body;
    const userData = await userModel.findById(id);

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData; // no await needed
    res.json({ success: true, cartData });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ message: "Error in fetching cart data", success: false });
  }
};

export { addToCart, removeToCart, fetchUserCatrData };