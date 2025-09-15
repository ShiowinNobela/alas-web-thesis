import Marquee from 'react-fast-marquee';

const HotDealSection = () => {
  const promotions = [
    '🔥 Hot Deal: Use Code ALASAUCE68 for 20% Off!',
    '🌶️ Limited Time: Buy 2 Get 1 Free on Chili Sauces!',
    '🥢 Free Shipping on Orders Over ₱1000!',
    '🛒 New Flavors Just Dropped – Try Mango Habanero!',
  ];

  return (
    <section className="bg-neutral border-b-2 border-zinc-300 py-4">
      <Marquee gradient={false} speed={70}>
        {promotions.map((promo, index) => (
          <span key={index} className="text-content font-heading mx-12 whitespace-nowrap">
            {promo}
          </span>
        ))}
      </Marquee>
    </section>
  );
};

export default HotDealSection;
