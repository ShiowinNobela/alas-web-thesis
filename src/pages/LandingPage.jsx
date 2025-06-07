import Navbar from "../components/navbar.jsx";
import LandPagePic1 from "../components/images/lp1.jpg";
import LandPagePic2 from "../components/images/lp2.jpg";
import DiamondDesign from "../components/images/diamondDesign.png";
import RevIcon from "../components/images/reviewIcon.png";
import Holder from "../components/images/prod1.jpg";
import Prod1 from "../components/images/prod1.jpg";
import Prod2 from "../components/images/prod2.jpg";
import Prod3 from "../components/images/prod3.jpg";
import Prod4 from "../components/images/prod4.jpg";
import { FaStar } from "react-icons/fa";
import Journey from "../components/journey.jsx";
import Footer from "../components/footer.jsx";

const LandingPage = () => {
  return (
    <>
      <section className="bg-[url('./src/components/images/lp1.jpg')] bg-cover bg-center min-h-full flex flex-col justify-center items-end px-10 text-left">
        <h1 className="bg-[#000000c9] text-7xl font-extrabold text-white mb-6 py-6 px-4 rounded-2xl max-w-5xl">
          Ignite Your Tastebuds <br /> with <span className="text-[#EA1A20]">Alas</span> Hot Sauce
        </h1>
        <p className="bg-[#000000c9] py-6 px-4 rounded-2xl text-2xl text-white max-w-xl mb-8">
          Handcrafted, bold, and unforgettable flavors for every spice lover.
        </p>
        <a href="/ProductListPage" className="bg-[#bc181d] text-white text-xl p-4 px-6 rounded-2xl border-1 border-[#cdc2c2] hover:bg-red-600 transition cursor-pointer">
          Shop Now
        </a>
      </section>

      <section className="bg-[url('./src/components/images/landpagebg1.png')] bg-cover bg-center min-h-full flex flex-col justify-center items-center px-10 py-16 text-center">
        <h2 className="text-5xl font-bold mb-10">Our Signature Collection</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[{ src: Prod1, name: 'Jinx' }, { src: Prod2, name: 'Kink' }, { src: Prod3, name: 'Big Bald Bob' }, { src: Prod4, name: 'Swan Song' }].map((prod, i) => (
            <div key={i} className="flex flex-col items-center p-5 bg-gray-100 rounded-xl hover:shadow-lg transition cursor-pointer">
              <img src={prod.src} alt="/" className="w-[180px] h-[180px] object-cover mb-5" />
              <p className="text-2xl font-semibold mb-3">{prod.name}</p>
              <button className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('./src/components/images/spicyredbg.png')] bg-cover bg-no-repeat min-h-[60vh] flex flex-col lg:flex-row items-center justify-between px-10 py-16 text-white">
        <div className="max-w-xl mb-10 lg:mb-0">
          <h2 className="text-5xl font-bold mb-6">The Story Behind <span className="text-[#FFD700]">Alas</span></h2>
          <p className="text-lg mb-6">
            What began as a family passion turned into a spicy revolution. Discover how we crafted flavors that spark joy in every bite.
          </p>
          <Journey />
        </div>
        <img src={LandPagePic1} alt="/" className="h-[500px] w-auto rounded-lg shadow-lg" />
      </section>

      <section className="bg-[url('./src/components/images/landpagebg3.png')] bg-cover bg-center min-h-[80vh] flex flex-col justify-center items-center px-10 py-16 text-center">
        <h2 className="text-5xl font-bold text-white mb-10">Hear From Our Fans</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white/80 text-black p-5 rounded-xl flex flex-col items-center hover:scale-105 transition cursor-pointer">
              <img src={RevIcon} alt="/" className="w-[80px] h-[80px] mb-3" />
              <p className="font-bold text-xl mb-2">Shiori Novella</p>
              <div className="flex items-center mb-2">
                <FaStar className="w-[20px] h-[20px] text-yellow-400 mr-1" />
                <p className="text-base">5/5</p>
              </div>
              <p className="text-center text-sm">Absolutely love the heat and depth of flavor. Highly recommended!</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('./src/components/images/landpagebg4.png')] bg-cover flex flex-col items-center justify-center min-h-screen px-10 py-16">
        <h2 className="text-5xl font-bold text-white mb-10">Let’s Connect</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {[{ title: 'Visit Us In Store', text: 'Walk in anytime and experience the magic in person.', button: 'Learn More' },
            { title: 'Spicy FAQs', text: 'Got burning questions? We have sizzling answers.', button: 'View FAQ' },
            { title: 'Get in Touch', text: 'For custom orders or partnerships — let’s talk!', button: 'Contact Us' }
          ].map((card, i) => (
            <div key={i} className="bg-white/80 p-8 rounded-xl text-center flex flex-col items-center hover:scale-105 transition cursor-pointer">
              <img src={Holder} alt="/" className="h-[120px] w-[120px] mb-5" />
              <h3 className="text-xl font-bold mb-3">{card.title}</h3>
              <p className="text-base mb-5">{card.text}</p>
              <button className="bg-[#EA1A20] text-white px-4 py-2 rounded hover:bg-red-600 transition">
                {card.button}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-black flex flex-col justify-center items-center text-center py-10">
        <Footer />
      </section>

    </>
  );
};

export default LandingPage;
