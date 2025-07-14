import LandPagePic1 from '../components/images/lp1.jpg';
import Journey from '../components/journey.jsx';
import Picture1 from '../components/images/PicCallMeDebra.jpg';
import Picture2 from '../components/images/PicHikari.jpg';
import Picture3 from '../components/images/PicLeBlanc.jpg';
import Picture4 from '../components/images/PicZeroBlitz.jpg';

const LandingPage = () => {
  return (
    <>
      <section className="relative flex min-h-screen flex-col items-start justify-center overflow-x-hidden bg-[url('./src/components/images/BGYuwe.jpg')] bg-cover bg-center px-10 py-16 text-left">
        <div className="absolute inset-0 z-0 bg-black/60"></div>
        <div className="relative z-10 flex max-w-5xl flex-col items-start space-y-8">
          <h1 className="rounded-2xl bg-black/70 px-6 py-4 text-6xl leading-tight font-extrabold text-black shadow-lg lg:text-7xl">
            Ignite Your Tastebuds <br /> with{' '}
            <span className="text-[#EA1A20]">Alas</span> Hot Sauce
          </h1>
          <p className="rounded-2xl bg-black/70 px-6 py-3 text-2xl leading-relaxed text-black shadow-md">
            Handcrafted, bold, and unforgettable flavors for every spice lover.
          </p>
          <a
            href="/ProductListPage"
            className="inline-block rounded-full bg-[#EA1A20] px-10 py-4 text-xl font-semibold text-black shadow-xl transition-all duration-300 hover:bg-red-700"
          >
            Shop Now
          </a>
        </div>
      </section>
      <section className="flex h-screen flex-col justify-center bg-[url('./src/components/images/BGS.jpg')] bg-cover bg-center px-6 py-24 text-center sm:px-10">
        <h2 className="mb-16 text-6xl font-extrabold text-black drop-shadow">
          Our Signature Collection
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { src: Picture1, name: 'Call Me Debra' },
            { src: Picture2, name: 'Hikari' },
            { src: Picture3, name: 'Lé Blanc' },
            { src: Picture4, name: 'Zero Blitz' },
          ].map((prod, i) => (
            <div
              key={i}
              className="flex transform cursor-pointer flex-col items-center rounded-3xl bg-black/40 p-8 backdrop-blur-lg transition-transform hover:scale-105 hover:shadow-2xl"
            >
              <img
                src={prod.src}
                alt={prod.name}
                className="mb-6 h-[200px] w-[200px] rounded-full border-4 border-[#EA1A20] object-cover shadow-lg"
              />
              <p className="mb-6 text-3xl font-bold tracking-wide text-black">
                {prod.name}
              </p>
              <button className="rounded-full bg-black px-6 py-3 font-semibold tracking-wide text-black uppercase transition hover:bg-gray-900">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="flex h-screen flex-col items-center justify-between bg-[url('./src/components/images/spicyredbg.png')] bg-cover bg-center bg-no-repeat px-6 py-16 text-black md:px-10 lg:flex-row">
        <div className="mb-12 max-w-xl lg:mb-0">
          <h2 className="mb-6 text-5xl leading-tight font-bold">
            The Story Behind <span className="text-[#FFD700]">Alas</span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed">
            What began as a family passion turned into a spicy revolution.
            Discover how we crafted flavors that spark joy in every bite.
          </p>
          <Journey />
        </div>
        <img
          src={LandPagePic1}
          alt="Our Story"
          className="h-[400px] w-auto transform rounded-2xl object-cover shadow-2xl transition-transform hover:scale-105 md:h-[500px]"
        />
      </section>

      {/* <section className="min-h-[50vh] flex flex-col justify-center items-center px-6 md:px-8 py-16 text-center">
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
        </section> */}
    </>
  );
};

export default LandingPage;
