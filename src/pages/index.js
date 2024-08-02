import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home({clientMode}) {
  return (
    <>
      <Head>
        <title>Codeswear.com - wear the code</title>
        <meta name="description" content="Codeswear.com - wear the code" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/logo2.png" />
      </Head>

      <div>
        <img src="home.JPG" alt="" />
      </div>
      <section className={`${clientMode === 'light' ? 'bg-white text-gray-900' : 'bg-gray-600 text-white'} body-font`}>
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap w-full mb-20 flex-col items-center text-center">
            <h1 className={`sm:text-3xl text-2xl font-medium title-font mb-2 `}>
              Wear the Code with codeswear.com
            </h1>
            <p className={`lg:w-1/2 w-full leading-relaxed ${clientMode === 'light' ? 'text-gray-500' : 'text-white'}`}>
              Express Your Passion for Coding with Our Unique Apparel – Wear
              Your Code with Pride and Style.
            </p>
          </div>

          <div className="flex flex-wrap -m-4">
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                  </svg>
                </div>
                <h2 className={`text-lg ${clientMode === 'light' ? 'text-gray-900' : 'text-white'} font-medium title-font mb-2`}>
                  Trendy Apparel
                </h2>
                <p className="leading-relaxed text-base">
                  Discover the latest fashion trends with our curated collection
                  of stylish apparel.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"></path>
                  </svg>
                </div>
                <h2 className={`text-lg ${clientMode === 'light' ? 'text-gray-900' : 'text-white'} font-medium title-font mb-2`}>
                  Unique Accessories
                </h2>
                <p className="leading-relaxed text-base">
                  Complete your look with our selection of unique and stylish
                  accessories.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <h2 className={`text-lg ${clientMode === 'light' ? 'text-gray-900' : 'text-white'} font-medium title-font mb-2`}>
                  Home Decor
                </h2>
                <p className="leading-relaxed text-base">
                  Transform your living space with our selection of chic home
                  decor items.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1zM4 22v-7"></path>
                  </svg>
                </div>
                <h2 className={`text-lg ${clientMode === 'light' ? 'text-gray-900' : 'text-white'} font-medium title-font mb-2`}>
                  Beauty & Wellness
                </h2>
                <p className="leading-relaxed text-base">
                  Indulge in our range of beauty and wellness products to look
                  and feel your best.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"></path>
                  </svg>
                </div>
                <h2 className={`text-lg ${clientMode === 'light' ? 'text-gray-900' : 'text-white'} font-medium title-font mb-2`}>
                  Gadgets & Electronics
                </h2>
                <p className="leading-relaxed text-base">
                  Discover the latest gadgets and electronics to keep you ahead
                  of the curve.
                </p>
              </div>
            </div>
            <div className="xl:w-1/3 md:w-1/2 p-4">
              <div className="border border-gray-200 p-6 rounded-lg">
                <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-pink-100 text-pink-500 mb-4">
                  <svg
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h2 className={`text-lg ${clientMode === 'light' ? 'text-gray-900' : 'text-white'} font-medium title-font mb-2`}>
                  Outdoor & Sports
                </h2>
                <p className="leading-relaxed text-base">
                  Gear up for your next adventure with our outdoor and sports
                  equipment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
