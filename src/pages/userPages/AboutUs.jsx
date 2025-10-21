import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Zap, Sprout, Users, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <section className="bg-neutral relative min-h-screen py-8 lg:py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="font-heading text-content text-2xl font-bold sm:text-3xl lg:text-4xl xl:text-5xl">
            More Than Just <span className="text-primary">Heat</span>
          </h1>
          <p className="text-lighter mx-auto mt-4 max-w-2xl text-base sm:text-lg lg:mt-6 lg:text-xl">
            A pandemic passion project turned into a flavorful revolution. We're not just making hot sauce—we're telling
            stories through spice.
          </p>
        </div>

        {/* Story Timeline */}
        <div className="mb-16 lg:mb-20">
          <div className="relative">
            {/* Timeline line - hidden on mobile, visible on desktop */}
            <div className="absolute left-4 h-full w-1 bg-orange-200 md:left-1/2 md:-translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-8 lg:space-y-12">
              {/* 2019 - The Idea */}
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center lg:flex-row lg:items-center">
                {/* Mobile/Tablet Layout */}
                <div className="flex items-start gap-4 sm:flex-1 sm:flex-col-reverse lg:hidden">
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div className="bg-card flex h-10 w-10 items-center justify-center rounded-full shadow-lg lg:h-12 lg:w-12">
                      <span className="font-heading text-primary text-sm font-bold lg:text-base">2019</span>
                    </div>
                  </div>
                  <div className="bg-card flex-1 rounded-2xl p-4 shadow-lg sm:p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Sprout className="h-4 w-4 text-green-500 lg:h-5 lg:w-5" />
                      <span className="text-xs font-semibold text-green-600 lg:text-sm">THE BEGINNING</span>
                    </div>
                    <h3 className="text-content font-heading text-lg font-bold lg:text-2xl">The Seed Was Planted</h3>
                    <p className="text-lighter mt-2 text-sm lg:text-base">
                      In 2019, the idea for Alas Deli's Hot Sauce began to simmer. A vision to create something more
                      meaningful than just another hot sauce brand.
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden flex-1 text-right lg:block">
                  <Card className="bg-card inline-block rounded-2xl p-6 shadow-lg">
                    <div className="mb-2 flex items-center justify-end gap-2">
                      <Sprout className="h-5 w-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">THE BEGINNING</span>
                    </div>
                    <h3 className="text-content font-heading text-2xl font-bold">The Seed Was Planted</h3>
                    <p className="text-lighter mt-2">
                      In 2019, the idea for Alas Deli's Hot Sauce began to simmer. A vision to create something more
                      meaningful than just another hot sauce brand.
                    </p>
                  </Card>
                </div>

                <div className="hidden flex-col items-center lg:flex">
                  <Card className="bg-card flex h-12 w-12 items-center justify-center rounded-full shadow-lg">
                    <span className="font-heading text-primary font-bold">2019</span>
                  </Card>
                </div>

                <div className="hidden lg:block lg:flex-1">
                  <img
                    src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1759158192/126868544_201605544672797_8049693669618469316_n_zknceq.jpg"
                    alt="The beginning"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </div>

              {/* 2020 - The Launch */}
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center lg:flex-row lg:items-center">
                {/* Mobile/Tablet Layout */}
                <div className="flex items-start gap-4 sm:flex-1 sm:flex-col lg:hidden">
                  <div className="flex flex-shrink-0 flex-col items-center">
                    <div className="bg-card flex h-10 w-10 items-center justify-center rounded-full shadow-lg lg:h-12 lg:w-12">
                      <span className="font-heading text-primary text-sm font-bold lg:text-base">2020</span>
                    </div>
                  </div>
                  <div className="bg-card flex-1 rounded-2xl p-4 shadow-lg sm:p-6">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500 lg:h-5 lg:w-5" />
                      <span className="text-xs font-semibold text-yellow-600 lg:text-sm">THE SPARK</span>
                    </div>
                    <h3 className="text-content font-heading text-lg font-bold lg:text-2xl">Passion Ignited</h3>
                    <p className="text-lighter mt-2 text-sm lg:text-base">
                      When the world paused, we found our purpose. What started as an idea became a mission to bring
                      authentic Filipino flavors to every home.
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="hidden lg:block lg:flex-1">
                  <img
                    src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1759158253/146737801_246121823554502_3109163188673069347_n_adwso0.jpg"
                    alt="Pandemic creation"
                    className="rounded-xl shadow-lg"
                  />
                </div>

                <div className="hidden flex-col items-center lg:flex">
                  <div className="bg-card flex h-12 w-12 items-center justify-center rounded-full shadow-lg">
                    <span className="font-heading text-primary font-bold">2020</span>
                  </div>
                </div>

                <div className="hidden lg:block lg:flex-1">
                  <div className="bg-card inline-block rounded-2xl p-6 shadow-lg">
                    <div className="mb-2 flex items-center gap-2">
                      <Zap className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-semibold text-yellow-600">THE SPARK</span>
                    </div>
                    <h3 className="text-content font-heading text-2xl font-bold">Passion Ignited</h3>
                    <p className="text-lighter mt-2">
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
        <div className="mb-12 grid gap-6 lg:mb-20 lg:grid-cols-2 lg:gap-8">
          <Card className="text-card bg-primary">
            <CardContent className="p-6 lg:p-8">
              <Target className="mb-3 h-8 w-8 lg:mb-4 lg:h-12 lg:w-12" />
              <h3 className="font-heading mb-3 text-xl font-bold lg:mb-4 lg:text-2xl">Our Mission</h3>
              <p className="text-sm leading-relaxed lg:text-lg">
                To craft exceptional hot sauces that celebrate Filipino heritage, support local farmers, and introduce
                the world to the rich stories behind every chili pepper we use.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-gray-700 text-white">
            <CardContent className="p-6 lg:p-8">
              <Eye className="mb-3 h-8 w-8 lg:mb-4 lg:h-12 lg:w-12" />
              <h3 className="font-heading mb-3 text-xl font-bold lg:mb-4 lg:text-2xl">Our Vision</h3>
              <p className="text-sm leading-relaxed lg:text-lg">
                To become the bridge that connects food lovers with the vibrant tapestry of Filipino flavors, one bottle
                of hot sauce at a time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-12 lg:mb-16">
          <h2 className="text-content font-heading mb-8 text-center text-2xl font-bold lg:mb-12 lg:text-3xl">
            What Makes Us Different
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="group text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 transition-all group-hover:scale-110 group-hover:bg-orange-200 lg:mb-4 lg:h-20 lg:w-20">
                <Heart className="text-primary h-8 w-8 lg:h-10 lg:w-10" />
              </div>
              <h3 className="text-content font-heading mb-2 text-lg font-bold lg:mb-3 lg:text-xl">
                Handcrafted with Heart
              </h3>
              <p className="text-lighter text-sm lg:text-base">
                Small batches mean big love. Every bottle receives personal attention to ensure perfect flavor and
                quality.
              </p>
            </div>

            <div className="group text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 transition-all group-hover:scale-110 group-hover:bg-yellow-200 lg:mb-4 lg:h-20 lg:w-20">
                <Users className="h-8 w-8 text-yellow-600 lg:h-10 lg:w-10" />
              </div>
              <h3 className="text-content font-heading mb-2 text-lg font-bold lg:mb-3 lg:text-xl">Community First</h3>
              <p className="text-lighter text-sm lg:text-base">
                We work directly with Filipino farmers, celebrating their hard work and preserving agricultural
                traditions.
              </p>
            </div>

            <div className="group text-center sm:col-span-2 lg:col-span-1">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-100 transition-all group-hover:scale-110 group-hover:bg-green-200 lg:mb-4 lg:h-20 lg:w-20">
                <Star className="h-8 w-8 text-green-600 lg:h-10 lg:w-10" />
              </div>
              <h3 className="text-content font-heading mb-2 text-lg font-bold lg:mb-3 lg:text-xl">Proudly Local</h3>
              <p className="text-lighter text-sm lg:text-base">
                From our ingredients to our inspiration, everything is rooted in the rich culinary heritage of the
                Philippines.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-card from-primary to-brand bg-gradient-to-r">
          <CardContent className="p-6 text-center lg:p-12">
            <h2 className="font-heading mb-3 text-2xl font-bold lg:mb-4 lg:text-3xl">Join Our Flavor Revolution</h2>
            <p className="mb-4 text-lg opacity-90 lg:mb-6 lg:text-xl">
              Taste the story behind every drop. Experience Filipino heat with heart.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link to="/menu">
                <Button className="bg-card text-primary focus:bg-card active:bg-card hover:bg-card font-heading rounded-full px-6 py-3 text-sm transition-all hover:scale-105 sm:px-8 sm:py-6 sm:text-base">
                  Shop Our Sauces
                </Button>
              </Link>
              <Link to="/">
                <Button
                  variant="outline"
                  className="border-card dark:hover:bg-admin dark:hover:text-brand font-heading text-card rounded-full border-2 px-6 py-3 text-sm font-semibold transition-all hover:bg-gray-900 sm:px-8 sm:py-6 sm:text-base"
                >
                  Home
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default AboutUs;
