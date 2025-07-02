import express from 'express';
import {
  addToCart,
  fetchUserCatrData,
  removeToCart,
} from "../controllers/cartController.js";

const cartRoute = express.Router();

cartRoute.post("/add", addToCart);
cartRoute.post("/remove", removeToCart);
cartRoute.post("/get", fetchUserCatrData);

export default cartRoute;