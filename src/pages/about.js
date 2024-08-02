import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

const About = ({clientMode}) => {

  const router = useRouter()
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.push("/");
    } 
  }, [router.query]);

  return (
    <div className={`${clientMode === 'light' ? 'bg-white text-gray-600' : 'bg-gray-600 text-white'}`}>
      <Head>
        <title>Codeswear.com - About Us</title>
        <link rel="icon" href="/logo2.png" />
      </Head>
      <div className="2xl:container 2xl:mx-auto lg:py-16 lg:px-20 md:py-12 md:px-6 py-9 px-4">
        <div className="flex lg:flex-row flex-col lg:gap-8 sm:gap-10 gap-12">
          <div className="w-full lg:w-6/12">
            <h2 className="w-full font-bold lg:text-4xl text-3xl lg:leading-10 leading-9">
              We Make Great Design Accessible and Delightful for Everyone
            </h2>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-white'} mt-6`}>
              Welcome to our online store, where we are dedicated to bringing
              you the finest products with exceptional design and quality. Our
              mission is to make great design accessible and delightful for
              everyone.
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-white'} mt-6`}>
              Founded with a passion for creativity and a commitment to
              excellence, we carefully curate our collections to offer you a
              diverse range of products that meet the highest standards of
              design and functionality.
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-white'} mt-6`}>
              Our team works tirelessly to source products from around the
              globe, bringing you a selection that is both stylish and
              affordable.
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-white'} mt-6`}>
              Thank you for choosing us as your go-to destination for all your
              shopping needs. We look forward to serving you and helping you
              discover the perfect products that enhance your life and style.
            </p>
          </div>
          <div className="w-full lg:w-6/12 lg:mt-32 xl:mt-24">
            <img
              className="lg:block hidden w-full"
              src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png"
              alt="people discussing on board"
            />
            <img
              className="lg:hidden sm:block hidden w-full"
              src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png"
              alt="people discussing on board"
            />
            <img
              className="sm:hidden block w-full"
              src="https://www.blogtyrant.com/wp-content/uploads/2011/02/best-about-us-pages.png"
              alt="people discussing on board"
            />
          </div>
        </div>
        <hr className="my-12" />
        <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4">
          <div>
            <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'} mt-6`}>
              Founded
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'} mt-6`}>
              Our journey began with a simple idea: to make great design
              accessible and delightful for everyone. From our humble
              beginnings, we've grown into a trusted online store known for our
              commitment to quality, style, and customer satisfaction. Our
              dedication to curating the best products from around the world.
            </p>
          </div>
          <div>
            <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'} mt-6`}>
              Our Community
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'} mt-6`}>
              We are proud to serve a vibrant community of shoppers from around
              the world. Each month, millions of visitors explore our carefully
              curated collections, seeking the latest trends and unique finds.
              Our dedication to providing an exceptional shopping experience
              keeps our community growing and thriving.
            </p>
          </div>
          <div className="sm:block hidden">
            <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'} mt-6`}>
              Our Valued Users
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'} mt-6`}>
              We are honored to have a loyal and growing user base of over many
              satisfied customers. Each user is a part of our story, and we
              strive to exceed their expectations with every interaction. Our
              commitment to quality, innovation, and exceptional customer
              service has earned us the trust and loyalty of our community.
            </p>
          </div>
        </div>
        <div className="sm:hidden grid sm:grid-cols-3 grid-cols-2 sm:gap-8 gap-4 mt-12">
          <div>
            <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'} mt-6`}>
              Our Valued Users
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'} mt-6`}>
              We are honored to have a loyal and growing user base of over many
              satisfied customers. Each user is a part of our story, and we
              strive to exceed their expectations with every interaction. Our
              commitment to quality, innovation, and exceptional customer
              service has earned us the trust and loyalty of our community.
            </p>
          </div>
        </div>

        <hr className="my-12" />

        <div className="flex lg:flex-row flex-col md:gap-14 gap-16 justify-between lg:mt-20 mt-16">
          <div className="w-full lg:w-6/12">
            <h2 className={`font-bold lg:text-4xl text-3xl lg:leading-9 leading-7 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
              Our Mission
            </h2>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'} mt-6 w-full lg:w-10/12 xl:w-9/12`}>
              Our mission is to make great design accessible and delightful for
              everyone. We believe that everyone deserves to enjoy beautifully
              crafted products that enhance their lifestyle. Whether it's the
              latest fashion trends, unique home decor, or innovative gadgets,
              we are dedicated to bringing you the best of everything.
            </p>
            <p className={`font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'} mt-6 w-full lg:w-10/12 xl:w-9/12`}>
              We are committed to providing an exceptional shopping experience,
              from the moment you visit our website to the moment your order
              arrives at your doorstep. Our team works tirelessly to source
              high-quality products from around the world, ensuring that each
              item meets our rigorous standards for design and functionality.
              Thank you for choosing us as your preferred shopping destination.
              Together, we can make great design a part of everyday life.
            </p>
          </div>
          <div className="w-full lg:w-6/12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 lg:gap-12 gap-10">
              {/* <!-- Team Card --> */}
              <div className="flex p-4 shadow-md">
                <div className="mr-6">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 15C20.4853 15 22.5 12.9853 22.5 10.5C22.5 8.01472 20.4853 6 18 6C15.5147 6 13.5 8.01472 13.5 10.5C13.5 12.9853 15.5147 15 18 15Z"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.5 28.5C27.9853 28.5 30 26.4853 30 24C30 21.5147 27.9853 19.5 25.5 19.5C23.0147 19.5 21 21.5147 21 24C21 26.4853 23.0147 28.5 25.5 28.5Z"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10.5 28.5C12.9853 28.5 15 26.4853 15 24C15 21.5147 12.9853 19.5 10.5 19.5C8.01472 19.5 6 21.5147 6 24C6 26.4853 8.01472 28.5 10.5 28.5Z"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
                    Team
                  </p>
                  <p className={`mt-2 font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                    Our dedicated team is the heart of our business, working
                    together to deliver the quality and satisfaction to our
                    customers.
                  </p>
                </div>
              </div>

              {/* <!-- Board Card --> */}
              <div className="flex p-4 shadow-md">
                <div className="mr-6">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.5 10.5C12.1569 10.5 13.5 9.15685 13.5 7.5C13.5 5.84315 12.1569 4.5 10.5 4.5C8.84315 4.5 7.5 5.84315 7.5 7.5C7.5 9.15685 8.84315 10.5 10.5 10.5Z"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M7.5 33V25.5L6 24V18C6 17.6022 6.15804 17.2206 6.43934 16.9393C6.72064 16.658 7.10218 16.5 7.5 16.5H13.5C13.8978 16.5 14.2794 16.658 14.5607 16.9393C14.842 17.2206 15 17.6022 15 18V24L13.5 25.5V33"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M25.5 10.5C27.1569 10.5 28.5 9.15685 28.5 7.5C28.5 5.84315 27.1569 4.5 25.5 4.5C23.8431 4.5 22.5 5.84315 22.5 7.5C22.5 9.15685 23.8431 10.5 25.5 10.5Z"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M22.5 33V27H19.5L22.5 18C22.5 17.6022 22.658 17.2206 22.9393 16.9393C23.2206 16.658 23.6022 16.5 24 16.5H27C27.3978 16.5 27.7794 16.658 28.0607 16.9393C28.342 17.2206 28.5 17.6022 28.5 18L31.5 27H28.5V33"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
                    Board
                  </p>
                  <p className={`mt-2 font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                    Our board provides strategic guidance and oversight,
                    ensuring we stay true to our mission and values while
                    driving innovation and growth.
                  </p>
                </div>
              </div>

              {/* <!-- Press Card --> */}
              <div className="flex p-4 shadow-md">
                <div className="mr-6">
                  <svg
                    width="36"
                    height="36"
                    viewBox="0 0 36 36"
                    // className="text-white"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M28.5 7.5H7.5C5.84315 7.5 4.5 8.84315 4.5 10.5V25.5C4.5 27.1569 5.84315 28.5 7.5 28.5H28.5C30.1569 28.5 31.5 27.1569 31.5 25.5V10.5C31.5 8.84315 30.1569 7.5 28.5 7.5Z"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M4.5 10.5L18 19.5L31.5 10.5"
                      stroke={`${clientMode === 'light' ? '#1F2937' : '#f7f8fa'}`}
                      strokeWidth="2.75"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="">
                  <p className={`font-semibold lg:text-2xl text-xl lg:leading-6 leading-5 ${clientMode === 'light' ? 'text-gray-800' : 'text-gray-100'}`}>
                    Press
                  </p>
                  <p className={`mt-2 font-normal text-base leading-6 ${clientMode === 'light' ? 'text-gray-600' : 'text-gray-200'}`}>
                    Stay updated with our latest news and media coverage.
                    Discover how we’re making headlines and inspiring stories in
                    the industry.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
