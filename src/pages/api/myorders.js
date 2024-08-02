import Order from "../../../models/Order";
import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";
var jasonwebtoken = require("jsonwebtoken");

const handler = async (req, res) => {
  const token = req.body.token;
  const data = jasonwebtoken.verify(token, process.env.JWT_SECRET);
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders });
};

export default connectDb(handler);
