import ProductsShowcaseSection from './sections/ProductShowcaseSection';
import StorySection from './sections/StorySection';
import HeroSection from './sections/HeroSection';
import TestimonialSection from './sections/TestimonialSection';
import HotDealSection from './sections/HotDealSection';

const LandingPage = () => {
  return (
    <>
      <HeroSection />

      <HotDealSection />

      <ProductsShowcaseSection />

      <StorySection />

      <TestimonialSection />
    </>
  );
};

export default LandingPage;
