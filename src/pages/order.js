import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import mongoose from "mongoose";
import Order from "../../models/Order";
import { useDispatch } from "react-redux";
import { clearCart } from "@/features/cartSlice";
import Head from "next/head";

const MyOrder = ({ order, clientMode }) => {
  const router = useRouter();
  const products = order.products;
  const [date, setDate] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      let d = new Date(order.createdAt);
      setDate(d);
      if (router.query.clearCart == 1) {
        clearCart();
      }
    }
  }, [router.query]);

  const { id } = router.query;

  // console.log("router id: " , id)

  // console.log("this is my order", order);

  return (
    <>
      <Head>
        <title>Codeswear.com - Order Details</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <section
        className={`${
          clientMode === "light"
            ? "bg-white text-gray-600"
            : "bg-gray-600 text-white"
        } body-font overflow-hidden min-h-screen`}
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
              <h2
                className={`text-sm title-font ${
                  clientMode === "light" ? "text-gray-500" : "text-gray-300"
                } tracking-widest`}
              >
                CODESWEAR.com
              </h2>
              <h1
                className={` ${
                  clientMode === "light" ? "text-gray-900" : "text-white"
                } text-xl md:text-3xl title-font font-medium mb-4`}
              >
                Order Id: #{order.orderId}
              </h1>
              <p className="leading-relaxed mb-4">
                Yayy! Your order has been successfully placed!
              </p>
              <p>
                Order placed on{" "}
                {date &&
                  date.toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
              </p>
              <p className="my-4">
                Your Payment Status is:{" "}
                <span
                  className={`font-semibold  ${
                    clientMode === "light" ? "text-slate-700" : "text-gray-100"
                  } `}
                >
                  {order.status}
                </span>
              </p>

              <div className="flex mb-4">
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Item Description
                </a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Quantity
                </a>
                <a className="flex-grow text-center border-gray-300 py-2 text-lg px-1">
                  Item Total
                </a>
              </div>
              {Object.keys(products).map((key) => {
                return (
                  <div key={key} className="flex border-t border-gray-200 py-2">
                    <span
                      className={`${
                        clientMode === "light"
                          ? "text-gray-500"
                          : "text-gray-300"
                      } `}
                    >
                      {products[key].name}({products[key].size}/
                      {products[key].variant})
                    </span>
                    <span
                      className={`m-auto ${
                        clientMode === "light" ? "text-gray-900" : "text-white"
                      }`}
                    >
                      {products[key].qty}
                    </span>
                    <span
                      className={`m-auto ${
                        clientMode === "light" ? "text-gray-900" : "text-white"
                      } `}
                    >
                      ${products[key].price * products[key].qty}
                    </span>
                  </div>
                );
              })}
              <div className="flex flex-col">
                <span
                  className={`title-font my-8 font-medium text-2xl ${
                    clientMode === "light" ? "text-gray-900" : "text-white"
                  } `}
                >
                  SubTotal: ${order.amount}
                </span>
                {/* <div className="my-4">
                  <button className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded">
                    Track Order
                  </button>
                </div> */}
              </div>
            </div>
            <img
              alt="ecommerce"
              className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
              src="order.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // Fetch data from external API
  // console.log("Context id: " , context.query.id)
  let order = await Order.findById(context.query.id);

  // Pass data to the page via props
  return {
    props: {
      order: JSON.parse(JSON.stringify(order)),
    },
  };
};

export default MyOrder;
