import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { fetchOrders } from "@/features/ordersSlice";
import { useDispatch, useSelector } from "react-redux";
import Head from "next/head";

const Orders = ({clientMode}) => {
  const router = useRouter();

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.ordersSlice.orders);
  const { loading, error } = useSelector((state) => state.ordersSlice);

  // const fetchOrders = async () => {
  // const a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorders`, {
  //   method: "POST", // *GET, POST, PUT, DELETE, etc.
  //   headers: {
  //     "Content-Type": "application/json",
  //   }, // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //   body: JSON.stringify({ token: localStorage.getItem("token") }), // body data type must match "Content-Type" header
  // });
  // let res = await a.json();
  // setOrders(res.orders)
  // console.log("Response for the my orders page is:", res);
  // };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } else {
      dispatch(fetchOrders());
    }
  }, [router.query]);

  if (loading) {
    return (
      <div className={`${
        clientMode === "light"
          ? "bg-white text-gray-600"
          : "bg-gray-600 text-white"
      }`} role="status">
        <Head>
          <title>Codeswear.com - Loading </title>
          <link rel="icon" href="/logo2.png" />
        </Head>
        <svg
          aria-hidden="true"
          className="inline w-10 h-10 mx-[46%] my-[30vh] text-gray-200 animate-spin dark:text-gray-600 fill-pink-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
        <span className="sr-only">Loading...</span>
      </div>
    );
  }

  if (error) {
    return <h1>Error</h1>;
  }

  return (
    <div className={`${
      clientMode === "light"
        ? "bg-white text-gray-600"
        : "bg-gray-600 text-white"
    } min-h-screen pb-20`}>
      <Head>
        <title>Codeswear.com - Your Orders</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <div className="container mx-auto">
        <h1 className="font-semibold text-center text-2xl p-8">My Orders</h1>
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-6 lg:mx-0">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <div className="flex flex-col">
                  <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-[10%]">
                      <div className="overflow-hidden">
                        <table className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                #Order Id
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Email
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Amount
                              </th>
                              <th scope="col" className="px-6 py-4">
                                Details
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {orders.length !== 0 &&
                              orders.map((item) => {
                                return (
                                  <tr
                                    key={item._id}
                                    className={`border-b border-neutral-200 transition duration-300 ease-in-out ${
                                      clientMode === "light"
                                        ? "hover:bg-neutral-100"
                                        : "hover:bg-gray-500"
                                    } dark:border-white/10`}
                                  >
                                    <td className="whitespace-nowrap px-6 py-4 font-medium">
                                      {item.orderId}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      {item.email}
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-4">
                                      ${item.amount}
                                    </td>
                                    <td className={`whitespace-nowrap px-6 py-4 ${
                                      clientMode === "light"
                                        ? "text-pink-700"
                                        : "text-pink-300"
                                    }  font-semibold hover:underline`}>
                                      <Link href={"/order?id=" + item._id}>
                                        Details
                                      </Link>
                                    </td>
                                  </tr>
                                );
                              })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
