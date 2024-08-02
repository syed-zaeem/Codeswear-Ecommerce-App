import User from "../../../models/User";
import mongoose from "mongoose";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  let customers = await User.find();
//   console.log("These are Products in backend api : " , products)
  res.status(200).json({ customers });
};

export default connectDb(handler);
