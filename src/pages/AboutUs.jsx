function AboutUs() {
  return (
    <section className="bg-yellow-100 min-h-screen justify-center py-10">
      <div className="text-center">
        <h1 className="uppercase tracking-wide font-semibold mb-8 text-2xl">
          About Us
        </h1>
        <div className="max-w-4xl bg-white/70 backdrop-blur-sm text-black p-10 md:p-16 rounded-3xl shadow-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-widest uppercase mb-8">
            Alas Delis and<span className="text-red-600"> Hot Sauce</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed">
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
