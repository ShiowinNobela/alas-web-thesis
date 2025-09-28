import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Zap } from 'lucide-react';

function AboutUs() {
  return (
    <section className="bg-neutral relative min-h-full py-12">
      <div className="mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-12 flex items-center justify-center">
          <h1 className="font-heading text-content text-3xl font-semibold md:text-5xl">About Us</h1>
        </div>

        <div className="mb-16 grid items-center gap-10 md:grid-cols-2">
          <div>
            <img
              src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1759074807/sos2_hadind.jpg"
              alt="About us"
              className="mx-auto w-full max-w-lg rounded-xl shadow-lg"
            />
          </div>
          <div className="space-y-4">
            <h2 className="text-content text-2xl font-bold">Our Story</h2>
            <p className="text-content text-lg">
              Alas Deli’s Hot Sauce started during the pandemic in early 2020. What began as an idea in 2019 became a
              real passion project when we all had the chance to pause and reset. Draft for updated about page, should
              be more cooler hopefully.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <Card className="bg-card/80 border shadow backdrop-blur-sm">
            <CardContent className="flex items-start gap-4 p-6">
              <Heart className="h-8 w-8 flex-shrink-0 text-red-500" />
              <div>
                <h3 className="text-content text-xl font-semibold">Made with Heart</h3>
                <p className="text-content mt-2">
                  Every bottle is handcrafted in small batches, ensuring consistency, care, and authentic flavor.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border shadow backdrop-blur-sm">
            <CardContent className="flex items-start gap-4 p-6">
              <Zap className="h-8 w-8 flex-shrink-0 text-yellow-500" />
              <div>
                <h3 className="text-content text-xl font-semibold">More Than Just Heat</h3>
                <p className="text-content mt-2">
                  We want people to discover the stories behind each chili—its culture, variety, and unique flavor
                  profile.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card/80 border shadow backdrop-blur-sm">
            <CardContent className="flex items-start gap-4 p-6">
              <Star className="h-8 w-8 flex-shrink-0 text-blue-500" />
              <div>
                <h3 className="text-content text-xl font-semibold">Proudly Filipino</h3>
                <p className="text-content mt-2">
                  We celebrate local ingredients and Filipino farmers, bringing true local flavors to your table.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

export default AboutUs;
