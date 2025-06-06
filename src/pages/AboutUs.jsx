function AboutUs() {
  return (
    <section className='w-full h-screen bg-[url("./src/components/images/customer_bg.png")] bg-cover bg-no-repeat'>
      <div className="flex items-center justify-center h-full px-4">
        <div className="w-4/5 bg-black/40 text-white p-12 rounded-3xl shadow-xl text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide mb-6 uppercase">
            ALAS DELIS <span className="text-green-400">AND HOT SAUCE</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto">
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
