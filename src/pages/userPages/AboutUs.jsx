import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Zap, Sprout, Users, Target, Eye } from 'lucide-react';

function AboutUs() {
  return (
    <section className="bg-neutral relative min-h-screen py-10">
      {/* Hero Section */}
      <div className="relative mx-auto max-w-6xl px-4 md:px-6">
        <div className="mb-16 text-center">
          <h1 className="font-heading text-4xl font-bold text-gray-900 md:text-5xl">
            More Than Just <span className="text-orange-500">Heat</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-600">
            A pandemic passion project turned into a flavorful revolution. We're not just making hot sauce—we're telling
            stories through spice.
          </p>
        </div>

        {/* Story Timeline */}
        <div className="mb-20">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 h-full w-1 -translate-x-1/2 bg-orange-200"></div>

            {/* Timeline items */}
            <div className="space-y-12">
              {/* 2019 - The Idea */}
              <div className="relative flex items-center gap-8">
                <div className="flex-1 text-right">
                  <Card className="inline-block p-6 shadow">
                    <div className="mb-2 flex items-center justify-end gap-2">
                      <Sprout className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">THE BEGINNING</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">The Seed Was Planted</h3>
                    <p className="mt-2 text-gray-600">
                      In 2019, the idea for Alas Deli's Hot Sauce began to simmer. A vision to create something more
                      meaningful than just another hot sauce brand.
                    </p>
                  </Card>
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="font-bold text-orange-500">2019</span>
                  </div>
                </div>
                <div className="flex-1">
                  <img
                    src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1759074807/sos2_hadind.jpg"
                    alt="The beginning"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* 2020 - The Launch */}
              <div className="relative flex items-center gap-8">
                <div className="flex-1">
                  <img
                    src="https://images.unsplash.com/photo-1586201375761-83865001e31c?ixlib=rb-4.0.1&auto=format&fit=crop&w=800&q=80"
                    alt="Pandemic creation"
                    className="rounded-xl shadow-lg"
                  />
                </div>
                <div className="flex flex-col items-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
                    <span className="font-bold text-orange-500">2020</span>
                  </div>
                </div>
                <div className="flex-1">
                  <div className="inline-block rounded-2xl bg-white p-6 shadow-lg">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-semibold text-yellow-600">THE SPARK</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">Pandemic Passion Ignited</h3>
                    <p className="mt-2 text-gray-600">
                      When the world paused, we found our purpose. What started as an idea became a mission to bring
                      authentic Filipino flavors to every home.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="mb-20 grid gap-8 md:grid-cols-2">
          <Card className="bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardContent className="p-8">
              <Target className="mb-4 h-12 w-12" />
              <h3 className="mb-4 text-2xl font-bold">Our Mission</h3>
              <p className="text-lg leading-relaxed">
                To craft exceptional hot sauces that celebrate Filipino heritage, support local farmers, and introduce
                the world to the rich stories behind every chili pepper we use.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            <CardContent className="p-8">
              <Eye className="mb-4 h-12 w-12" />
              <h3 className="mb-4 text-2xl font-bold">Our Vision</h3>
              <p className="text-lg leading-relaxed">
                To become the bridge that connects food lovers with the vibrant tapestry of Filipino flavors, one bottle
                of hot sauce at a time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-16">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What Makes Us Different</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="group text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 transition-all group-hover:scale-110 group-hover:bg-orange-200">
                <Heart className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Handcrafted with Heart</h3>
              <p className="text-gray-600">
                Small batches mean big love. Every bottle receives personal attention to ensure perfect flavor and
                quality.
              </p>
            </div>

            <div className="group text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-yellow-100 transition-all group-hover:scale-110 group-hover:bg-yellow-200">
                <Users className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Community First</h3>
              <p className="text-gray-600">
                We work directly with Filipino farmers, celebrating their hard work and preserving agricultural
                traditions.
              </p>
            </div>

            <div className="group text-center">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-green-100 transition-all group-hover:scale-110 group-hover:bg-green-200">
                <Star className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900">Proudly Local</h3>
              <p className="text-gray-600">
                From our ingredients to our inspiration, everything is rooted in the rich culinary heritage of the
                Philippines.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
          <CardContent className="p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold">Join Our Flavor Revolution</h2>
            <p className="mb-6 text-xl opacity-90">
              Taste the story behind every drop. Experience Filipino heat with heart.
            </p>
            <div className="flex justify-center gap-4">
              <button className="rounded-full bg-white px-8 py-3 font-semibold text-orange-500 transition-all hover:scale-105">
                Shop Our Sauces
              </button>
              <button className="rounded-full border-2 border-white px-8 py-3 font-semibold transition-all hover:bg-white hover:text-orange-500">
                Our Story
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AboutUs;
