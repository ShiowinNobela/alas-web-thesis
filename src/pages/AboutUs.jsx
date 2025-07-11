function AboutUs() {
  return (
    <section className="min-h-full justify-center bg-yellow-100 py-10">
      <div className="text-center">
        <h1 className="mb-8 text-2xl font-semibold tracking-wide uppercase">
          About Us
        </h1>
        <div className="mx-auto max-w-4xl rounded-3xl bg-white/70 p-10 text-black shadow-2xl backdrop-blur-sm md:p-16">
          <h2 className="mb-8 text-3xl font-extrabold tracking-widest uppercase sm:text-4xl md:text-5xl">
            Alas Delis and<span className="text-red-600"> Hot Sauce</span>
          </h2>
          <p className="text-base leading-relaxed sm:text-lg md:text-xl">
            My journey into the world of hot sauces began in my own kitchen,
            experimenting with flavors to add a kick to my meals. What started
            as a personal quest for the perfect blend soon turned into a passion
            for crafting unique sauces that bring people together over good
            food. Each bottle of Alas Delis is a labor of love, made with
            carefully selected ingredients to deliver bold flavors and just the
            right amount of heat. I&apos;m excited to share these creations with
            fellow spice enthusiasts and hope they add a delightful zing to your
            dishes!
          </p>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
