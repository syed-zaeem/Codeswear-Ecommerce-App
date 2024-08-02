import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  let orders = await Order.find();

  let totalRevenue = 0

  orders.map((order)=>{
    totalRevenue += order.amount
  })

  console.log("These are Products in backend api : " , totalRevenue)
  res.status(200).json({ totalRevenue });
};

export default connectDb(handler);
