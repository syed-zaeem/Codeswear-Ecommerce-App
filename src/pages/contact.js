import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { addFeedback } from "@/features/feedbacksSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Head from "next/head";

const Contact = ({ clientMode }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const router = useRouter();

  const dispatch = useDispatch();

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
    console.log("The required user is: ", response);
    setName(response.name);
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      fetchUser();
    }
  }, [router.query]);

  const handleChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmitFeedback = async () => {
    const res = await dispatch(addFeedback({ name, email, message }));

    if (res.payload.success) {
      toast.success("Feedback Submitted Successfully", {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setMessage("");
    } else {
      toast.error(res.payload.error, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <div
      className={`${
        clientMode === "light"
          ? "bg-white text-gray-600"
          : "bg-gray-600 text-white"
      }`}
    >
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
        <title>Codeswear.com - Contact Us</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <section
        className={`${
          clientMode === "light" ? "text-gray-600" : "text-gray-200"
        } body-font relative`}
      >
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-12">
            <h1
              className={`sm:text-3xl text-2xl font-medium title-font mb-4 ${
                clientMode === "light" ? "text-gray-900" : "text-white"
              } `}
            >
              Contact Us
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-base">
              You can contact with us from here...
            </p>
          </div>
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <div className="flex flex-wrap -m-2">
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    readOnly
                    id="name"
                    name="name"
                    className={`w-full ${
                      clientMode === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-600 text-white"
                    } bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                  />
                </div>
              </div>
              <div className="p-2 w-1/2">
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    readOnly
                    id="email"
                    name="email"
                    className={`w-full ${
                      clientMode === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-600 text-white"
                    } bg-opacity-50 rounded border border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 text-base outline-none py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
                  />
                </div>
              </div>
              <div className="p-2 w-full">
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="leading-7 text-sm text-gray-600"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={handleChangeMessage}
                    name="message"
                    className={`w-full ${
                      clientMode === "light"
                        ? "bg-gray-100 text-gray-700"
                        : "bg-gray-600 text-white"
                    } bg-opacity-50 rounded border border-gray-300 focus:border-pink-500  focus:ring-2 focus:ring-pink-200 h-32 text-base outline-none py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out`}
                  ></textarea>
                </div>
              </div>
              <div className="p-2 w-full">
                <button
                  onClick={handleSubmitFeedback}
                  className="flex mx-auto text-white bg-pink-500 border-0 py-2 px-8 focus:outline-none hover:bg-pink-600 rounded text-lg"
                >
                  Submit Feedback
                </button>
              </div>
              <div className="p-2 w-full pt-8 mt-8 border-t border-gray-200 text-center">
                <p className="leading-normal mb-2">
                  <br /> More Links
                </p>
                <span className="inline-flex">
                  <a
                    target="_blank"
                    href={"https://www.facebook.com/"}
                    className={`${clientMode === 'light' ? 'text-gray-500 ' : 'text-gray-200'} `}
                  >
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
                  <a
                    target="_blank"
                    href={"https://www.twitter.com/"}
                    className={`ml-4 ${clientMode === 'light' ? 'text-gray-500 ' : 'text-gray-200'} `}
                  >
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
                  <a
                    target="_blank"
                    href={"https://www.instagram.com/"}
                    className={`ml-4 ${clientMode === 'light' ? 'text-gray-500 ' : 'text-gray-200'} `}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href={"https://www.linkedin.com/"}
                    className={`ml-4 ${clientMode === 'light' ? 'text-gray-500 ' : 'text-gray-200'} `}
                  >
                    <svg
                      fill="currentColor"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="0"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="none"
                        d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
                      ></path>
                      <circle cx="4" cy="4" r="2" stroke="none"></circle>
                    </svg>
                  </a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
