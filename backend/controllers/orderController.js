import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";



//placing user model in frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5173";
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  try {
    const newOrder = new orderModel({
      userId: req.body.id,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.id, { cartData: {} });
    const lineItem = req.body.items.map((item) => {
      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100 * 80,
        },
        quantity: item.quantity,
      };
    });

    lineItem.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery charge",
        },
        unit_amount: 10 * 100 ,
      },
      quantity: 1,
    });
    const session = await stripe.checkout.sessions.create({
      line_items: lineItem,
      mode: "payment",
      success_url: `${frontend_url}/orderConfirm?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/orderConfirm?success=false&orderId=${newOrder._id}`,
    });
    res.status(200).json({
      message: "Order placed successfully",
      success: true,
      session_url: session.url,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: " Error in place order", success: false });
  }
};


const verifyOrder = async (req, res) => {
  try{
    const {orderId, success} = req.body;
    if(success==="true"){
      await orderModel.findByIdAndUpdate(orderId,{payment: true});
      res.status(200).json({ message: "Order verified successfully", success: true });
    }else{
      await orderModel.findByIdAndDelete(orderId);
      res.status(200).json({ message: "Order not verified", success: false });
    }

  }catch(err){
    console.log(err);
    res.status(500).json({ message: " Error in verify order", success: false });
  }
};

const userOrder = async (req, res) => {
  try {
    const userId = req.body.id;
    console.log("iddfcg-", userId);

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized", success: false });
    }

    const orders = await orderModel.find({ userId });
    res.status(200).json({ data: orders, success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error in user order", success: false });
  }
};


//listing order for admin 
const listOrder = async (req, res) => {
  try{
    const orders = await orderModel.find({});
    res.status(200).json({ data: orders, success: true });

  }catch(err){
    console.log(err);
    res.status(500).json({ message: " Error in list order", success: false });
  }
  
}

//updating status of order 
const updateOrderStatus = async (req, res) => {
  try{
    await orderModel.findByIdAndUpdate(req.body.id,{status: req.body.status});
    res.status(200).json({ message: "Order status updated successfully", success: true });
  }catch(err){
    console.log(err);
    res.status(500).json({ message: " Error in update order status", success: false });
  }
}
export { placeOrder, verifyOrder, userOrder, listOrder, updateOrderStatus };
