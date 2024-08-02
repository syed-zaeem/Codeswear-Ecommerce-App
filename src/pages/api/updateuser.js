// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var jsonwebtoken = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    // console.log("The user is: ", user);
    let foundedUser = await User.findOneAndUpdate(
      { email: user.email },
      {
        address: req.body.address,
        pincode: req.body.pincode,
        phone: req.body.phone,
        name: req.body.name,
      }
    );
    
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
