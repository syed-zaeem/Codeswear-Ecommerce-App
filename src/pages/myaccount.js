import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from "react-redux";
import { updateUserDetails, updateUserPassword } from "@/features/userSlice";
import Head from "next/head";

const MyAccount = ({clientMode}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [password, setPassword] = useState("");
  const [npassword, setNpassword] = useState("")
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();

  const dispatch = useDispatch()

  const fetchUser = async () => {
    let userEmail = localStorage.getItem("loggedEmail");
    setEmail(userEmail);
    console.log("The current email is: ", userEmail);
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/getuser`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ token: localStorage.getItem('token') }), // body data type must match "Content-Type" header
    });
    let response = await res.json();
    // console.log("The response is: " , res)
    console.log("The required user is: " , response)
    setName(response.name)
    setAddress(response.address)
    setPincode(response.pincode)
    setPhone(response.phone)
    // setUser(response.user);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchUser();
    }
  }, [router.query]);

  const handleChange = async (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "address") {
      setAddress(e.target.value);
    } else if (e.target.name == "pincode") {
      setPincode(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "npassword") {
      setNpassword(e.target.value);
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

  const handleUserSubmit = async () => {
    let response = await dispatch(updateUserDetails({ token: localStorage.getItem('token'), address, name, pincode, phone }));
    console.log(response)
    if(response.payload.success){
      toast.success("Successfully Updated Details", {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
    else{
      toast.error("Error While Updating Details", {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  const handlePasswordSubmit = async () => {
    let response = await dispatch(updateUserPassword({ token: localStorage.getItem('token'), password, npassword, cpassword }));
    if(response.payload.success){
      toast.success("Successfully Updated Password", {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setPassword('')
      setNpassword('')
      setCpassword('')
    }
    else{
      toast.error("Error Updating Password", {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
    }
  }

  return (
    <div className={`mx-auto lg:px-[5%] lg:w-[100%] py-9 ${
      clientMode === "light"
        ? "bg-white text-gray-600"
        : "bg-gray-600 text-white"
    }`}>
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
        <title>Codeswear.com - Account Settings</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <h1 className="text-3xl text-center font-bold">Update Your Account</h1>
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
              Email (cannot be updated)
            </label>
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
      <button onClick={handleUserSubmit} className="disabled:bg-pink-300 flex m-2 mb-5 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">
        Submit
      </button>

      <h2 className="font-semibold text-xl">2. Change Password</h2>
      <div className="mx-auto flex my-2">
        <div className="px-2 w-1/2">
          <div className="mb-4">
            <label
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={password}
              id="password"
              name="password"
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
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              New Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={npassword}
              id="npassword"
              name="npassword"
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
              htmlFor="password"
              className="leading-7 text-sm text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              onChange={handleChange}
              value={cpassword}
              id="cpassword"
              name="cpassword"
              className={`w-full ${
                clientMode === "light"
                  ? "bg-white text-gray-700"
                  : "bg-gray-600 text-white"
              } rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
            />
          </div>
        </div>
        
      </div>
      <button onClick={handlePasswordSubmit} className="disabled:bg-pink-300 flex mt-2 mx-2 text-white bg-pink-500 border-0 py-2 px-2 focus:outline-none hover:bg-pink-600 rounded text-md">
        Submit
      </button>
    </div>
  );
};


export default MyAccount;
