import { Button } from '@/components/ui/button';
import LandPagePic1 from '../components/images/lp1.jpg';
import Picture1 from '../components/images/PicCallMeDebra.jpg';
import Picture2 from '../components/images/PicHikari.jpg';
import Picture3 from '../components/images/PicLeBlanc.jpg';
import Picture4 from '../components/images/PicZeroBlitz.jpg';
import herogif from '@/components/images/herogif.gif';
import { FireExtinguisherIcon } from 'lucide-react';

const LandingPage = () => {
  return (
    <>
      <section className="relative">
        <div
          className="flex min-h-[500px] w-full items-center justify-center bg-cover bg-center bg-no-repeat md:min-h-[500px]"
          style={{ backgroundImage: `url(${herogif})` }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="relative z-10 container mx-auto px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h1 className="font-heading mb-6 text-4xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
                Artisanal Hot Sauce and Some Spicy Stuff
              </h1>
              <p className="mb-8 text-lg text-white opacity-90 md:text-xl">
                We pride ourselves on different flavor profiles, not just heat.
                Anything that’s spicy as a whole, we have it. From powders, to
                pickles, to oils, to sauces, name it.
              </p>
              <div className="flex flex-col justify-center gap-4 px-8 sm:flex-row">
                <Button
                  variant="CTA"
                  className="px-6 font-medium text-white transition hover:bg-amber-700 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:outline-none"
                >
                  Order Now
                </Button>
                <Button
                  variant="outline"
                  className="bg-white/20 px-6 font-medium text-white backdrop-blur-sm transition hover:bg-white/40 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:outline-none"
                >
                  VIEW MENU
                </Button>
              </div>
            </div>
          </div>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <FireExtinguisherIcon className="size-10 text-amber-100" />
          </div>
        </div>
      </section>

      <section className="border-b-2 border-zinc-300 bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-3 sm:flex-row sm:gap-0">
            <div className="text-center text-xl sm:text-left">
              <span className="font-bold text-amber-500">🔥 Hot Deal: </span>
              <span className="text-content">
                Sizzling Hot Sale for Chili Lovers, Use Code{' '}
                <span className="font-heading font-semibold text-red-600 italic">
                  ALASAUCE68
                </span>
              </span>
            </div>
            <Button className="bg-red-600 px-5 py-1.5 font-medium whitespace-nowrap text-white transition hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:outline-none">
              Shop Sauces
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-neutral flex min-h-screen flex-col p-16 text-center sm:px-10">
        <h2 className="text-content font-heading mb-16 text-4xl font-extrabold drop-shadow sm:text-5xl lg:text-6xl">
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
              <p className="text-content mb-6 text-2xl font-bold tracking-wide sm:text-3xl">
                {prod.name}
              </p>
              <button className="rounded-full bg-white px-6 py-3 font-semibold tracking-wide text-black uppercase transition hover:bg-gray-200">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="text-content flex min-h-screen flex-col items-center justify-between bg-gray-100 bg-cover bg-center bg-no-repeat px-6 py-16 md:px-10 lg:flex-row">
        <div className="mb-12 max-w-xl lg:mb-0">
          <h2 className="mb-6 text-4xl leading-tight font-bold sm:text-5xl">
            The Story Behind <span className="text-[#FFD700]">Alas</span>
          </h2>
          <p className="mb-8 text-lg leading-relaxed">
            What began as a family passion turned into a spicy revolution.
            Discover how we crafted flavors that spark joy in every bite.
          </p>
        </div>
        <img
          src={LandPagePic1}
          alt="Our Story"
          className="h-[400px] w-auto transform rounded-2xl object-cover shadow-2xl transition-transform hover:scale-105 md:h-[500px]"
        />
      </section>
    </>
  );
};

export default LandingPage;
