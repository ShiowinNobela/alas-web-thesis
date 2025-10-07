import { Facebook, Instagram, Twitter, Phone, MapPin, Flame, Truck, Shield, RotateCcw, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-card">
      {/* Main Footer Content */}
      <div className="max-w-6xl px-4 py-12 mx-auto text-content sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info with Unique Branding */}
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-2xl font-bold text-content font-heading">Alas Delis & Spices</h3>
              <div className="flex items-center mb-4 space-x-1">
                <Flame className="w-4 h-4 text-red-500" />
                <Flame className="w-4 h-4 text-orange-500" />
                <Flame className="w-4 h-4 text-yellow-500" />
                <span className="ml-2 text-xs text-lighter">Est. May 2020</span>
              </div>
              <p className="text-sm leading-relaxed text-lighter">
                Handcrafted sauces that bring the heat and flavor to every meal. From garden-fresh ingredients to your
                table.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center text-sm text-lighter">
                <MapPin className="w-4 h-4 mr-3 text-red-500" />
                123 Flavor Street, Spice City, SC 12345
              </div>
              <div className="flex items-center text-sm text-lighter">
                <Phone className="w-4 h-4 mr-3 text-red-500" />
                (555) 123-SAUCE
              </div>
            </div>

            {/* Unique Heat Level Guide */}
            <div className="p-4 border border-orange-200 rounded-2xl bg-gradient-to-r from-yellow-50 to-red-50">
              <h4 className="mb-2 text-sm font-semibold text-black font-heading">Heat Level Guide</h4>
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <Flame className="w-3 h-3 mr-1 text-yellow-500" />
                  <span className="text-lighter dark:text-neutral">Mild - Perfect for beginners</span>
                </div>
                <div className="flex items-center text-xs">
                  <Flame className="w-3 h-3 mr-1 text-orange-500" />
                  <Flame className="w-3 h-3 mr-1 text-orange-500" />
                  <span className="text-lighter dark:text-neutral">Medium - Just right</span>
                </div>
                <div className="flex items-center text-xs">
                  <Flame className="w-3 h-3 mr-1 text-red-500" />
                  <Flame className="w-3 h-3 mr-1 text-red-500" />
                  <Flame className="w-3 h-3 mr-1 text-red-500" />
                  <span className="text-lighter dark:text-neutral">Hot - Bring the fire!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Navigation */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Shop */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-content font-heading">Our Sauces</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/hot-sauces"
                    className="flex items-center text-sm transition-colors text-lighter hover:text-red-600"
                  >
                    <Flame className="w-3 h-3 mr-2 text-yellow-500" />
                    Hot Sauces
                  </Link>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center p-0 text-sm transition-colors bg-transparent border-none cursor-pointer text-lighter hover:text-red-600"
                    aria-label="BBQ Sauces (coming soon)"
                  >
                    <Star className="w-3 h-3 mr-2 text-orange-500" />
                    BBQ Sauces
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex items-center p-0 text-sm transition-colors bg-transparent border-none cursor-pointer text-lighter hover:text-red-600"
                    aria-label="Specialty Blends (coming soon)"
                  >
                    <Flame className="w-3 h-3 mr-2 text-red-500" />
                    Specialty Blends
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="p-0 text-sm transition-colors bg-transparent border-none cursor-pointer text-lighter hover:text-red-600"
                    aria-label="Gift Sets (coming soon)"
                  >
                    Gift Sets
                  </button>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="mb-4 text-lg font-semibold text-content font-heading">Help & Info</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/AboutUs" className="text-sm transition-colors text-lighter hover:text-red-600">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/ContactUs" className="text-sm transition-colors text-lighter hover:text-red-600">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm transition-colors text-lighter hover:text-red-600">
                    Shipping
                  </Link>
                </li>
                <li>
                  <Link to="#" className="text-sm transition-colors text-lighter hover:text-red-600">
                    Returns
                  </Link>
                </li>
                <li>
                  <Link to="/Faqs" className="text-sm transition-colors text-lighter hover:text-red-600">
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
              <h4 className="mb-4 text-lg font-semibold text-content font-heading">Follow the Heat</h4>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 text-white transition-transform border-0 bg-gradient-to-br from-pink-500 to-purple-600 hover:scale-105"
                >
                  <Instagram className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 text-white transition-transform bg-blue-600 border-0 hover:scale-105"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="w-10 h-10 text-white transition-transform bg-blue-400 border-0 hover:scale-105"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
              </div>
              <p className="mt-2 text-xs text-lighter">Share your spicy creations with #SpiceAndFire</p>
            </div>

            {/* Unique Features */}
            <div className="p-4 rounded-2xl bg-gray-50">
              <h5 className="mb-3 text-sm font-semibold text-black font-heading">Why Choose Us?</h5>
              <div className="space-y-2">
                <div className="flex items-center text-xs text-lighter dark:text-neutral">
                  <Shield className="w-4 h-4 mr-2 text-green-500" />
                  All-natural ingredients
                </div>
                <div className="flex items-center text-xs text-lighter dark:text-neutral">
                  <Truck className="w-4 h-4 mr-2 text-blue-500" />
                  Free shipping over $35
                </div>
                <div className="flex items-center text-xs text-lighter dark:text-neutral">
                  <RotateCcw className="w-4 h-4 mr-2 text-purple-500" />
                  30-day satisfaction guarantee
                </div>
              </div>
            </div>

            {/* Fun Sauce Fact */}
            <div className="p-4 border-l-4 border-red-500 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50">
              <h5 className="mb-1 text-sm font-semibold text-black font-heading">Spicy Fact</h5>
              <p className="text-xs text-lighter dark:text-neutral">
                The Carolina Reaper is currently the world's hottest pepper at 2.2 million Scoville units! 🌶️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-card">
        <div className="max-w-6xl px-4 py-6 mx-auto sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
              <p className="text-sm text-lighter">
                © 2024 <span>Spice & Fire Co.</span> All rights reserved.
              </p>
              <div className="flex space-x-4">
                <a href="/privacy" className="text-xs transition-colors text-lighter hover:text-red-600">
                  Privacy
                </a>
                <a href="/terms" className="text-xs transition-colors text-lighter hover:text-red-600">
                  Terms
                </a>
              </div>
            </div>

            <div className="flex items-center text-xs text-lighter">
              <span>Made with</span>
              <Flame className="w-3 h-3 mx-1 text-red-500" />
              <span>in Spice City</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
