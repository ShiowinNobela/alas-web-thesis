import {
  FaSquareFacebook,
  FaInstagram,
  FaTiktok,
  FaLocationDot,
} from "react-icons/fa6";
import { MdOutlineMailOutline, MdPhone } from "react-icons/md";

function ContactUs() {
  return (
    <section className="bg-yellow-100 min-h-screen py-10">
      <div className="text-center">
        <h1 className="uppercase tracking-wide font-semibold mb-8 text-2xl text-black">
          Contact Us
        </h1>

        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 shadow-2xl rounded-3xl overflow-hidden">
          {/* Left - Orange Contact Info */}
          <div className="bg-[#d47849] text-white flex flex-col gap-6 justify-center px-8 py-12">
            <p className="font-semibold text-xl uppercase">Let's connect</p>

            <div className="flex items-start gap-3 mt-4">
              <FaLocationDot size={24} />
              <p>Old Balara, Tandang Sora Avenue, Quezon City</p>
            </div>

            <div className="flex items-center gap-3">
              <MdPhone size={24} />
              <p>0995&nbsp;285&nbsp;8665 / +63&nbsp;995&nbsp;285&nbsp;8665</p>
            </div>

            <div className="flex items-center gap-3">
              <MdOutlineMailOutline size={24} />
              <p>kraffle02@gmail.com</p>
            </div>

            <div className="flex items-center gap-3">
              <FaInstagram size={24} />
              <p>Alas Delis and Spices (Instagram)</p>
            </div>

            <div className="flex items-center gap-3">
              <FaSquareFacebook size={24} />
              <p>ALAS Hot Sauce (Alas Hot Sauce)</p>
            </div>

            <div className="flex gap-4 pt-2">
              <FaTiktok
                size={26}
                className="hover:scale-110 transition-transform"
              />
              <FaSquareFacebook
                size={26}
                className="hover:scale-110 transition-transform"
              />
              <FaInstagram
                size={26}
                className="hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* Right - Quote with blurred white background */}
          <div className="bg-white/70 backdrop-blur-sm text-black flex items-center justify-center p-10">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-800 max-w-md leading-relaxed text-center">
              "We pride ourselves on different flavor profiles, not just heat"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
