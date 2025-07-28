import picture from '../components/images/sos2.jpg';

function AboutUs() {
  return (
    <section className="min-h-full justify-center bg-yellow-100 py-10">
      <div className="text-center">

        <div className="mx-auto max-w-5/6 rounded-3xl bg-white/70 p-10 text-black shadow-2xl backdrop-blur-sm md:p-16">
          
          <div className="mb-10 text-3xl font-extrabold tracking-widest uppercase sm:text-4xl md:text-5xl">
            WHO WE ARE
          </div>

          <div className="grid md:grid-cols-2 items-center gap-10">
            {/*image*/}
             <div>
              <img
                src={picture}
                alt="About us image"
                className="rounded-xl shadow-md w-full max-w-lg mx-auto"
              />
            </div>

            {/*content*/}
            <div> 
              <p className="text-gray-700 text-lg mb-6">
                Alas Deli’s Hot Sauce was born during the height of the pandemic—around the first quarter of 2020, when the lockdowns gave us all a moment to pause and reset.
                Though we had started talking about the business back in 2019, it wasn’t until that quiet, uncertain time that things really began to take shape.
                Stuck at home like everyone else, we found our silver lining: a chance to finally bring our idea to life.  
              </p>
              <p className="text-gray-700 text-lg mb-6">
                At Alas Deli’s, our purpose is to bring a deeper understanding of hot sauces to Filipino homes. We focus not just on the heat but on the stories behind the flavor—the craftsmanship, the variety of chilis, and the culture they represent. Many know siling labuyo, but there is so much more. Our country has its own rich range of local chilis, and we are proud to champion them.
              </p>
              <p className="text-gray-700 text-lg mb-6">
                Each bottle we make carries our passion for local ingredients and our belief that food can be a powerful way to connect people.
                Our goal is simple—to celebrate spice, share stories, and create something that feels truly Filipino.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;