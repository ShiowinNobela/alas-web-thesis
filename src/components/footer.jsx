import Logo from '../components/images/AlasLogo.png'

import { FaFacebook, FaInstagram, FaTiktok } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

function footer() {
  return (
    <>
        <footer className="w-full bg-black text-white px-6 py-12">
          {/* logo */}
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center mb-10 space-y-8 lg:space-y-0">
            <div className="flex items-center space-x-4">
              <img
                src={Logo}
                alt="Alas Logo"
                className="h-[80px] lg:h-[120px] object-contain cursor-pointer"
              />
              <span className="text-white text-lg lg:text-2xl font-semibold">
                Alas Deli’s and Spices
              </span>
            </div>
            
            <ul className="flex flex-col lg:flex-row items-center gap-6 text-center text-sm lg:text-base">
              <li className="cursor-pointer hover:text-[#EA1A20] transition">Products</li>
              <li className="cursor-pointer hover:text-[#EA1A20] transition">About Us</li>
              <li className="cursor-pointer hover:text-[#EA1A20] transition">Contact Us</li>
            </ul>
          </div>

          <div className="border-t border-gray-700 my-6"></div>

          {/* socials */}
          <div className="max-w-4xl mx-auto flex flex-col items-center space-y-6">
            <ul className="flex gap-6 text-xl">
              <li>
                <FaFacebook className="cursor-pointer hover:text-[#4267B2] transition" />
              </li>
              <li>
                <FaInstagram className="cursor-pointer hover:text-[#C13584] transition" />
              </li>
              <li>
                <FaTiktok className="cursor-pointer hover:text-[#69C9D0] transition" />
              </li>
              <li>
                <MdEmail className="cursor-pointer hover:text-[#EA1A20] transition" />
              </li>
            </ul>
            <p className="text-xs text-gray-400 text-center">
              © 2025 Alas Deli’s and Spices. All rights reserved.
            </p>
            <ul className="flex gap-6 text-xs text-gray-400">
              <li className="cursor-pointer hover:underline">Privacy</li>
              <li className="cursor-pointer hover:underline">Cookie Policy</li>
            </ul>
          </div>
        </footer>
    </>
  )
}

export default footer