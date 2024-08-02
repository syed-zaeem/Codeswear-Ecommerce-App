// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);
    let user = await User.findOne({ email: req.body.email });
    // console.log(user)
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
    let decrytedPass = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decrytedPass) {
        var token = jwt.sign(
          { email: user.email, name: user.name },
          process.env.JWT_SECRET,
          { expiresIn: '2d' }
        );
        res.status(200).json({ success: true, token, role: user.role});
      } else {
        res.status(200).json({ success: false, error: "Invalid Credentials" });
      }
    } else {
      res.status(200).json({ success: false, error: "No user found" });
    }
  } else {
    res.status(400).json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
