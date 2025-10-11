import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';

const HeroSection = () => {
  const user = useUserStore((state) => state.user);

  return (
    <section className="relative overflow-hidden">
      <div
        className="flex min-h-[400px] w-full items-center justify-center bg-cover bg-center bg-no-repeat sm:min-h-[450px] md:min-h-[480px]"
        style={{
          backgroundImage: `url(${'https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351380/herogif_rs4vtw.gif'})`,
        }}
      >
        <div className="absolute inset-0 bg-black/30" />

        <div className="relative z-10 container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading mb-6 text-5xl font-bold text-white lg:text-7xl">
              Artisanal Hot Sauce and Some Spicy Stuff
            </h1>

            <p className="mb-6 text-sm text-white opacity-90 sm:mb-8 sm:text-lg">
              We pride ourselves on different flavor profiles, not just heat. Anything that's spicy as a whole, we have
              it. From powders, to pickles, to oils, to sauces, name it.
            </p>

            <div className="flex flex-col justify-center gap-4 px-4 sm:flex-row sm:px-8">
              <Link to={user ? '/ProductListPage' : '/LoginPage'}>
                <Button variant="CTA" size="lg" className="px-8 text-white">
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
//       <div className="container flex flex-col items-center justify-between max-w-5xl gap-10 px-6 py-20 mx-auto md:flex-row">
//         {/* Text Content */}
//         <div className="flex-1 text-center md:text-left">
//           <h1 className="mb-4 text-4xl font-bold font-heading text-content sm:text-5xl md:text-6xl">
//             Artisanal Hot Sauce, <br /> Flavor with Heat
//           </h1>

//           <p className="max-w-xl mb-8 text-lg text-muted-foreground md:text-xl">
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
//         <div className="flex justify-center flex-1">
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
