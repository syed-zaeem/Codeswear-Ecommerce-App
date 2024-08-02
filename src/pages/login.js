import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logIn } from "@/features/userSlice";
import Head from "next/head";

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()

  const dispatch = useDispatch()

  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push("/")
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = {email, password}
    // const res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
    //   method: "POST", // *GET, POST, PUT, DELETE, etc.
    //   headers: {
    //     "Content-Type": "application/json",
    //   }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    //   body: JSON.stringify(data), // body data type must match "Content-Type" header
    // });

    let response = await dispatch(logIn(data))
    console.log(response)
    if(response.payload.success){
      localStorage.setItem('token', response.payload.token)
      localStorage.setItem('loggedEmail', email)
      setEmail('')
      setPassword('')
      toast.success('Your are successfully logged in!', {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined
      })
      setTimeout(() => {
        if(response.payload.role === 'Admin'){
          router.push(`${process.env.NEXT_PUBLIC_HOST}/admin`)
        }
        else if(response.payload.role === 'Customer'){
          router.push(process.env.NEXT_PUBLIC_HOST)
        }
      }, 1000);
    }
    else{
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
  }

  const handleChange = (e) => {
    if(e.target.name == "email"){
      setEmail(e.target.value)
    }
    else if(e.target.name == "password"){
      setPassword(e.target.value)
    }
  }

  return (
    <>
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
        <title>Codeswear.com - Log In</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="/logo2.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-6" method="POST">
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
                  autoComplete="email"
                  required
                  className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-pink-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                {/* <div className="text-sm">
                  <Link
                    href={"/forgot"}
                    className="font-semibold text-pink-600 hover:text-pink-500"
                  >
                    Forgot password?
                  </Link>
                </div> */}
              </div>
              <div className="mt-2">
                <input
                  onChange={handleChange}
                  value={password}
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
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
                Sign In
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? &nbsp;
            <Link
              href="signup"
              className="font-semibold leading-6 text-pink-600 hover:text-pink-500"
            >
              SignUp
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
