import {
  FaSquareFacebook,
  FaInstagram,
  FaTiktok,
  FaLocationDot,
} from 'react-icons/fa6';
import { MdOutlineMailOutline, MdPhone } from 'react-icons/md';

function ContactUs() {
  return (
    <section className="min-h-full bg-yellow-100 py-10">
      <div className="text-center">
        <h1 className="mb-8 text-2xl font-semibold tracking-wide text-black uppercase">
          Contact Us
        </h1>

        <div className="mx-auto grid max-w-5xl grid-cols-1 overflow-hidden rounded-3xl shadow-2xl md:grid-cols-2">
          {/* Left - Orange Contact Info */}
          <div className="flex flex-col justify-center gap-6 bg-[#d47849] px-8 py-12 text-white">
            <p className="text-xl font-semibold uppercase">Let's connect</p>

            <div className="mt-4 flex items-start gap-3">
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
                className="transition-transform hover:scale-110"
              />
              <FaSquareFacebook
                size={26}
                className="transition-transform hover:scale-110"
              />
              <FaInstagram
                size={26}
                className="transition-transform hover:scale-110"
              />
            </div>
          </div>

          {/* Right - Quote with blurred white background */}
          <div className="flex items-center justify-center bg-white/70 p-10 text-black backdrop-blur-sm">
            <p className="max-w-md text-center text-lg leading-relaxed text-gray-800 sm:text-xl md:text-2xl">
              "We pride ourselves on different flavor profiles, not just heat"
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactUs;
