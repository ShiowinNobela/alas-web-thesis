import { useState } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import CTAButton from "../components/CTAButton";
import Logo from "../components/images/logowhite.png";
import UserDropdown from "./UserDropdown";
const navItemStyle =
  "px-2 py-2 border-b-2 border-transparent hover:border-primary hover:text-primary transition-all cursor-pointer";

function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  try {
    return JSON.parse(atob(base64));
  } catch (e) {
    return null;
  }
}

function Navbar() {
  const [nav, setNav] = useState(true);
  const location = useLocation();
  const storedUser = JSON.parse(window.localStorage.getItem("user"));
  const userInfo = storedUser ? parseJwt(storedUser.token) : null;

  const navhandler = () => {
    setNav(!nav);
  };

  const isActive = (path) => location.pathname === path;

  const getNavItemClass = (path) =>
    `${navItemStyle} ${isActive(path) ? "text-primary" : ""}`;

  return (
    <div className="bg-white w-full z-50 sticky top-0 shadow">
      <div className="flex justify-between items-center mx-auto max-w-[1440px] px-6 py-4 md:px-4">
        <Link to="/">
          <img
            className="h-10 w-auto md:h-15 cursor-pointer transition-all duration-200"
            src={Logo}
            alt="/"
          />
        </Link>
        <ul className="text-content text-lg hidden uppercase md:flex font-heading gap-4">
          <Link to="/">
            <li className={getNavItemClass("/")}>Home</li>
          </Link>
          <Link to="/ProductListPage">
            <li className={getNavItemClass("/ProductListPage")}>Menu</li>
          </Link>
          <Link to="/Faqs">
            <li className={getNavItemClass("/Faqs")}>FAQs</li>
          </Link>
          <Link to="/AboutUs">
            <li className={getNavItemClass("/AboutUs")}>About Us</li>
          </Link>
          <Link to="/ContactUs">
            <li className={getNavItemClass("/ContactUs")}>Contact</li>
          </Link>
          {storedUser ? (
            <li>
              <UserDropdown user={userInfo} />
            </li>
          ) : (
            <Link to="/LoginPage">
              <li className={getNavItemClass("/LoginPage")}>
                <PersonOutlineIcon fontSize="large" className="mr-2" />
                Sign In
              </li>
            </Link>
          )}

          {storedUser ? (
            <CTAButton to="/ProductListPage">Order</CTAButton>
          ) : (
            <CTAButton to="/LoginPage">Order</CTAButton>
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

export default Navbar;
