import { Button } from '@/components/ui/button';
import LandPagePic1 from '../components/images/lp1.jpg';
import herogif from '@/components/images/herogif.gif';
import { FireExtinguisherIcon } from 'lucide-react';
import BentoGrid from '@/components/bigComponents/BentoGrid';

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
              <h1 className="font-heading mb-6 text-5xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
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

      <section className="bg-amber-400/20 py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="font-heading text-4xl font-bold text-gray-800">
              Spice Up Your Life, Like Damn Move
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-gray-600">
              Artisanal heat crafted for flavor explorers. Each product tells a
              story of passion.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* I don't know how to design this */}
            <div className="group relative overflow-hidden rounded-2xl bg-amber-50 shadow-lg">
              <div className="absolute -top-10 -right-10 z-0 h-40 w-40 rounded-full bg-amber-200/50"></div>
              <div className="relative z-10 p-6">
                <div className="mb-4 flex h-48 items-center justify-center">
                  <img
                    src="https://i.guim.co.uk/img/media/1d3a1b588915aaae8d2ceefae6294414d7181077/0_100_5758_3455/master/5758.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5a7552da71c715988803a0d764fc3390"
                    alt="Classic ALAS Hot Sauce"
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold">Classic ALAS</h3>
                  <div className="mb-3 flex justify-center gap-1">
                    {[...Array(3)].map((_, i) => (
                      <FireExtinguisherIcon
                        key={i}
                        className="h-4 w-4 fill-amber-500 text-amber-500"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    The perfect balance of heat and flavor
                  </p>
                  <button className="w-full rounded-lg bg-amber-500 py-2 text-sm font-medium text-white transition hover:bg-amber-600">
                    ₱300.00 • Add to Cart
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-red-50 shadow-lg">
              <div className="absolute -bottom-10 -left-10 z-0 h-40 w-40 rounded-full bg-red-200/50"></div>
              <div className="relative z-10 p-6">
                <div className="mb-4 flex h-48 items-center justify-center">
                  <img
                    src="https://i.guim.co.uk/img/media/1d3a1b588915aaae8d2ceefae6294414d7181077/0_100_5758_3455/master/5758.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5a7552da71c715988803a0d764fc3390"
                    alt="Extra Hot ALAS"
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold">Extra Hot</h3>
                  <div className="mb-3 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FireExtinguisherIcon
                        key={i}
                        className="h-4 w-4 fill-red-500 text-red-500"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    For those who dare to go hotter
                  </p>
                  <button className="w-full rounded-lg bg-red-500 py-2 text-sm font-medium text-white transition hover:bg-red-600">
                    ₱400.00 • Challenge Accepted
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-emerald-50 shadow-lg">
              <div className="absolute -top-5 -right-5 z-0 h-32 w-32 rounded-full bg-emerald-200/50"></div>
              <div className="relative z-10 p-6">
                <div className="mb-4 flex h-48 items-center justify-center">
                  <img
                    src="https://i.guim.co.uk/img/media/1d3a1b588915aaae8d2ceefae6294414d7181077/0_100_5758_3455/master/5758.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5a7552da71c715988803a0d764fc3390"
                    alt="Gift Set"
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold">Gift Collection</h3>
                  <div className="mb-3 flex justify-center gap-1">
                    {[...Array(4)].map((_, i) => (
                      <FireExtinguisherIcon
                        key={i}
                        className="h-4 w-4 fill-emerald-500 text-emerald-500"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    The perfect spicy gift package
                  </p>
                  <button className="w-full rounded-lg bg-emerald-500 py-2 text-sm font-medium text-white transition hover:bg-emerald-600">
                    ₱999.00 • Give the Gift of Heat
                  </button>
                </div>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl bg-purple-50 shadow-lg">
              <div className="absolute -bottom-5 -left-5 z-0 h-32 w-32 rounded-full bg-purple-200/50"></div>
              <div className="relative z-10 p-6">
                <div className="mb-4 flex h-48 items-center justify-center">
                  <img
                    src="https://i.guim.co.uk/img/media/1d3a1b588915aaae8d2ceefae6294414d7181077/0_100_5758_3455/master/5758.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=5a7552da71c715988803a0d764fc3390"
                    alt="New Product"
                    className="h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="text-center">
                  <h3 className="mb-1 text-xl font-bold">Ghost Pepper Blend</h3>
                  <div className="mb-3 flex justify-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FireExtinguisherIcon
                        key={i}
                        className="h-4 w-4 fill-purple-500 text-purple-500"
                      />
                    ))}
                  </div>
                  <p className="mb-4 text-sm text-gray-600">
                    Our newest extreme heat experience
                  </p>
                  <button className="w-full rounded-lg bg-purple-500 py-2 text-sm font-medium text-white transition hover:bg-purple-600">
                    ₱450.00 • Try It If You Dare
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <button className="inline-flex items-center gap-2 rounded-full border-2 border-amber-500 px-6 py-2.5 font-medium text-amber-600 transition hover:bg-amber-50">
              <FireExtinguisherIcon className="h-5 w-5" />
              Explore Our Full Range
            </button>
          </div>
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

      <BentoGrid />
    </>
  );
};

export default LandingPage;
