import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosCloseCircle } from "react-icons/io";
import { FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import { IoBagCheck } from "react-icons/io5";
import { MdAccountCircle } from "react-icons/md";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "@/features/cartSlice";

import IconButton from "@mui/material/IconButton";

// ** Icons Imports
import WeatherNight from "mdi-material-ui/WeatherNight";
import WeatherSunny from "mdi-material-ui/WeatherSunny";

const Navbar = ({ logout, user, clientMode, ToggleClientMode }) => {
  const [dropdown, setDropdown] = useState(false);
  const [sidebar, setSidebar] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const ref = useRef();

  const router = useRouter();

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartSlice.cart);
  const subTotal = useSelector((state) => state.cartSlice.subTotal);

  useEffect(() => {
    dispatch(getCart());
    Object.keys(cart).length !== 0 && setSidebar(true);
    let exempted = [
      "/checkout",
      "/order",
      "/orders",
      "/myaccount",
      "/login",
      "/signup",
      "forgot",
    ];
    if (exempted.includes(router.pathname)) {
      setSidebar(false);
    }
    let exemptedForNavbar = ["/admin"];
    if (exemptedForNavbar.includes(router.pathname)) {
      setShowNavbar(false);
    }
  }, []);

  const toggleCart = () => {
    setSidebar(!sidebar);
    // if (ref.current.classList.contains("translate-x-full")) {
    //   ref.current.classList.remove("translate-x-full");
    //   ref.current.classList.add("translate-x-0");
    // } else if (ref.current.classList.contains("translate-x-0")) {
    //   ref.current.classList.remove("translate-x-0");
    //   ref.current.classList.add("translate-x-full");
    // }
  };

  // const toggleCart = () => {
  //   if(ref.current.classList.contains("mx-[-300px]")){
  //     ref.current.classList.remove("mx-[-300px]")
  //     ref.current.classList.add("mx-0")
  //   }
  //   else if(ref.current.classList.contains('mx-0')){
  //     ref.current.classList.remove('mx-0')
  //     ref.current.classList.add('mx-[-300px]')
  //   }
  // }

  // ** Props

  const handleModeChange = (mode) => {
    saveModeSettings({ ...settings, mode });
  };

  return (
    <>
      <Link href={""}>
        {dropdown && (
          <div
            onMouseOver={() => {
              setDropdown(true);
            }}
            onMouseLeave={() => {
              setDropdown(false);
            }}
            className={`fixed z-30 right-14 ${clientMode === 'light' ? 'bg-white' : 'bg-gray-700 text-white'} border shadow-lg top-9 rounded-md py-4 px-5 w-32`}
          >
            <ul>
              <Link href={"/myaccount"}>
                <li className={`py-1 ${clientMode === 'light' ? 'hover:text-pink-700' : 'hover:text-pink-300'}  text-sm font-semibold`}>
                  My Account
                </li>
              </Link>
              <Link href={"/orders"}>
                <li className={`py-1 ${clientMode === 'light' ? 'hover:text-pink-700' : 'hover:text-pink-300'}  text-sm font-semibold`}>
                  My Orders
                </li>
              </Link>
              <li
                onClick={logout}
                className={`py-1 ${clientMode === 'light' ? 'hover:text-pink-700' : 'hover:text-pink-300'}  text-sm font-semibold`}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </Link>
      {showNavbar && (
        <div
          className={`flex flex-col sticky top-0 ${clientMode === 'light' ? 'bg-white' : 'bg-gray-700 text-white'} z-10 md:flex-row md:justify-start justify-center items-center py-2 shadow-md ${
            !sidebar && "overflow-hidden"
          }`}
        >
          <div className="logo mr-auto md:mx-5">
            <Link href={"/"}>
              <Image width={200} height={40} src="/logo.jpg"></Image>
            </Link>
          </div>
          <div className={`nav`}>
            <ul className="flex items-center space-x-6 font-bold md:text-md">
              <Link href={"/tshirts"}>
                <li className={`${clientMode === 'light' ? 'hover:text-pink-600' : 'hover:text-pink-300'}`}>Tshirts</li>
              </Link>
              <Link href={"/hoodies"}>
                <li className={`${clientMode === 'light' ? 'hover:text-pink-600' : 'hover:text-pink-300'}`}>Hoodies</li>
              </Link>
              <Link href={"/stickers"}>
                <li className={`${clientMode === 'light' ? 'hover:text-pink-600' : 'hover:text-pink-300'}`}>Stickers</li>
              </Link>
              <Link href={"/mugs"}>
                <li className={`${clientMode === 'light' ? 'hover:text-pink-600' : 'hover:text-pink-300'}`}>Mugs</li>
              </Link>
            </ul>
          </div>
          <div className="cart items-center absolute right-0 top-4 mx-5 cursor-pointer flex">
            <IconButton
              color="inherit"
              aria-haspopup="true"
              onClick={ToggleClientMode}
              className=""
            >
              {clientMode === "dark" ? <WeatherSunny /> : <WeatherNight />}
            </IconButton>
            <span
              onMouseOver={() => {
                setDropdown(true);
              }}
              onMouseLeave={() => {
                setDropdown(false);
              }}
            >
              {user.value && (
                <MdAccountCircle className="text-xl md:text-2xl mx-2" />
              )}
            </span>
            {!user.value && (
              <Link href={"/login"}>
                <button className="bg-pink-600 px-2 py-1 rounded-md text-sm text-white mx-2">
                  Login
                </button>
              </Link>
            )}
            <AiOutlineShoppingCart
              onClick={toggleCart}
              className="text-xl md:text-2xl"
            />
          </div>
          <div
            ref={ref}
            // className="w-72 h-[100vh] overflow-y-auto sideCart absolute top-0 right-0 bg-pink-100 px-8 py-10 transform transition-transform translate-x-full"
            className={`w-72 h-[100vh] text-black overflow-y-scroll sideCart absolute top-0 bg-pink-100 px-8 py-10 transition-all ${
              sidebar ? "right-0" : "-right-96"
            }`}
          >
            {/* <div ref={ref} className="w-72 h-full overflow-y-auto sideCart absolute top-0 right-0 bg-pink-100 p-10 transition-all duration-700 mx-[-300px]"> */}
            <h2 className="font-bold text-xl text-center">Shopping Cart</h2>
            <span
              onClick={toggleCart}
              className="absolute top-5 right-2 cursor-pointer text-2xl text-pink-500"
            >
              <IoIosCloseCircle />
            </span>
            <ol className="list-decimal font-semibold">
              {Object.keys(cart).length === 0 && (
                <div className="my-4 font-semibold">Your cart is Empty!</div>
              )}
              {Object.keys(cart).map((k) => {
                return (
                  <li key={k}>
                    <div className="item flex my-5">
                      <div className="w-2/3 font-semibold">
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
            <div className="font-bold total my-2">Subtotal: ${subTotal}</div>
            <div className="flex">
              <Link href={"/checkout"}>
                <button
                  disabled={Object.keys(cart).length === 0}
                  className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"
                >
                  <IoBagCheck className="m-1" />
                  Checkout
                </button>
              </Link>
              <button
                onClick={() => {
                  dispatch(clearCart());
                }}
                disabled={Object.keys(cart).length === 0}
                className="disabled:bg-pink-300 flex mr-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
