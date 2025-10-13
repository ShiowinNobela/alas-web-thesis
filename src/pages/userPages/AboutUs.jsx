import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Star, Zap, Sprout, Users, Target, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <section className="relative min-h-screen py-8 bg-neutral lg:py-12">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h1 className="text-2xl font-bold font-heading text-content sm:text-3xl lg:text-4xl xl:text-5xl">
            More Than Just <span className="text-primary">Heat</span>
          </h1>
          <p className="max-w-2xl mx-auto mt-4 text-base text-lighter sm:text-lg lg:mt-6 lg:text-xl">
            A pandemic passion project turned into a flavorful revolution. We're not just making hot sauce—we're telling
            stories through spice.
          </p>
        </div>

        {/* Story Timeline */}
        <div className="mb-16 lg:mb-20">
          <div className="relative">
            {/* Timeline line - hidden on mobile, visible on desktop */}
            <div className="absolute w-1 h-full bg-orange-200 left-4 md:left-1/2 md:-translate-x-1/2"></div>

            {/* Timeline items */}
            <div className="space-y-8 lg:space-y-12">
              {/* 2019 - The Idea */}
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center lg:flex-row lg:items-center">
                {/* Mobile/Tablet Layout */}
                <div className="flex items-start gap-4 sm:flex-1 sm:flex-col-reverse lg:hidden">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-card lg:h-12 lg:w-12">
                      <span className="text-sm font-bold font-heading text-primary lg:text-base">2019</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 shadow-lg bg-card rounded-2xl sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Sprout className="w-4 h-4 text-green-500 lg:h-5 lg:w-5" />
                      <span className="text-xs font-semibold text-green-600 lg:text-sm">THE BEGINNING</span>
                    </div>
                    <h3 className="text-lg font-bold text-content font-heading lg:text-2xl">The Seed Was Planted</h3>
                    <p className="mt-2 text-sm text-lighter lg:text-base">
                      In 2019, the idea for Alas Deli's Hot Sauce began to simmer. A vision to create something more
                      meaningful than just another hot sauce brand.
                    </p>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className="flex-1 hidden text-right lg:block">
                  <Card className="inline-block p-6 shadow-lg bg-card rounded-2xl">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <Sprout className="w-5 h-5 text-green-500" />
                      <span className="text-sm font-semibold text-green-600">THE BEGINNING</span>
                    </div>
                    <h3 className="text-2xl font-bold text-content font-heading">The Seed Was Planted</h3>
                    <p className="mt-2 text-lighter">
                      In 2019, the idea for Alas Deli's Hot Sauce began to simmer. A vision to create something more
                      meaningful than just another hot sauce brand.
                    </p>
                  </Card>
                </div>

                <div className="flex-col items-center hidden lg:flex">
                  <Card className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-card">
                    <span className="font-bold font-heading text-primary">2019</span>
                  </Card>
                </div>

                <div className="hidden lg:block lg:flex-1">
                  <img
                    src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1759158192/126868544_201605544672797_8049693669618469316_n_zknceq.jpg"
                    alt="The beginning"
                    className="shadow-lg rounded-xl"
                  />
                </div>
              </div>

              {/* 2020 - The Launch */}
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center lg:flex-row lg:items-center">
                {/* Mobile/Tablet Layout */}
                <div className="flex items-start gap-4 sm:flex-1 sm:flex-col lg:hidden">
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-card lg:h-12 lg:w-12">
                      <span className="text-sm font-bold font-heading text-primary lg:text-base">2020</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 shadow-lg bg-card rounded-2xl sm:p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-4 h-4 text-yellow-500 lg:h-5 lg:w-5" />
                      <span className="text-xs font-semibold text-yellow-600 lg:text-sm">THE SPARK</span>
                    </div>
                    <h3 className="text-lg font-bold text-content font-heading lg:text-2xl">Passion Ignited</h3>
                    <p className="mt-2 text-sm text-lighter lg:text-base">
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
                    className="shadow-lg rounded-xl"
                  />
                </div>

                <div className="flex-col items-center hidden lg:flex">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-card">
                    <span className="font-bold font-heading text-primary">2020</span>
                  </div>
                </div>

                <div className="hidden lg:block lg:flex-1">
                  <div className="inline-block p-6 shadow-lg bg-card rounded-2xl">
                    <div className="flex items-center gap-2 mb-2">
                      <Zap className="w-5 h-5 text-yellow-500" />
                      <span className="text-sm font-semibold text-yellow-600">THE SPARK</span>
                    </div>
                    <h3 className="text-2xl font-bold text-content font-heading">Passion Ignited</h3>
                    <p className="mt-2 text-lighter">
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
        <div className="grid gap-6 mb-12 lg:mb-20 lg:grid-cols-2 lg:gap-8">
          <Card className="text-card bg-primary">
            <CardContent className="p-6 lg:p-8">
              <Target className="w-8 h-8 mb-3 lg:mb-4 lg:h-12 lg:w-12" />
              <h3 className="mb-3 text-xl font-bold font-heading lg:mb-4 lg:text-2xl">Our Mission</h3>
              <p className="text-sm leading-relaxed lg:text-lg">
                To craft exceptional hot sauces that celebrate Filipino heritage, support local farmers, and introduce
                the world to the rich stories behind every chili pepper we use.
              </p>
            </CardContent>
          </Card>

          <Card className="text-white bg-gradient-to-br from-gray-900 to-gray-700">
            <CardContent className="p-6 lg:p-8">
              <Eye className="w-8 h-8 mb-3 lg:mb-4 lg:h-12 lg:w-12" />
              <h3 className="mb-3 text-xl font-bold font-heading lg:mb-4 lg:text-2xl">Our Vision</h3>
              <p className="text-sm leading-relaxed lg:text-lg">
                To become the bridge that connects food lovers with the vibrant tapestry of Filipino flavors, one bottle
                of hot sauce at a time.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Core Values */}
        <div className="mb-12 lg:mb-16">
          <h2 className="mb-8 text-2xl font-bold text-center text-content font-heading lg:mb-12 lg:text-3xl">
            What Makes Us Different
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-3 transition-all bg-orange-100 rounded-full group-hover:scale-110 group-hover:bg-orange-200 lg:mb-4 lg:h-20 lg:w-20">
                <Heart className="w-8 h-8 text-red-500 lg:h-10 lg:w-10" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-content font-heading lg:mb-3 lg:text-xl">
                Handcrafted with Heart
              </h3>
              <p className="text-sm text-lighter lg:text-base">
                Small batches mean big love. Every bottle receives personal attention to ensure perfect flavor and
                quality.
              </p>
            </div>

            <div className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-3 transition-all bg-yellow-100 rounded-full group-hover:scale-110 group-hover:bg-yellow-200 lg:mb-4 lg:h-20 lg:w-20">
                <Users className="w-8 h-8 text-yellow-600 lg:h-10 lg:w-10" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-content font-heading lg:mb-3 lg:text-xl">Community First</h3>
              <p className="text-sm text-lighter lg:text-base">
                We work directly with Filipino farmers, celebrating their hard work and preserving agricultural
                traditions.
              </p>
            </div>

            <div className="text-center group sm:col-span-2 lg:col-span-1">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-3 transition-all bg-green-100 rounded-full group-hover:scale-110 group-hover:bg-green-200 lg:mb-4 lg:h-20 lg:w-20">
                <Star className="w-8 h-8 text-green-600 lg:h-10 lg:w-10" />
              </div>
              <h3 className="mb-2 text-lg font-bold text-content font-heading lg:mb-3 lg:text-xl">Proudly Local</h3>
              <p className="text-sm text-lighter lg:text-base">
                From our ingredients to our inspiration, everything is rooted in the rich culinary heritage of the
                Philippines.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <Card className="text-card from-primary to-brand bg-gradient-to-r">
          <CardContent className="p-6 text-center lg:p-12">
            <h2 className="mb-3 text-2xl font-bold font-heading lg:mb-4 lg:text-3xl">Join Our Flavor Revolution</h2>
            <p className="mb-4 text-lg opacity-90 lg:mb-6 lg:text-xl">
              Taste the story behind every drop. Experience Filipino heat with heart.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-center sm:gap-4">
              <Link to="/ProductListPage" >
              <Button className="px-6 py-3 text-sm transition-all rounded-full bg-card text-primary focus:bg-card active:bg-card hover:bg-card font-heading hover:scale-105 sm:px-8 sm:py-6 sm:text-base">
                Shop Our Sauces
              </Button>
              </Link>
              <Link to="/">
              <Button
                variant="outline"
                className="px-6 py-3 text-sm font-semibold transition-all border-2 rounded-full border-card hover:bg-gray-900 dark:hover:bg-admin dark:hover:text-brand font-heading text-card sm:px-8 sm:py-6 sm:text-base"
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
