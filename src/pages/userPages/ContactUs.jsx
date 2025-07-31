import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Flame,
  Heart,
  Zap,
  Star,
} from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

function ContactUs() {
  return (
    <section className="bg-neutral min-h-screen">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-25 left-15 h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-yellow-200 to-orange-300 opacity-20"></div>
        <div className="absolute top-45 right-20 h-16 w-16 animate-pulse rounded-full bg-gradient-to-br from-red-200 to-pink-300 opacity-20 delay-1000"></div>
        <div className="absolute bottom-55 left-20 h-12 w-12 animate-pulse rounded-full bg-gradient-to-br from-orange-200 to-red-300 opacity-20 delay-500"></div>
      </div>

      {/* Contact Page Content */}
      <main className="relative mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <div className="mb-4 flex items-center justify-center">
            <Flame className="mr-2 h-8 w-8 animate-bounce text-red-500" />
            <h1 className="text-content font-heading text-5xl font-semibold">
              Let's Talk Spice!
            </h1>
            <Flame className="ml-2 h-8 w-8 animate-bounce text-orange-500 delay-200" />
          </div>
          <p className="text-lighter mx-auto max-w-3xl text-lg">
            Got burning questions? Need a custom blend that'll knock your socks
            off? We're here to help you find your perfect heat level! 🌶️
          </p>
        </div>

        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 xl:gap-20">
          {/* Contact Form */}
          <Card className="border-0 bg-white/80 py-0 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
            <CardHeader className="rounded-t-lg bg-gradient-to-r from-red-500 to-orange-500 py-2 text-white">
              <CardTitle className="flex items-center text-xl">
                <Zap className="mr-2 h-5 w-5 animate-pulse" />
                Drop us a Hot Line!
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 p-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="text-lighter mb-1 block text-sm font-medium"
                  >
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <Input id="firstName" placeholder="Your first name" />
                </div>
                <div>
                  <label
                    htmlFor="lastName"
                    className="text-lighter mb-1 block text-sm font-medium"
                  >
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <Input id="lastName" placeholder="Your last name" />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="text-lighter mb-1 block text-sm font-medium"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="text-lighter mb-1 block text-sm font-medium"
                >
                  What's cooking?
                </label>
                <Input
                  id="subject"
                  placeholder="Custom blend? Wholesale? Just saying hi?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="text-lighter mb-1 block text-sm font-medium"
                >
                  Spill the beans! <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="message"
                  placeholder="Tell us about your spicy dreams, heat tolerance, or any burning questions..."
                  rows={5}
                />
              </div>

              <Button className="w-full transform bg-gradient-to-r from-red-600 to-orange-600 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-red-700 hover:to-orange-700">
                🔥 Send the Heat! 🔥
              </Button>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-0 bg-gradient-to-br from-yellow-50 to-orange-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <MapPin className="mr-2 h-5 w-5 text-red-500" />
                  Come Visit Our Spice Den!
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3 rounded-lg bg-white/60 p-3">
                  <MapPin className="mt-0.5 h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-content font-bold">
                      Alas Delis and Spices
                    </p>
                    <p className="text-lighter text-sm">
                      Old Balara, Tandang Sora Avenue
                    </p>
                    <p className="text-lighter text-sm">
                      Quezon City, Philippines
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-white/60 p-3">
                  <Phone className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-content font-bold">0995 285 8665</p>
                    <p className="text-lighter text-sm">
                      📞 Call for custom orders & bulk pricing
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-3 rounded-lg bg-white/60 p-3">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <div>
                    <p className="text-content font-bold">
                      kraffle02@gmail.com
                    </p>
                    <p className="text-lighter text-sm">
                      ⚡ Lightning-fast replies (usually within 2 hours!)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-gradient-to-br from-green-50 to-blue-100 shadow-xl transition-all duration-300 hover:shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center text-xl">
                  <Clock className="mr-2 h-5 w-5 text-green-500" />
                  We Accept Walk-Ins
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between rounded bg-white/60 p-2">
                    <span className="text-lighter font-medium">
                      Monday - Friday
                    </span>
                    <span className="font-bold text-green-600">
                      9:00 AM - 7:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-white/60 p-2">
                    <span className="text-lighter font-medium">Saturday</span>
                    <span className="font-bold text-blue-600">
                      10:00 AM - 6:00 PM
                    </span>
                  </div>
                  <div className="flex items-center justify-between rounded bg-white/60 p-2">
                    <span className="text-lighter font-medium">Sunday</span>
                    <span className="font-bold text-purple-600">
                      12:00 PM - 5:00 PM
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fun Info Boxes */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-lg border-2 border-red-200 bg-gradient-to-br from-red-100 to-pink-100 p-4 transition-transform duration-200 hover:scale-105">
                <div className="mb-2 flex items-center">
                  <Heart className="mr-2 h-4 w-4 text-red-500" />
                  <h4 className="text-content text-sm font-bold">
                    Made with Love
                  </h4>
                </div>
                <p className="text-lighter text-xs">
                  Every bottle is crafted by hand with passion and the finest
                  ingredients!
                </p>
              </div>

              <div className="rounded-lg border-2 border-yellow-200 bg-gradient-to-br from-yellow-100 to-orange-100 p-4 transition-transform duration-200 hover:scale-105">
                <div className="mb-2 flex items-center">
                  <Star className="mr-2 h-4 w-4 text-yellow-500" />
                  <h4 className="text-content text-sm font-bold">
                    Artisanal Blends
                  </h4>
                </div>
                <p className="text-lighter text-xs">
                  Can't find your perfect heat? We'll create a custom sauce just
                  for you!
                </p>
              </div>
            </div>

            {/* Spicy Tip */}
            <div className="relative overflow-hidden rounded-xl border-2 border-orange-300 bg-gradient-to-r from-orange-100 via-red-100 to-pink-100 p-6">
              <div className="animate-spin-slow absolute top-2 right-2 text-2xl">
                🌶️
              </div>
              <h3 className="text-content mb-2 text-lg font-bold">
                🔥 Hot Tip of the Day!
              </h3>
              <p className="text-lighter text-sm font-medium">
                New to spicy food? Start with our "Gentle Fire" blend - it's got
                all the flavor with just a whisper of heat!
              </p>
              <p className="text-lighter mt-2 text-xs italic">
                Pro tip: Keep milk handy for your first taste test! 🥛
              </p>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default ContactUs;
