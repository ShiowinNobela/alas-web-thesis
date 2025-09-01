import picture from '@/components/images/sos2.jpg';

function AboutUs() {
  return (
    <section className="bg-neutral min-h-full justify-center">
      <div className="mx-auto max-w-6xl px-4 pb-30 text-center md:px-6 lg:px-8">
        <div className="font-heading text-content py-10 text-3xl md:text-5xl">
          Who we are
        </div>

        <div className="grid items-center gap-10 md:grid-cols-2">
          {/*image*/}
          <div>
            <img
              src={picture}
              alt="About us "
              className="mx-auto w-full max-w-lg rounded-xl shadow-md"
            />
          </div>

          {/*content*/}
          <div>
            <p className="text-content mb-6 text-lg">
              Alas Deli’s Hot Sauce was born during the height of the
              pandemic—around the first quarter of 2020, when the lockdowns gave
              us all a moment to pause and reset. Though we had started talking
              about the business back in 2019, it wasn’t until that quiet,
              uncertain time that things really began to take shape. Stuck at
              home like everyone else, we found our silver lining: a chance to
              finally bring our idea to life.
            </p>
            <p className="text-content mb-6 text-lg">
              At Alas Deli’s, our purpose is to bring a deeper understanding of
              hot sauces to Filipino homes. We focus not just on the heat but on
              the stories behind the flavor—the craftsmanship, the variety of
              chilis, and the culture they represent. Many know siling labuyo,
              but there is so much more. Our country has its own rich range of
              local chilis, and we are proud to champion them.
            </p>
            <p className="text-content mb-6 text-lg">
              Each bottle we make carries our passion for local ingredients and
              our belief that food can be a powerful way to connect people. Our
              goal is simple—to celebrate spice, share stories, and create
              something that feels truly Filipino.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
