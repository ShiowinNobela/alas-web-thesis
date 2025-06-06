import React, { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../components/images/logowhite.png";
const navItemStyle =
  "px-5 py-1 border-b-2 border-transparent hover:border-yellow-300 hover:text-yellow-200 transition-all cursor-pointer";

function navbar() {
  const [nav, setNav] = useState(true);
  const location = useLocation();

  const navhandler = () => {
    setNav(!nav);
  };

  const isActive = (path) => location.pathname === path;

  const getNavItemClass = (path) =>
    `${navItemStyle} ${
      isActive(path) ? "border-yellow-300 text-yellow-200 font-semibold" : ""
    }`;

  return (
    <div className="bg-[#EA1A20] w-[100%] z-50 sticky top-0">
      <div className="flex justify-between items-center h-20 mx-auto max-w-[1440px] px-4">
        <img className=" h-20 w-40 cursor-pointer" src={Logo} alt="/" />
        <ul className="text-white hidden uppercase md:flex ">
          <Link to="/">
            <li className={getNavItemClass("/")}>Home</li>
          </Link>
          <Link to="/ProductListPage">
            <li className={getNavItemClass("/ProductListPage")}>Products</li>
          </Link>
          <Link to="/Faqs">
            <li className={getNavItemClass("/Faqs")}>FAQs</li>
          </Link>
          <Link to="/AboutUs">
            <li className={getNavItemClass("/AboutUs")}>About Us</li>
          </Link>
          <Link to="/ContactUs">
            <li className={getNavItemClass("/ContactUs")}>Contact Us</li>
          </Link>
          {window.localStorage.getItem("user") ? (
            <Link to="UserSettings">
              <button className={navItemStyle}>SETTINGS</button>
            </Link>
          ) : (
            <Link to="/LoginPage">
              <li className="px-5 py-1 cursor-pointer">Sign In</li>
            </Link>
          )}

          {window.localStorage.getItem("user") ? (
            <Link to="/ProductListPage">
              <button className="px-5 py-1 cursor-pointer text-[#000000] bg-[#FFD700] mx-auto rounded-2xl font-semibold ml-5">
                Order
              </button>{" "}
            </Link>
          ) : (
            <Link to="/LoginPage">
              <button className="px-5 py-1 cursor-pointer text-[#000000] bg-[#FFD700] mx-auto rounded-2xl font-semibold ml-5">
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
