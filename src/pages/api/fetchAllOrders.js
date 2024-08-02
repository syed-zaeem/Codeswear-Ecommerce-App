import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  let orders = await Order.find();
//   console.log("These are Products in backend api : " , products)
  res.status(200).json({ orders });
};

export default connectDb(handler);
