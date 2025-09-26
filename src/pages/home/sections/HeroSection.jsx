import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';

const HeroSection = () => {
  const user = useUserStore((state) => state.user);

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex min-h-[500px] w-full items-center justify-center bg-cover bg-center bg-no-repeat md:min-h-[500px]"
        style={{
          backgroundImage: `url(${'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351380/herogif_rs4vtw.gif'})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="font-heading mb-6 text-5xl font-bold text-white drop-shadow-lg sm:text-5xl md:text-6xl">
              Artisanal Hot Sauce and Some Spicy Stuff
            </h1>

            <p className="mb-8 text-lg text-white opacity-90 md:text-xl">
              We pride ourselves on different flavor profiles, not just heat. Anything that's spicy as a whole, we have
              it. From powders, to pickles, to oils, to sauces, name it.
            </p>

            <div className="flex flex-col justify-center gap-4 px-8 sm:flex-row">
              <Link to={user ? '/ProductListPage' : '/LoginPage'}>
                <Button variant="CTA" size="lg" className="px-8 font-medium text-white">
                  Order Now
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2"></div>
      </div>
    </section>
  );
};

export default HeroSection;

// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';
// import useUserStore from '@/stores/userStore';

// const HeroSection = () => {
//   const user = useUserStore((state) => state.user);

//   return (
//     <section className="relative bg-[#F4EBBE] dark:bg-[#4A4320]">
//       <div className="container mx-auto flex max-w-5xl flex-col items-center justify-between gap-10 px-6 py-20 md:flex-row">
//         {/* Text Content */}
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="font-heading text-content mb-4 text-4xl font-bold sm:text-5xl md:text-6xl">
//             Artisanal Hot Sauce, <br /> Flavor with Heat
//           </h1>

//           <p className="text-muted-foreground mb-8 max-w-xl text-lg md:text-xl">
//             Flavor comes first, heat comes second. Explore powders, pickles, oils, and sauces — everything spicy,
//             crafted for bold taste.
//           </p>

//           <Link to={user ? '/ProductListPage' : '/LoginPage'}>
//             <Button variant="CTA" size="lg" className="px-8 font-medium">
//               Order Now
//             </Button>
//           </Link>
//         </div>

//         {/* Image Side */}
//         <div className="flex flex-1 justify-center">
//           <img
//             src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758790358/hero_psicad.jpg"
//             alt="Spicy hot sauce bottle"
//             className="max-h-[400px] w-auto rounded-lg shadow-lg"
//           />
//         </div>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;
