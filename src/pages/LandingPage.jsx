import LandPagePic1 from "../components/images/lp1.jpg";
import RevIcon from "../components/images/reviewIcon.png";
import { FaStar } from "react-icons/fa";
import Journey from "../components/journey.jsx";
import Footer from "../components/footer.jsx";
import Picture1 from "../components/images/PicCallMeDebra.jpg"
import Picture2 from "../components/images/PicHikari.jpg"
import Picture3 from "../components/images/PicLeBlanc.jpg"
import Picture4 from "../components/images/PicZeroBlitz.jpg"
import { useState } from "react";

const LandingPage = () => {
  const [productstars, setProductStars] = useState(Array(5).fill(1))
  return (
    <>
      <section className="relative bg-[url('./src/components/images/BGYuwe.jpg')] bg-cover bg-center min-h-screen flex flex-col justify-center items-start px-10 py-16 text-left">
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="relative z-10 max-w-5xl flex flex-col items-start space-y-8">
          <h1 className="bg-black/70 px-6 py-4 text-6xl lg:text-7xl font-extrabold text-white rounded-2xl leading-tight shadow-lg">
            Ignite Your Tastebuds <br /> with <span className="text-[#EA1A20]">Alas</span> Hot Sauce
          </h1>
          <p className="bg-black/70 px-6 py-3 text-2xl text-white rounded-2xl leading-relaxed shadow-md">
            Handcrafted, bold, and unforgettable flavors for every spice lover.
          </p>
          <a
            href="/ProductListPage"
            className="inline-block bg-[#EA1A20] text-white text-xl px-10 py-4 rounded-full hover:bg-red-700 transition-all duration-300 font-semibold shadow-xl"
          >
            Shop Now
          </a>
        </div>
      </section>

      <section className="bg-[url('./src/components/images/BGS.jpg')] h-screen bg-cover bg-center py-24 px-6 sm:px-10 text-center flex flex-col justify-center">
        <h2 className="text-6xl font-extrabold text-black drop-shadow mb-16">Our Signature Collection</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 max-w-7xl mx-auto">
          {[{ src: Picture1, name: 'Call Me Debra' }, { src: Picture2, name: 'Hikari' }, { src: Picture3, name: 'Lé Blanc' }, { src: Picture4, name: 'Zero Blitz' }].map((prod, i) => (
            <div
              key={i}
              className="bg-black/40 backdrop-blur-lg flex flex-col items-center p-8 rounded-3xl transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer"
            >
              <img
                src={prod.src}
                alt={prod.name}
                className="w-[200px] h-[200px] object-cover mb-6 rounded-full border-4 border-[#EA1A20] shadow-lg"
              />
              <p className="text-3xl font-bold text-white mb-6 tracking-wide">{prod.name}</p>
              <button className="bg-black text-white px-6 py-3 rounded-full hover:bg-gray-900 transition font-semibold tracking-wide uppercase">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-[url('./src/components/images/spicyredbg.png')] bg-cover bg-no-repeat bg-center h-screen flex flex-col lg:flex-row items-center justify-between px-6 md:px-10 py-16 text-white">
          <div className="max-w-xl mb-12 lg:mb-0">
            <h2 className="text-5xl font-bold mb-6 leading-tight">
              The Story Behind <span className="text-[#FFD700]">Alas</span>
            </h2>
            <p className="text-lg mb-8 leading-relaxed">
              What began as a family passion turned into a spicy revolution. Discover how we crafted flavors that spark joy in every bite.
            </p>
            <Journey />
          </div>
          <img
            src={LandPagePic1}
            alt="Our Story"
            className="h-[400px] md:h-[500px] w-auto rounded-2xl shadow-2xl object-cover transition-transform transform hover:scale-105"
          />
        </section>

        <section className="min-h-[50vh] flex flex-col justify-center items-center px-6 md:px-8 py-16 text-center">
          <h2 className="text-5xl font-bold text-black mb-12">Hear From Our Fans</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 w-full max-w-7xl">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-[#e4e4e4d7] border-1 border-[#b9b5b5d7] text-black p-6 rounded-2xl flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <img src={RevIcon} alt="Review Icon" className="w-20 h-20 mb-4" />
                <p className="font-bold text-xl mb-2">Clark Trogo</p>
                <div className="flex items-center mb-3">
                  {productstars.map(() => (
                    <FaStar className="w-5 h-5 text-yellow-400 mr-1"/>
                  ))}
                </div>
                <p className="text-center text-sm leading-relaxed">Absolutely love the heat and depth of flavor. Highly recommended!</p>
              </div>
            ))}
          </div>
        </section>
        <Footer />
    </>
  );
};

export default LandingPage;
