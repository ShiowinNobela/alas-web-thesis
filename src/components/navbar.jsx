import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { IoIosArrowDropdown } from "react-icons/io";
import { Link } from "react-router-dom";
import Logo from "../components/images/logowhite.png";
const navItemStyle =
  "px-5 py-1 rounded-md bg-red text-black-700 hover:bg-yellow-300 hover:text-black hover:shadow-md transition-all cursor-pointer";

function navbar() {
  const [nav, setNav] = useState(true);

  const navhandler = () => {
    setNav(!nav);
  };

  return (
    <div className="bg-[#EA1A20] top-0 fixed w-[100%] z-50">
      <div className="flex justify-between items-center h-20 mx-auto max-w-[1440px] px-4">
        <img className=" h-20 w-40 cursor-pointer" src={Logo} alt="/" />
        <ul className="text-white hidden uppercase md:flex ">
          <Link to="/">
            <li className={navItemStyle}>Home</li>
          </Link>
          <Link to="/ProductListPage">
            <li className={navItemStyle}>products</li>
          </Link>
          <Link to="/Faqs">
            <li className={navItemStyle}>FAQs</li>
          </Link>
          <Link to="/AboutUs">
            <li className={navItemStyle}>About Us</li>
          </Link>
          <Link to="/ContactUs">
            <li className={navItemStyle}>Contact Us</li>
          </Link>
          {window.localStorage.getItem("user") ? (
            <button className="group relative px-5 py-1 rounded-2xl w-40 ">
              SETTINGS
              <div className=" text-black absolute top-full right-0 rounded-2xl p-3 mt-1 shadow-lg scale-y-0 group-focus:scale-y-100 origin-top bg-white w-40">
                <div
                  onClick={() => {
                    window.location.href = "/UserSettings";
                  }}
                >
                  User Settings
                </div>
                <p
                  onClick={() => {
                    window.location.href = "/UserOrderPage";
                  }}
                >
                  Order List
                </p>

                <p
                  onClick={() => {
                    window.localStorage.removeItem("user");
                    window.location.href = "/LoginPage";
                  }}
                >
                  Logout
                </p>
              </div>
            </button>
          ) : (
            <Link to="/LoginPage">
              <li className="px-5 py-1 cursor-pointer">Sign In</li>
            </Link>
          )}

          {window.localStorage.getItem("user") ? (
            <Link to="/ProductListPage">
              <button className="px-5 py-1 cursor-pointer text-[#000000] bg-[#FFD700] mx-auto rounded-2xl font-semibold">
                Order
              </button>{" "}
            </Link>
          ) : (
            <Link to="/LoginPage">
              <button className="px-5 py-1 cursor-pointer text-[#000000] bg-[#FFD700] mx-auto rounded-2xl font-semibold">
                Order
              </button>{" "}
            </Link>
          )}

          {/* <Link to="//ProductListPage"></Link> */}
        </ul>

        <div onClick={navhandler} className=" block md:hidden">
          {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            !nav
              ? "fixed left-0 top-0 w-[70%] h-full border-r ease-in-out duration-500 bg-[#EA1A20] "
              : "fixed left-[-100%]"
          }
        >
          <img
            className="pt-3 pl-5 h-16 w-25"
            src="./src/components/images/logo.png"
            alt="/"
          />
          <ul className="uppercase p">
            <li className="p-5 border-b border-black-300">Home</li>
            <li className="p-5 border-b border-black-300">products</li>
            <li className="p-5 border-b border-black-300">FAQs</li>
            <li className="p-5 border-b border-black-300">About Us</li>
            <li className="p-5 border-b border-black-300">Contact Us</li>
            <li className="p-5 border-b border-black-300">Sign In</li>
            <li className="p-5 border-b border-black-300">Order</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default navbar;
