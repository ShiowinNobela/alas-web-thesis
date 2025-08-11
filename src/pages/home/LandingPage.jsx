import { Button } from '@/components/ui/button';
import BentoGrid from '@/pages/home/sections/BentoGridSection';
import ProductsShowcaseSection from './sections/ProductShowcaseSection';
import StorySection from './sections/StorySection';
import HeroSection from './sections/HeroSection';
import TestimonialSection from './sections/TestimonialSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />

      <section className="border-b-2 border-zinc-300 bg-white py-4">
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

      <ProductsShowcaseSection />

      <StorySection />

      <TestimonialSection />

      <BentoGrid />
    </>
  );
};

export default LandingPage;
