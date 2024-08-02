// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../../models/Order";
import connectDb from "../../../middleware/mongoose";
import Product from "../../../models/Product";
import { IoReturnUpForwardSharp } from "react-icons/io5";

const handler = async (req, res) => {
  if (req.method == "POST") {
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    if (req.body.subTotal <= 0) {
      res
        .status(200)
        .json({
          success: false,
          error: "Cart Empty! Please build your cart and try again!",
        });
      return;
    }
    for (let item in cart) {
      product = await Product.findOne({ slug: item });
      // Check if the cart items are out of stock
      if (product.availableQty < cart[item].qty) {
        res.status(200).json({
          success: false,
          error: "Some items in your cart went out of stock. Please try again!",
        });
        return;
      }
    }
    for (let item in cart) {
      console.log(item);
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
      if (product.price != cart[item].price) {
        res.status(200).json({
          success: false,
          error:
            "The price of some items in your cart have changed. Please try again",
        });
        return;
      }
    }
    if (sumTotal !== req.body.subTotal) {
      res.status(200).json({
        success: false,
        error:
          "The price of some items in your cart have changed. Please try again",
      });
      return;
    } else {
      let order = new Order({
        email: req.body.email,
        orderId: req.body.oid,
        address: req.body.address,
        amount: req.body.subTotal,
        products: req.body.cart,
      });
      await order.save();
      let products = order.products;
      for (let slug in products) {
        await Product.findOneAndUpdate(
          { slug: slug },
          { $inc: { availableQty: -products[slug].qty } }
        );
      }
      res.status(200).json({ success: true, order: order });
    }

    // res.redirect('/order', 200)
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default connectDb(handler);
