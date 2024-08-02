// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Forgot from "../../../models/Forgot";
import User from "../../../models/User";

export default async function handler(req, res) {
  if (req.body.sendMail) {
    let token = "afdsfsaafadfasfasfsfsfsfsdfasdfffasfasfds";
    let forgot = new Forgot({
      email: req.body.email,
      token: token,
    });

    let email = `
Trouble signing in?

Resetting your password is easy.

Just press the link below and follow the instructions. We’ll have you up and running in no time.
<a href=""https://codeswear.com/forgot?token=${token}>Click here to reset your password</a> 

If you did not make this request then please ignore this email.
`;
  } else {
    // Update the password functionality
  }

  res.status(200).json({ success: true });
}
