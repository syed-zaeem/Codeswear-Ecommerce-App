import connectDb from "../../../middleware/mongoose";
import Feedback from "../../../models/Feedback";

const handler = async (req, res) => {
  let feedbacks = await Feedback.find();
//   console.log("These are Products in backend api : " , feedbacks)
  res.status(200).json({ feedbacks });
};

export default connectDb(handler);
