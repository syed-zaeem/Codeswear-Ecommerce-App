import Product from "../../../models/Product";
import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";
var jasonwebtoken = require("jsonwebtoken");

const handler = async (req, res) => {
  let products = await Product.find();
//   console.log("These are Products in backend api : " , products)
  res.status(200).json({ products });
};

export default connectDb(handler);
