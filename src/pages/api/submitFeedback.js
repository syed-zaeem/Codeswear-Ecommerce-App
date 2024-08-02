// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import connectDb from "../../../middleware/mongoose";
import Feedback from "../../../models/Feedback";

const handler = async (req, res) => {
  if (req.method == "POST") {
    // console.log(req.body);

    let F = new Feedback({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });
    await F.save();

    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false, error: "This method is not allowed" });
  }
};

export default connectDb(handler);
