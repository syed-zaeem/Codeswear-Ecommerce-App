// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Stripe from "stripe";
import connectDb from "../../../middleware/mongoose";

const stripe = new Stripe(process.env.STRIPE_KEY);

const handler = async (req, res) => {
    console.log("Here I am: " , req.method);
    if (req.method === "POST") {
        console.log("Body of request is: ", req.body.dataForPayment);
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
              price_data: {
                currency: "usd",
                product_data: {
                  name: req.body.dataForPayment.oid,
                  description: req.body.dataForPayment.address,
                  // images: [req.body.image]
                },
                unit_amount: req.body.dataForPayment.subTotal * 100,
              },
              quantity: 1,
            },
          ],
          mode: "payment",
          success_url: `http://localhost:3000/order?id=${req.body.dataForPayment.realId}&clearCart=1`,
          cancel_url: `http://localhost:3000/order?id=${req.body.dataForPayment.realId}&clearCart=1`,
        });
      
        // res.redirect(303, session.url);
        res.send({ url: session.url });
    }
    else{
        res.status(400).json({ error: "This method is not allowed" });
    }
}

export default handler
