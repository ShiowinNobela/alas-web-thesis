import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { ListOrdered, Star, User, HelpCircle, Info, Phone, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function UserDashboard() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="min-h-screen p-4 bg-neutral sm:p-6 md:p-10">
      <div className="max-w-5xl pb-16 mx-auto md:pb-25">
        {/* Welcome Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl font-semibold font-heading text-content sm:text-3xl">
            Hello, <span className="text-primary">{user?.username}</span>
          </h1>
          <p className="text-sm text-lighter sm:text-base">Where do you want to go today?</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
          {/* Big Menu Card - Full width on mobile */}
          <Card className="relative h-64 overflow-hidden transition sm:h-72 md:h-84 hover:shadow-lg md:col-span-3">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445522/122462317_192071598959525_4825425067991163101_n_yh2sac.jpg"
                alt="Product 1"
                className="object-cover w-full h-full"
              />
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445445/471449145_1098376664995676_4011717143068015172_n_fmgpvi.jpg"
                alt="Product 2"
                className="object-cover w-full h-full"
              />
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445989/122179467_192071712292847_9036583728645172047_n_zwhbth.jpg"
                alt="Product 3"
                className="object-cover w-full h-full"
              />
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351170/powders_lziet3.jpg"
                alt="Product 4"
                className="object-cover w-full h-full"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            {/* Content overlay */}
            <div className="relative z-10 flex flex-col justify-between h-full p-4 sm:p-6">
              <div>
                <CardTitle className="text-xl text-white sm:text-2xl">Menu</CardTitle>
                <CardDescription className="text-sm text-gray-200 sm:text-base">
                  Browse sauces & products
                </CardDescription>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-between">
                <Link to="/ProductListPage" className="w-full sm:w-auto">
                  <Button variant="CTA" size="lg" className="w-full text-sm sm:w-auto sm:text-base">
                    View Our Menu
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Quick Action Cards - Stack on mobile, 3 columns on desktop */}
          <Card className="transition hover:shadow-md">
            <CardContent asChild className="flex items-center justify-between h-full p-4 sm:p-6">
              <Link to="/UserOrderPage" className="flex items-center justify-between w-full">
                <div>
                  <CardTitle className="text-xl sm:text-2xl">My Orders</CardTitle>
                  <CardDescription className="text-sm">
                    View past & active orders
                  </CardDescription>
                </div>
                <ListOrdered className="w-8 h-8 text-primary sm:h-10 sm:w-10 opacity-80" />
              </Link>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-md">
            <CardContent asChild className="flex items-center justify-between h-full p-4 sm:p-6">
              <Link to="/users/reviews" className="flex items-center justify-between w-full">
                <div>
                  <CardTitle className="text-xl sm:text-2xl">Reviews</CardTitle>
                  <CardDescription className="text-sm">
                    Tell us what you think
                  </CardDescription>
                </div>
                <Star className="w-8 h-8 text-primary sm:h-10 sm:w-10 opacity-80" />
              </Link>
            </CardContent>
          </Card>

          <Card className="transition hover:shadow-md">
            <CardContent asChild className="flex items-center justify-between h-full p-4 sm:p-6">
              <Link to="/UserSettings" className="flex items-center justify-between w-full">
                <div>
                  <CardTitle className="text-xl sm:text-2xl">Profile</CardTitle>
                  <CardDescription className="text-sm">
                    Manage your account
                  </CardDescription>
                </div>
                <User className="w-8 h-8 text-primary sm:h-10 sm:w-10 opacity-80" />
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Help Section */}
        <div className="mt-8">
          <h2 className="mb-4 text-content">Need Help?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* About Us */}
            <Card className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl" >About Us</CardTitle>
                <CardDescription className="w-full text-sm sm:w-1/2 sm:text-sm">Learn more about our brand</CardDescription>
              </CardHeader>
              <CardContent className="relative flex items-end justify-between p-6">
                {/* Bottom left link */}
                <Link
                  to="/AboutUs"
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Get help
                  <ArrowRight className="w-4 h-4" />
                </Link>
                {/* Background Icon */}
                <Info className="absolute opacity-25 text-primary right-4 size-16" />
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl" >FAQ</CardTitle>
                <CardDescription className="w-full text-sm sm:w-1/2 sm:text-sm">Common questions answered</CardDescription>
              </CardHeader>
              <CardContent className="relative flex items-end justify-between p-6">
                <Link to="/Faqs" className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                  View FAQ
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <HelpCircle className="absolute opacity-25 text-primary right-4 size-16" />
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle className="text-xl sm:text-2xl" >Contact</CardTitle>
                <CardDescription className="w-full text-sm sm:w-1/2 sm:text-sm">Get in touch with our team</CardDescription>
              </CardHeader>
              <CardContent className="relative flex items-end justify-between p-6">
                <Link
                  to="/ContactUs"
                  className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                >
                  Contact us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Phone className="absolute opacity-25 text-primary right-4 size-16" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
