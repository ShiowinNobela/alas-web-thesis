import ProductsShowcaseSection from './sections/ProductShowcaseSection';
import StorySection from './sections/StorySection';
import HeroSection from './sections/HeroSection';
import TestimonialSection from './sections/TestimonialSection';
import HotDealSection from './sections/HotDealSection';
import { useEffect } from 'react';
import axios from 'axios';

const LandingPage = () => {
  useEffect(() => {
    axios
      .get('/api/products')
      .then(() => {
        console.log('✅ Backend warmed up successfully');
      })
      .catch(() => {
        // silently ignore any errors
      });
  }, []);

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
