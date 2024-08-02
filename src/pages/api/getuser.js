// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var jsonwebtoken = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    console.log("The user is: " , user)
    let foundedUser = await User.findOne({ email: user.email });
    const { name, email, address, pincode, phone } = foundedUser
    // console.log("This is founded user: " , foundedUser)
    res.status(200).json({ name, email, address, pincode, phone });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
