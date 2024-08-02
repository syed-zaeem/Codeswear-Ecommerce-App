// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import Product from "../../../models/Product";

const handler = async (req, res) => {
    console.log("I am here")
  if (req.method == "DELETE") {
    let foundedProduct = await Product.findByIdAndDelete(req.query.id);
    // console.log("This is founded user: " , foundedUser)
    res.status(200).json({ success: true });
  } else {
    res
      .status(400)
      .json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
