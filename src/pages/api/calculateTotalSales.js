import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";
import Order from "../../../models/Order";

const handler = async (req, res) => {
  let orders = await Order.find();

  let totalQuantity = 0

  orders.map((order)=>{
    Object.keys(order.products).map((k)=>{
        // console.log(order.amount , order.products[k].qty)
        totalQuantity += order.products[k].qty
    })
  })

  console.log("These are Products in backend api : " , totalQuantity)
  res.status(200).json({ totalSales: totalQuantity });
};

export default connectDb(handler);
