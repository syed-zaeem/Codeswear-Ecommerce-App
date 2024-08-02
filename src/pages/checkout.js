import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { nanoid } from "nanoid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "@/features/cartSlice";
import { addOrder } from "@/features/ordersSlice";

const Checkout = ({ user, clientMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [disabled, setDisabled] = useState(true);
  const router = useRouter();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);
  const subTotal = useSelector((state) => state.cartSlice.subTotal);
  const { loading, orders, error } = useSelector((state) => state.ordersSlice);

  const fetchUser = async () => {
    let userEmail = localStorage.getItem("loggedEmail");
    setEmail(userEmail);
    console.log("The current email is: ", userEmail);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ token: localStorage.getItem("token") }), // body data type must match "Content-Type" header
    });
    let response = await res.json();
    // console.log("The response is: " , res)
    console.log("The required user is: ", response);
    setName(response.name);
    setAddress(response.address);
    setPincode(response.pincode);
    setPhone(response.phone);

    getPinCode(response.pincode);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      dispatch(getCart());
      setEmail(localStorage.getItem("loggedEmail"));
      fetchUser();
    }
  }, [router.query]);

  const getPinCode = async (pin) => {
    if (pin.length == 6) {
      let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
      let pinJson = await pins.json();
      if (Object.keys(pinJson.pincodes).includes(pin)) {
        setState(pinJson.pincodes[pin][1]);
        setCity(pinJson.pincodes[pin][0]);
      } else {
        setState("");
        setCity("");
      }
    } else {
      setState("");
      setCity("");
    }
  };

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
      getPinCode(e.target.value);
    }

    setTimeout(() => {
      if (
        name.length > 3 &&
        email.length > 3 &&
        phone.length > 3 &&
        address.length > 3 &&
        pincode.length > 3
      ) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, 100);
  };

  const handlePayment = async () => {
    const data = {
      email: email,
      oid: nanoid(),
      address: address,
      subTotal: subTotal,
      cart: cart,
    };
    let pins = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`);
    let pinJson = await pins.json();
    if (!Object.keys(pinJson.pincodes).includes(pincode)) {
      toast.error("Sorry! Your pincode is not serviceable", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    let totalQuantity = 0;

    Object.keys(cart).map((k) => {
      totalQuantity += cart[k].qty;
    });

    

    // console.log("The data before payment is: ", dataForPayment);

    // const responsePayment = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/stripe`, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json",
    //   }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(dataForPayment), // body data type must match "Content-Type" header
    // });

    const response = await dispatch(addOrder(data))

    // // let response = res

    // // console.log("This is response for the frontend: " , response.payload.order._id)

    if(response.payload.success){
      console.log("This is response", response);
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");
      setPincode("");
      dispatch(clearCart())

      let dataForPayment = {
        email: email,
        oid: nanoid(),
        address: address,
        subTotal: subTotal,
        cart: cart,
        realId: response.payload.order._id,
      };

      axios
      .post("http://localhost:3000/api/stripe", {
        dataForPayment,
      })
      .then((res) => {
        console.log(res);
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
      // When the status of any order will be 'paid' as not 'pending', then do the following in future
      // router.push(`/order?id=${response.payload.order._id}&clearCart=1`);
    }
    else{
      dispatch(clearCart())
      toast.error(response.payload.error, {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined
    })
    }


    

    // console.log("The response from payment is: " , responsePayment.url)

    // window.location.href = responsePayment.url

    // let response = res.json()
    
  };

  return (
    <div className={`${
      clientMode === "light"
        ? "bg-white text-gray-600"
        : "bg-gray-600 text-white"
    } pt-8 px-2 my-auto sm:px-[5%] w-[100%] min-h-screen`}>
      <ToastContainer
        position="top-left"
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
      <Head>
        <title>Codeswear.com - Checkout the Cart</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <h1 className="font-bold text-3xl mb-8 text-center">Checkout</h1>
      <h2 className="font-semibold text-xl">1. Delivery Details</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={name}
              id="name"
              name="name"
              className={`w-full ${
                clientMode === "light"
                  ? "bg-white text-gray-700"
                  : "bg-gray-600 text-white"
              } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            {user.value ? (
              <input
                type="email"
                value={email}
                id="email"
                name="email"
                className={`w-full ${
                  clientMode === "light"
                    ? "bg-white text-gray-700"
                    : "bg-gray-600 text-white"
                } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                readOnly
              />
            ) : (
              <input
                type="email"
                onChange={handleChange}
                value={email}
                id="email"
                name="email"
                className={`w-full ${
                  clientMode === "light"
                    ? "bg-white text-gray-700"
                    : "bg-gray-600 text-white"
                } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
              />
            )}
          </div>
        </div>
      </div>
      <div className="px-2 w-full">
        <div className="mb-4">
          <label htmlFor="address" className="leading-7 text-sm text-gray-600">
            Address
          </label>
          <textarea
            cols={30}
            rows={2}
            onChange={handleChange}
            value={address}
            id="address"
            name="address"
            className={`w-full ${
              clientMode === "light"
                ? "bg-white text-gray-700"
                : "bg-gray-600 text-white"
            } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
          ></textarea>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="phone" className="leading-7 text-sm text-gray-600">
              Phone
            </label>
            <input
              type="phone"
              onChange={handleChange}
              value={phone}
              id="phone"
              name="phone"
              className={`w-full ${
                clientMode === "light"
                  ? "bg-white text-gray-700"
                  : "bg-gray-600 text-white"
              } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="pincode"
              className="leading-7 text-sm text-gray-600"
            >
              PinCode
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={pincode}
              id="pincode"
              name="pincode"
              className={`w-full ${
                clientMode === "light"
                  ? "bg-white text-gray-700"
                  : "bg-gray-600 text-white"
              } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
        </div>
      </div>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="state" className="leading-7 text-sm text-gray-600">
              State
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={state}
              id="state"
              name="state"
              className={`w-full ${
                clientMode === "light"
                  ? "bg-white text-gray-700"
                  : "bg-gray-600 text-white"
              } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
        </div>
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label htmlFor="city" className="leading-7 text-sm text-gray-600">
              District
            </label>
            <input
              type="text"
              onChange={handleChange}
              value={city}
              id="city"
              name="city"
              className={`w-full ${
                clientMode === "light"
                  ? "bg-white text-gray-700"
                  : "bg-gray-600 text-white"
              } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
        </div>
      </div>

      <h2 className="font-semibold text-xl">2. Review Cart Items & Pay</h2>
      <div className="overflow-y-auto sideCart bg-pink-100 p-6 m-2">
        <ol className="list-decimal font-semibold">
          {Object.keys(cart).length === 0 && (
            <div className="my-4 font-semibold text-black">Your cart is Empty!</div>
          )}
          {Object.keys(cart).map((k) => {
            return (
              <li key={k} className="text-black">
                <div className="item flex my-5">
                  <div className="font-semibold">
                    {cart[k].name}({cart[k].size}/{cart[k].variant})
                  </div>
                  <div className="flex items-center justify-center font-semibold w-1/3 text-lg">
                    <FaMinusCircle
                      onClick={() => {
                        dispatch(
                          removeFromCart({
                            itemCode: k,
                            qty: 1,
                            price: cart[k].price,
                            name: cart[k].name,
                            size: cart[k].size,
                            variant: cart[k].variant,
                          })
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />{" "}
                    <span className="mx-2 text-sm">{cart[k].qty}</span>
                    <FaPlusCircle
                      onClick={() => {
                        dispatch(
                          addToCart({
                            itemCode: k,
                            qty: 1,
                            price: cart[k].price,
                            name: cart[k].name,
                            size: cart[k].size,
                            variant: cart[k].variant,
                          })
                        );
                      }}
                      className="cursor-pointer text-pink-500"
                    />
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
        <span className="font-bold total text-black">Subtotal: ${subTotal}</span>
      </div>
      <div className="mx-4 pb-2">
        <Link href={"/checkout"}>
          <button
            disabled={disabled}
            onClick={handlePayment}
            className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"
          >
            <IoBagCheck className="m-1" />
            Pay ${subTotal}
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Checkout;
