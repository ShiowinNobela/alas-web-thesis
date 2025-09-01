import {
  Facebook,
  Instagram,
  Twitter,
  Phone,
  MapPin,
  Flame,
  Truck,
  Shield,
  RotateCcw,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-card border-t border-gray-200">
      {/* Main Footer Content */}
      <div className="text-content mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info with Unique Branding */}
          <div className="space-y-6">
            <div>
              <h3 className="text-content font-heading mb-2 text-2xl font-bold">
                Alas Delis & Spices
              </h3>
              <div className="mb-4 flex items-center space-x-1">
                <Flame className="h-4 w-4 text-red-500" />
                <Flame className="h-4 w-4 text-orange-500" />
                <Flame className="h-4 w-4 text-yellow-500" />
                <span className="text-lighter ml-2 text-xs">Est. 2020</span>
              </div>
              <p className="text-lighter text-sm leading-relaxed">
                Handcrafted sauces that bring the heat and flavor to every meal.
                From garden-fresh ingredients to your table.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-lighter flex items-center text-sm">
                <MapPin className="mr-3 h-4 w-4 text-red-500" />
                123 Flavor Street, Spice City, SC 12345
              </div>
              <div className="text-lighter flex items-center text-sm">
                <Phone className="mr-3 h-4 w-4 text-red-500" />
                (555) 123-SAUCE
              </div>
            </div>

            {/* Unique Heat Level Guide */}
            <div className="rounded-lg border border-orange-200 bg-gradient-to-r from-yellow-50 to-red-50 p-4">
              <h4 className="font-heading mb-2 text-sm font-semibold text-black">
                Heat Level Guide
              </h4>
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <Flame className="mr-1 h-3 w-3 text-yellow-500" />
                  <span className="text-lighter">
                    Mild - Perfect for beginners
                  </span>
                </div>
                <div className="flex items-center text-xs">
                  <Flame className="mr-1 h-3 w-3 text-orange-500" />
                  <Flame className="mr-1 h-3 w-3 text-orange-500" />
                  <span className="text-lighter">Medium - Just right</span>
                </div>
                <div className="flex items-center text-xs">
                  <Flame className="mr-1 h-3 w-3 text-red-500" />
                  <Flame className="mr-1 h-3 w-3 text-red-500" />
                  <Flame className="mr-1 h-3 w-3 text-red-500" />
                  <span className="text-lighter">Hot - Bring the fire!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Navigation */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Shop */}
            <div>
              <h4 className="text-content font-heading mb-4 text-lg font-semibold">
                Our Sauces
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-lighter flex items-center text-sm transition-colors hover:text-red-600"
                  >
                    <Flame className="mr-2 h-3 w-3 text-yellow-500" />
                    Hot Sauces
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lighter flex items-center text-sm transition-colors hover:text-red-600"
                  >
                    <Star className="mr-2 h-3 w-3 text-orange-500" />
                    BBQ Sauces
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lighter flex items-center text-sm transition-colors hover:text-red-600"
                  >
                    <Flame className="mr-2 h-3 w-3 text-red-500" />
                    Specialty Blends
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-lighter text-sm transition-colors hover:text-red-600"
                  >
                    Gift Sets
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-content font-heading mb-4 text-lg font-semibold">
                Help & Info
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/AboutUs"
                    className="text-lighter text-sm transition-colors hover:text-red-600"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/ContactUs"
                    className="text-lighter text-sm transition-colors hover:text-red-600"
                  >
                    Contact
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-lighter text-sm transition-colors hover:text-red-600"
                  >
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-lighter text-sm transition-colors hover:text-red-600"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/Faqs"
                    className="text-lighter text-sm transition-colors hover:text-red-600"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social & Features */}
          <div className="space-y-6">
            {/* Social Media */}
            <div>
              <h4 className="text-content font-heading mb-4 text-lg font-semibold">
                Follow the Heat
              </h4>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-0 bg-gradient-to-br from-pink-500 to-purple-600 text-white transition-transform hover:scale-105"
                >
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-0 bg-blue-600 text-white transition-transform hover:scale-105"
                >
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-10 w-10 border-0 bg-blue-400 text-white transition-transform hover:scale-105"
                >
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-lighter mt-2 text-xs">
                Share your spicy creations with #SpiceAndFire
              </p>
            </div>

            {/* Unique Features */}
            <div className="rounded-lg bg-gray-50 p-4">
              <h5 className="font-heading mb-3 text-sm font-semibold text-black">
                Why Choose Us?
              </h5>
              <div className="space-y-2">
                <div className="text-lighter flex items-center text-xs">
                  <Shield className="mr-2 h-4 w-4 text-green-500" />
                  All-natural ingredients
                </div>
                <div className="text-lighter flex items-center text-xs">
                  <Truck className="mr-2 h-4 w-4 text-blue-500" />
                  Free shipping over $35
                </div>
                <div className="text-lighter flex items-center text-xs">
                  <RotateCcw className="mr-2 h-4 w-4 text-purple-500" />
                  30-day satisfaction guarantee
                </div>
              </div>
            </div>

            {/* Fun Sauce Fact */}
            <div className="rounded-lg border-l-4 border-red-500 bg-gradient-to-r from-red-50 to-orange-50 p-4">
              <h5 className="font-heading mb-1 text-sm font-semibold text-black">
                Spicy Fact
              </h5>
              <p className="text-lighter text-xs">
                The Carolina Reaper is currently the world's hottest pepper at
                2.2 million Scoville units! 🌶️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <Separator /> */}

      {/* Bottom Footer */}
      <div className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
              <p className="text-lighter text-sm">
                © 2024 <span>Spice & Fire Co.</span> All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-lighter text-xs transition-colors hover:text-red-600"
                >
                  Privacy
                </a>
                <a
                  href="#"
                  className="text-lighter text-xs transition-colors hover:text-red-600"
                >
                  Terms
                </a>
              </div>
            </div>

            {/* Made with Love */}
            <div className="text-lighter flex items-center text-xs">
              <span>Made with</span>
              <Flame className="mx-1 h-3 w-3 text-red-500" />
              <span>in Spice City</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
