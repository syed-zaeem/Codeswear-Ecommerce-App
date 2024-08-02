import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const Forgot = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const router = useRouter();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/");
    }
  }, []);

  const handleChange = (e) => {
    if (e.target.name == "npassword") {
      setPassword(e.target.value);
    } else if (e.target.name == "cpassword") {
      setCpassword(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault()
    if (password == cpassword) {
      let data = {
        password,
        sendMail: false,
      };
      let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify({ token: localStorage.getItem("token") }), // body data type must match "Content-Type" header
      });
      let response = await res.json();
      if (response.success) {
        console.log("Password has been changed");
      } else {
        console.log("Error");
      }
    }
  };

  const sendResetEmail = async (e) => {
    e.preventDefault()
    let data = {
      email,
      sendMail: true,
    };
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/forgot`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify({ token: localStorage.getItem("token") }), // body data type must match "Content-Type" header
    });
    let response = await res.json();
    if (response.success) {
      console.log("Password reset instructions have been sent to your email");
    } else {
      console.log("Error");
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo2.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Forgot Password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          {router.query.token && (
            <div>
              <form onSubmit={resetPassword} className="space-y-6" method="POST">
                <div>
                  <label
                    htmlFor="npassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    New Password
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={password}
                      id="npassword"
                      name="npassword"
                      type="password"
                      autocomplete="password"
                      required
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="cpassword"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <div className="mt-2">
                    <input
                      onChange={handleChange}
                      value={cpassword}
                      id="cpassword"
                      name="cpassword"
                      type="password"
                      autocomplete="password"
                      required
                      className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <button
                    disabled={password !== cpassword}
                    type="submit"
                    className="disabled:bg-pink-300 flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                  >
                    Continue
                  </button>
                </div>
              </form>
              {password !== cpassword && <span className="text-red-600">Passwords don't match</span>}
              {password === cpassword && <span className="text-green-600">Passwords match</span>}
            </div>
          )}
          {!router.query.token && (
            <form onSubmit={sendResetEmail} className="space-y-6" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    onChange={handleChange}
                    value={email}
                    id="email"
                    name="email"
                    type="email"
                    autocomplete="email"
                    required
                    className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <button
                 
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-pink-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-pink-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                >
                  Continue
                </button>
              </div>
            </form>
          )}

          <p className="mt-10 text-center text-sm text-gray-500">
            Know your Password? &nbsp;
            <Link
              href="login"
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              LogIn
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Forgot;
