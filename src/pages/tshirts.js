import Link from "next/link";
import React, { useEffect } from "react";
import Product from "../../models/Product";
import mongoose from "mongoose";
import { useRouter } from "next/router";
import Head from "next/head";

const Tshirts = ({ products, clientMode }) => {
  const router = useRouter();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    }
  }, [router.query]);

  return (
    <div>
      <Head>
        <title>Codeswear.com - T-shirts</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <section className={`${clientMode === 'light' ? 'bg-white text-gray-600' : 'bg-gray-600 text-white'} body-font min-h-screen`}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 justify-center">
          {Object.keys(products).length === 0 && <p>Sorry all the tshirts are currently out of stock. New stock coming soon! Stay Tuned!</p>}
            {Object.keys(products).map((item) => {
              return (
                <div
                  key={products[item]._id}
                  className="lg:w-1/5 md:w-1/2 p-4 w-full shadow-lg m-5"
                >
                  {/* <a className="block relative rounded overflow-hidden"> */}
                  <Link
                    passHref={true}
                    href={`/product/${products[item].slug}`}
                  >
                    <img
                      alt="ecommerce"
                      className="m-auto md:mx-auto h-[36vh] block"
                      src={products[item].img}
                    />
                    {/* </a> */}
                    <div className="mt-4 text-center md:text-left">
                      <h3 className={`${clientMode === 'light' ? 'text-gray-500' : 'text-gray-200'} text-xs tracking-widest title-font mb-1`}>
                        T-Shirts
                      </h3>
                      <h2 className={`${clientMode === 'light' ? 'text-gray-900' : 'text-gray-100'} title-font text-lg font-medium`}>
                        {products[item].title}
                      </h2>
                      <p className="mt-1">${products[item].price}</p>
                      <div className="mt-1">
                        {products[item].size.includes('S') && <span className={`border ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-400'} px-1 mx-1`} >S </span>}
                        {products[item].size.includes('M') && <span className={`border ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-400'} px-1 mx-1`} >M </span>}
                        {products[item].size.includes('L') && <span className={`border ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-400'} px-1 mx-1`} >L </span>}
                        {products[item].size.includes('XL') && <span className={`border ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-400'} px-1 mx-1`} >XL </span>}
                        {products[item].size.includes('XXL') && <span className={`border ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-400'} px-1 mx-1`} >XXL</span>}
                      </div>
                      <div className="mt-1">
                      {products[item].color.includes('red') && <button className={`border-2 ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-500'} ml-1 bg-red-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                      {products[item].color.includes('blue') && <button className={`border-2 ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-500'} ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                      {products[item].color.includes('black') && <button className={`border-2 ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-500'} ml-1 bg-black rounded-full w-6 h-6 focus:outline-none`}></button>}
                      {products[item].color.includes('green') && <button className={`border-2 ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-500'} ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                      {products[item].color.includes('yellow') && <button className={`border-2 ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-500'} ml-1 bg-yellow-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                      {products[item].color.includes('purple') && <button className={`border-2 ${clientMode === 'light' ? 'border-gray-300' : 'border-gray-500'} ml-1 bg-purple-700 rounded-full w-6 h-6 focus:outline-none`}></button>}
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
  // Fetch data from external API
  let products = await Product.find({ category: "tshirt" });
  let tshirts = {};
  for (let item of products) {
    if (item.title in tshirts) {
      if (
        !tshirts[item.title].color.includes(item.color) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].color.push(item.color);
      }
      if (
        !tshirts[item.title].size.includes(item.size) &&
        item.availableQty > 0
      ) {
        tshirts[item.title].size.push(item.size);
      }
    } else {
      tshirts[item.title] = JSON.parse(JSON.stringify(item));
      if (item.availableQty > 0) {
        tshirts[item.title].color = [item.color];
        tshirts[item.title].size = [item.size];
      }
      else{
        tshirts[item.title].color = [];
        tshirts[item.title].size = [];
      }
    }
  }
  // Pass data to the page via props
  return { props: { products: JSON.parse(JSON.stringify(tshirts)) } };
};

export default Tshirts;
