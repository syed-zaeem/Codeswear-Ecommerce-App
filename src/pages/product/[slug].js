import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Product from "../../../models/Product";
import mongoose from "mongoose";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Error from "next/error";
import { useDispatch } from "react-redux";
import { addToCart, buyNow } from "@/features/cartSlice";
import Head from "next/head";

const Slug = ({ product, variants, error, clientMode }) => {
  const router = useRouter();
  const { slug } = router.query;
  const [pin, setPin] = useState();
  const [service, setService] = useState();
  const [color, setColor] = useState();
  const [size, setSize] = useState();
  const [disabled, setDisabled] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      if (!error) {
        setColor(product.color);
        setSize(product.size);
      }
    }
  }, [router.query]);

  const checkServiceability = async () => {
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (Object.keys(pinJson.pincodes).includes(pin)) {
      setService(true);
      toast.success("Your PinCode is Serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setService(false);
      toast.error("Sorry, PinCode not Serviceable!", {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const onChangePin = (e) => {
    setPin(e.target.value);
  };

  const refreshVariant = (newSize, newColor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${variants[newColor][newSize]["slug"]}`;
    // setSize(newSize);
    // setColor(newColor);
    router.push(`${variants[newColor][newSize]["slug"]}`);
    // window.location = url
  };

  if (error == 404) {
    return <Error statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>Codeswear.com - Make the Cart</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <section
        className={`${
          clientMode === "light"
            ? "bg-white text-gray-600"
            : "bg-gray-600 text-white"
        } body-font overflow-hidden min-h-screen`}
      >
        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className={` container px-5 py-16 mx-auto`}>
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="sm:w-3/4 md:w-2/3 lg:w-1/2 w-full lg:h-auto px-24 object-cover object-top rounded"
              src={product.img}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2
                className={`text-sm title-font ${
                  clientMode === "light" ? "text-gray-500" : "text-gray-300"
                }  tracking-widest`}
              >
                CODESWEAR
              </h2>
              <h1
                className={`${
                  clientMode === "light" ? "text-gray-900" : "text-white"
                }  text-3xl title-font font-medium mb-1`}
              >
                {product.title} ({product.size}/{product.color})
              </h1>
              <div className="flex mb-4">
                {/* <span className="flex items-center">
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="currentColor"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-4 h-4 text-pink-500"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span> */}
              </div>
              <p className="leading-relaxed">{product.desc}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  {Object.keys(variants).includes("red") &&
                    Object.keys(variants["red"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "red");
                        }}
                        className={`border-2 ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "red" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("blue") &&
                    Object.keys(variants["blue"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "blue");
                        }}
                        className={`border-2 ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "blue" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("black") &&
                    Object.keys(variants["black"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "black");
                        }}
                        className={`border-2 ml-1 bg-black rounded-full w-6 h-6 focus:outline-none ${
                          color === "black" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("green") &&
                    Object.keys(variants["green"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "green");
                        }}
                        className={`border-2 ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "green" ? "border-black" : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("yellow") &&
                    Object.keys(variants["yellow"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "yellow");
                        }}
                        className={`border-2 ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "yellow"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                  {Object.keys(variants).includes("purple") &&
                    Object.keys(variants["purple"]).includes(size) && (
                      <button
                        onClick={() => {
                          refreshVariant(size, "purple");
                        }}
                        className={`border-2 ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none ${
                          color === "purple"
                            ? "border-black"
                            : "border-gray-300"
                        }`}
                      ></button>
                    )}
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select
                      value={size}
                      onChange={(e) => {
                        refreshVariant(e.target.value, color);
                      }}
                      className={`rounded ${
                        clientMode === "light" ? "bg-white text-gray-900" : "bg-gray-600 text-white"
                      } border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-pink-200 focus:border-pink-500 text-base pl-3 pr-10`}
                    >
                      {color && Object.keys(variants[color]).includes("S") && (
                        <option value={"S"}>S </option>
                      )}
                      {color && Object.keys(variants[color]).includes("M") && (
                        <option value={"M"}>M </option>
                      )}
                      {color && Object.keys(variants[color]).includes("L") && (
                        <option value={"L"}>L </option>
                      )}
                      {color && Object.keys(variants[color]).includes("XL") && (
                        <option value={"XL"}>XL </option>
                      )}
                      {color &&
                        Object.keys(variants[color]).includes("XXL") && (
                          <option value={"XXL"}>XXL</option>
                        )}
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                {product.availableQty > 0 && (
                  <span className={`title-font font-medium text-2xl ${
                    clientMode === "light" ? "text-gray-900" : "text-white"
                  }`}>
                    ${product.price}
                  </span>
                )}
                {product.availableQty <= 0 && (
                  <span className={`title-font font-medium text-2xl ${
                    clientMode === "light" ? "text-gray-900" : "text-white"
                  }`}>
                    Out of Stock!
                  </span>
                )}
                <button
                  onClick={() => {
                    dispatch(
                      buyNow({
                        itemCode: slug,
                        qty: 1,
                        price: product.price,
                        name: product.title,
                        size: product.size,
                        variant: product.color,
                      })
                    );
                    router.push("/checkout");
                  }}
                  disabled={product.availableQty > 0 ? false : true}
                  className="disabled:bg-pink-300 flex ml-8 lg:ml-4 lg:px-3 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    dispatch(
                      addToCart({
                        itemCode: slug,
                        qty: 1,
                        price: product.price,
                        name: product.title,
                        size: product.size,
                        variant: product.color,
                      })
                    );
                  }}
                  disabled={product.availableQty > 0 ? false : true}
                  className="disabled:bg-pink-300 flex ml-4 lg:ml-4 lg:px-3 text-white bg-pink-500 border-0 py-2 px-2 md:px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Add to Cart
                </button>
                {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                  </svg>
                </button> */}
              </div>
              <div className="pin mt-6 flex text-black space-x-2 text-sm">
                <input
                  onChange={onChangePin}
                  type="text"
                  placeholder="Enter your Pincode"
                  className={`${
                    clientMode === "light"
                      ? "bg-white text-gray-700"
                      : "bg-gray-600 text-white"
                  } px-2 border-2 border-gray-400 rounded-md`}
                />
                <button
                  onClick={checkServiceability}
                  className="text-white bg-pink-500 border-0 py-2 px-6 focus:outline-none hover:bg-pink-600 rounded"
                >
                  Check
                </button>
              </div>
              {!service && service != null && (
                <div className={`${
                  clientMode === "light" ? "text-red-700" : "text-red-300"
                }  text-sm mt-3`}>
                  Sorry! we do not deliver to this pincode yet
                </div>
              )}
              {service && service != null && (
                <div className={`${
                  clientMode === "light" ? "text-green-700" : "text-green-300"
                } text-sm mt-3`}>
                  Yay! this pincode is serviceable
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export const getServerSideProps = async (context) => {
  let error = null;
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // Fetch data from external API
  let product = await Product.findOne({ slug: context.query.slug });
  if (product == null) {
    return {
      props: {
        error: 404,
      },
    };
  }
  let variants = await Product.find({
    title: product.title,
    category: product.category,
  });
  let colorSizeSlug = {};

  for (let item of variants) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    } else {
      colorSizeSlug[item.color] = {};
      colorSizeSlug[item.color][item.size] = { slug: item.slug };
    }
  }

  // Pass data to the page via props
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      variants: JSON.parse(JSON.stringify(colorSizeSlug)),
    },
  };
};

export default Slug;
