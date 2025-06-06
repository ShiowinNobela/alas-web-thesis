import { FaSquareFacebook, FaInstagram, FaTiktok } from "react-icons/fa6";
import { MdOutlineMailOutline } from "react-icons/md";

function ContactUs() {
  return (
    <>
  {/* Background */}
  <div className="h-full bg-gradient-to-b from-[#e8e6c2] to-[#eaeae7] flex justify-center py-10">
      
      {/* Base */}
      <div className="w-full max-w-4/6 bg-[#edecec] border-2 border-[#e7e2e2] rounded-3xl grid grid-cols-2">

        {/* Contact Info */}
        <div className="bg-[#d47849] border-[#bf663a] text-[#ffffff] p-8 rounded-l-3xl flex flex-col justify-center">
          <p className="text-4xl font-bold mb-4 uppercase">contact us</p>
          <p className="mb-6 text-lg text-justify">Whether you’re a long-time chili head or just starting your spicy journey, we’re always excited to hear from you! Got questions about our sauces? Need help picking the perfect trio for a gift box? Thinking about partnering with us or placing a bulk order? Whatever it is, we’re here and happy to help. We love connecting with our community—so don’t hesitate to reach out.</p>
          
          {/* Logo */}
        <div className="pt-2 text-xl font-semibold uppercase">
          <div className="flex flex-col gap-y-5">
            <div className="flex items-center gap-x-4">
              <FaTiktok size={40} className="text-[#ffffff]" />
              <p>TikTok</p>
            </div>
            <div className="flex items-center gap-x-4">
              <FaSquareFacebook size={40} className="text-[#ffffff]" />
              <p>Facebook</p>
            </div>
            <div className="flex items-center gap-x-4">
              <MdOutlineMailOutline size={40} className="text-[#ffffff]" />
              <p>Email</p>
            </div>
            <div className="flex items-center gap-x-4">
              <MdOutlineMailOutline size={40} className="text-[#ffffff]" />
              <p>Contact Number</p>
            </div>
          </div>
        </div>
        </div>

        {/* Form */}
        <div className="px-6 py-5">
          <div className="grid grid-cols-2 py-10 gap-4">
            <div className="relative z-0">
              <input type="text" id="name" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#e29772] peer" placeholder=" " />
              <label htmlFor="name" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#e29772] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Name</label>
            </div>

            <div className="relative z-0">
              <input type="email" id="email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#e29772] peer" placeholder=" " />
              <label htmlFor="email" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#e29772] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Your Email</label>
            </div>
          </div>

          <div className="relative z-0">
            <input type="text" id="subject" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#e29772] peer" placeholder=" " />
            <label htmlFor="subject" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#e29772] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Subject</label>
          </div>

          <div className="relative z-0 mt-10">
            <textarea id="message" rows="4" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-[#e29772] peer" placeholder=" "></textarea>
            <label htmlFor="message" className="absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-[#e29772] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
          </div>

        {/* Button */}
          <div className="w-fit bg-[#d47849] border-2 border-[#bf663a] text-[#ffffff] mt-10 px-6 py-2 rounded-md hover:bg-[#bf663a] cursor-pointer uppercase">
            <p>send message</p>
          </div>

        </div>
      </div>
    </div>

    </>
  );
}

export default ContactUs;

// tangina ayoko na pls...