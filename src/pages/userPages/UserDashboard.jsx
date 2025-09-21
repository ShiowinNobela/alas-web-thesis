import { Link } from 'react-router-dom';
import useUserStore from '@/stores/userStore';
import { ListOrdered, Star, User, HelpCircle, Info, Phone, ArrowRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

function UserDashboard() {
  const user = useUserStore((state) => state.user);

  return (
    <div className="bg-neutral min-h-screen p-8">
      <div className="mx-auto max-w-6xl pb-25">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="font-heading text-content text-3xl">
            Hello, <span className="text-primary">{user?.username}</span>
          </h1>
          <p className="text-lighter">Where do you want to go today?</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Big Menu Card */}
          <Card className="relative col-span-1 h-84 overflow-hidden transition hover:shadow-lg md:col-span-3">
            <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1">
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445522/122462317_192071598959525_4825425067991163101_n_yh2sac.jpg"
                alt="Product 1"
                className="h-full w-full object-cover"
              />
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445445/471449145_1098376664995676_4011717143068015172_n_fmgpvi.jpg"
                alt="Product 2"
                className="h-full w-full object-cover"
              />
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758445989/122179467_192071712292847_9036583728645172047_n_zwhbth.jpg"
                alt="Product 3"
                className="h-full w-full object-cover"
              />
              <img
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1755351170/powders_lziet3.jpg"
                alt="Product 4"
                className="h-full w-full object-cover"
              />
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

            {/* Content overlay */}
            <div className="relative z-10 flex h-full flex-col justify-between p-6">
              <div>
                <CardTitle className="text-2xl text-white">Menu</CardTitle>
                <CardDescription className="text-gray-200">Browse sauces & products</CardDescription>
              </div>

              {/* CTA Button */}
              <div className="flex items-center justify-between">
                <Link to="/ProductListPage">
                  <Button variant="CTA" size="lg">
                    View Our Menu
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Orders */}
          <Card className="h-28 transition hover:shadow-md">
            <CardContent asChild className="flex h-full items-center justify-between p-6">
              <Link to="/UserOrderPage" className="flex w-full items-center justify-between">
                <div>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>View past & active orders</CardDescription>
                </div>
                <ListOrdered className="text-primary h-10 w-10 opacity-80" />
              </Link>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="h-28 transition hover:shadow-md">
            <CardContent asChild className="flex h-full items-center justify-between p-6">
              <Link to="/users/reviews" className="flex w-full items-center justify-between">
                <div>
                  <CardTitle>Reviews</CardTitle>
                  <CardDescription>Tell us what you think</CardDescription>
                </div>
                <Star className="text-primary h-10 w-10 opacity-80" />
              </Link>
            </CardContent>
          </Card>

          {/* Profile */}
          <Card className="h-28 transition hover:shadow-md">
            <CardContent asChild className="flex h-full items-center justify-between p-6">
              <Link to="/UserSettings" className="flex w-full items-center justify-between">
                <div>
                  <CardTitle>Profile</CardTitle>
                  <CardDescription>Manage your account</CardDescription>
                </div>
                <User className="text-primary h-10 w-10 opacity-80" />
              </Link>
            </CardContent>
          </Card>
        </div>
        {/* Help Section */}
        <div className="mt-8">
          <h2 className="text-content mb-4">Need Help?</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* About Us */}
            <Card className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle>About Us</CardTitle>
                <CardDescription className="w-1/2 text-sm">Learn more about our brand</CardDescription>
              </CardHeader>
              <CardContent className="relative flex items-end justify-between p-6">
                {/* Bottom left link */}
                <Link
                  to="/AboutUs"
                  className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  Get help
                  <ArrowRight className="h-4 w-4" />
                </Link>
                {/* Background Icon */}
                <Info className="text-primary absolute right-4 size-16 opacity-25" />
              </CardContent>
            </Card>

            {/* FAQ */}
            <Card className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle>FAQ</CardTitle>
                <CardDescription className="w-1/2 text-sm">Common questions answered</CardDescription>
              </CardHeader>
              <CardContent className="relative flex items-end justify-between p-6">
                <Link to="/Faqs" className="text-primary flex items-center gap-1 text-sm font-medium hover:underline">
                  View FAQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <HelpCircle className="text-primary absolute right-4 size-16 opacity-25" />
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="transition hover:shadow-md">
              <CardHeader>
                <CardTitle>Contact</CardTitle>
                <CardDescription className="w-1/2 text-sm">Get in touch with our team</CardDescription>
              </CardHeader>
              <CardContent className="relative flex items-end justify-between p-6">
                <Link
                  to="/ContactUs"
                  className="text-primary flex items-center gap-1 text-sm font-medium hover:underline"
                >
                  Contact us
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Phone className="text-primary absolute right-4 size-16 opacity-25" />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDashboard;
