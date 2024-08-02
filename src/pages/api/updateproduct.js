// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Product from "../../../models/Product";
import connectDb from "../../../middleware/mongoose";

const handler = async (req, res) => {
  if (req.method == "PUT") {
    console.log("Request Body" , req.body);
    console.log("Backend Server Side:" , req.query.id)

    let p = await Product.findByIdAndUpdate(req.query.id, req.body);

    res.status(200).json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
