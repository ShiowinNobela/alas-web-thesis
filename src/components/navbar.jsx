import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import CTAButton from '../components/CTAButton';
import Logo from '../components/images/logowhite.png';
import UserDropdown from './UserDropdown';
const navItemStyle =
  'px-2 py-2 border-b-2 border-transparent hover:border-brand hover:text-brand transition-all cursor-pointer';

function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  try {
    return JSON.parse(atob(base64));
  } catch (err) {
    console.log('Invalid token format', err);
    return null;
  }
}

function Navbar() {
  const [nav, setNav] = useState(true);
  const location = useLocation();
  const storedUser = JSON.parse(window.localStorage.getItem('user'));
  const userInfo = storedUser ? parseJwt(storedUser.token) : null;

  const navhandler = () => {
    setNav(!nav);
  };

  const isActive = (path) => location.pathname === path;

  const getNavItemClass = (path) =>
    `${navItemStyle} ${isActive(path) ? 'text-brand' : ''}`;

  return (
    <div className="sticky top-0 z-50 w-full bg-white drop-shadow-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-6 py-4 md:px-4">
        <Link to="/">
          <img
            className="h-10 w-auto cursor-pointer transition-all duration-200 md:h-15"
            src={Logo}
            alt="/"
          />
        </Link>
        <ul className="text-content font-heading hidden gap-6 text-lg uppercase md:flex">
          <Link to="/">
            <li className={getNavItemClass('/')}>Home</li>
          </Link>
          <Link to="/ProductListPage">
            <li className={getNavItemClass('/ProductListPage')}>Menu</li>
          </Link>
          <Link to="/AboutUs">
            <li className={getNavItemClass('/AboutUs')}>About</li>
          </Link>
          <Link to="/ContactUs">
            <li className={getNavItemClass('/ContactUs')}>Contact</li>
          </Link>
          <Link to="/Faqs">
            <li className={getNavItemClass('/Faqs')}>FAQ</li>
          </Link>

          {storedUser ? (
            <li>
              <UserDropdown user={userInfo} />
            </li>
          ) : (
            <Link to="/LoginPage">
              <li className={getNavItemClass('/LoginPage')}>Sign In</li>
            </Link>
          )}

          {storedUser ? (
            <CTAButton to="/ProductListPage">Order</CTAButton>
          ) : (
            <CTAButton to="/LoginPage">Order</CTAButton>
          )}

          {/* <Link to="//ProductListPage"></Link> */}
        </ul>

        <div onClick={navhandler} className="block md:hidden">
          {!nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
        </div>
        <div
          className={
            !nav
              ? 'fixed top-0 left-0 h-full w-[70%] border-r bg-[#EA1A20] duration-500 ease-in-out'
              : 'fixed left-[-100%]'
          }
        >
          <img
            className="h-16 w-25 pt-3 pl-5"
            src="./src/components/images/logo.png"
            alt="/"
          />
          <ul className="p uppercase">
            <li className="border-black-300 border-b p-5">Home</li>
            <li className="border-black-300 border-b p-5">products</li>
            <li className="border-black-300 border-b p-5">FAQs</li>
            <li className="border-black-300 border-b p-5">About Us</li>
            <li className="border-black-300 border-b p-5">Contact Us</li>
            <li className="border-black-300 border-b p-5">Sign In</li>
            <li className="border-black-300 border-b p-5">Order</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
