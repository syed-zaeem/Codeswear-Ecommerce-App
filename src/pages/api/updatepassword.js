// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import User from "../../../models/User";
var jsonwebtoken = require("jsonwebtoken");
var CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let dbUser = await User.findOne({email: user.email})
    const bytes = CryptoJS.AES.decrypt(dbUser.password, process.env.AES_SECRET);
    let decrytedPass = bytes.toString(CryptoJS.enc.Utf8);
    // console.log("Original Pass: " , decrytedPass)
    if(decrytedPass == req.body.password && req.body.npassword == req.body.cpassword){
        let foundedUser = await User.findOneAndUpdate(
          { email: user.email },
          {
            password: CryptoJS.AES.encrypt(req.body.npassword, process.env.AES_SECRET).toString()
          }
        );
        res.status(200).json({ success: true });
    }
    else{
        res.status(200).json({ success: false })
    }
    
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
