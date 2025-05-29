import React from "react";
import Contact_Pic from "../components/images/contact_us_pic.png";
import { FaSquareFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

function ContactUs() {
  return (
    <>
      <section className='max-h-full h-screen w-full bg-[url("./src/components/images/customer_bg.png")] bg-cover bg-no-repeat'>
        <div className="pt-22 flex flex-col items-center justify-center ">
          <div className="grid grid-cols-2 gap-15 py-5 w-7xl bg-black/20 rounded-4xl p-20 text-white">
            <div className="flex flex-col items-center justify-center">
              <p className="text-[30px]">Contact Us</p>
              <h1 className="text-[50px] font-bold italic">
                Get in touch with the owners
              </h1>
              <p className="text-[20px] ">
                Wanting to collaborate with Alas Deli’s and Spices? Use the
                Information below to contact us!
              </p>
            </div>
            <div className="row-span-2">
              <img src={Contact_Pic} alt="Contact_Pic" className="h-[550px] w-[500px] " />
            </div>
            <div className="flex flex-col items-center justify-center gap-y-5">
              <div className="flex flex-row items-center justify-center ">
                <FaSquareFacebook size={60} className="text-[#FFFFFF] mr-10" />
                <h1>ALAS Hot Sauce</h1>
              </div>
              <div className="flex flex-row items-center justify-center ">
                <FaInstagram size={60} className="text-[#FFFFFF] mr-10" />
                <h1>ALAS Hot Sauce</h1>
              </div>
              <div className="flex flex-row items-center justify-center ">
                <FaTiktok size={60} className="text-[#FFFFFF] mr-10" />
                <h1>ALAS Hot Sauce</h1>
              </div>
              <div className="flex flex-row items-center justify-center ">
                <MdOutlineMailOutline
                  size={60}
                  className="text-[#FFFFFF] mr-10"
                />
                <h1>ALAS Hot Sauce</h1>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactUs;
