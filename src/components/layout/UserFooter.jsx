import { Phone, MapPin, Flame, Truck, Shield, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-card">
      {/* Main Footer Content */}
      <div className="text-content mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
          {/* Company Info with Unique Branding */}
          <div className="space-y-6">
            <div>
              <h3 className="text-content font-heading mb-2 text-2xl font-bold">Alas Delis & Spices</h3>
              <div className="mb-4 flex items-center space-x-1">
                <span className="text-lighter text-xs">Est. May 2020</span>
              </div>
              <p className="text-lighter text-sm leading-relaxed">
                Handcrafted sauces that bring the heat and flavor to every meal. From garden-fresh ingredients to your
                table.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-lighter flex items-center text-sm">
                <MapPin className="text-primary mr-3 h-4 w-4" />
                Old Balara, Tandang Sora Avenue, Quezon City
              </div>
              <div className="text-lighter flex items-center text-sm">
                <Phone className="text-primary mr-3 h-4 w-4" />
                0995 285 8665
              </div>
            </div>

            {/* Unique Heat Level Guide */}
            <div className="rounded-2xl border border-orange-200 bg-gradient-to-r from-yellow-50 to-red-50 p-4">
              <h4 className="font-heading mb-2 text-sm font-semibold text-black">Heat Level Guide</h4>
              <div className="space-y-1">
                <div className="flex items-center text-xs">
                  <Flame className="mr-1 h-3 w-3 text-yellow-500" />
                  <span className="text-lighter dark:text-neutral">Mild - Perfect for beginners</span>
                </div>
                <div className="flex items-center text-xs">
                  <Flame className="mr-1 h-3 w-3 text-orange-500" />
                  <Flame className="mr-1 h-3 w-3 text-orange-500" />
                  <span className="text-lighter dark:text-neutral">Medium - Just right</span>
                </div>
                <div className="flex items-center text-xs">
                  <Flame className="text-primary mr-1 h-3 w-3" />
                  <Flame className="text-primary mr-1 h-3 w-3" />
                  <Flame className="text-primary mr-1 h-3 w-3" />
                  <span className="text-lighter dark:text-neutral">Hot - Bring the fire!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Simplified Navigation */}
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
            {/* Shop */}
            <div>
              <h4 className="text-content font-heading mb-4 text-lg font-semibold">Other Shops</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="https://shopee.ph/alashotsauce"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lighter flex items-center text-sm hover:text-amber-600"
                  >
                    Shopee
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.lazada.com.ph/shop/alas-hot-sauce-by-alas-delis-and-spices"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lighter flex items-center text-sm hover:text-pink-500"
                  >
                    Lazada
                  </a>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-content font-heading mb-4 text-lg font-semibold">Help & Info</h4>
              <ul className="space-y-3">
                <li>
                  <Link to="/about" className="text-lighter hover:text-primary text-sm transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-lighter hover:text-primary text-sm transition-colors">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="text-lighter hover:text-primary text-sm transition-colors">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms-and-conditions"
                    className="text-lighter hover:text-primary text-sm transition-colors"
                  >
                    Terms and Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy-policy" className="text-lighter hover:text-primary text-sm transition-colors">
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Social & Features */}
          <div className="space-y-6">
            {/* Social Media */}
            <div>
              <h4 className="text-content font-heading mb-4 text-lg font-semibold">Follow the Heat</h4>
              <div className="flex space-x-3">
                <a href="https://www.instagram.com/alasdelisandspices/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-0 bg-gradient-to-br from-pink-500 to-purple-600 text-white transition-transform hover:scale-105"
                  >
                    <FaInstagram className="h-4 w-4" />
                  </Button>
                </a>

                <a href="https://www.facebook.com/alas918/" target="_blank" rel="noopener noreferrer">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-10 w-10 border-0 bg-blue-600 text-white transition-transform hover:scale-105"
                  >
                    <FaFacebook className="h-4 w-4" />
                  </Button>
                </a>
              </div>
              <p className="text-lighter mt-4 text-xs">Share your spicy creations with #AlasHotSauce</p>
            </div>

            {/* Unique Features */}
            <div className="rounded-2xl bg-gray-50 p-4">
              <h5 className="font-heading mb-3 text-sm font-semibold text-black">Why Choose Us?</h5>
              <div className="space-y-2">
                <div className="text-lighter dark:text-neutral flex items-center text-xs">
                  <Shield className="mr-2 h-4 w-4 text-green-500" />
                  All-natural ingredients
                </div>
                <div className="text-lighter dark:text-neutral flex items-center text-xs">
                  <Truck className="mr-2 h-4 w-4 text-blue-500" />
                  Artisanal Blends
                </div>
                <div className="text-lighter dark:text-neutral flex items-center text-xs">
                  <RotateCcw className="mr-2 h-4 w-4 text-purple-500" />
                  30-day satisfaction guarantee
                </div>
              </div>
            </div>

            {/* Fun Sauce Fact */}
            <div className="border-primary rounded-2xl border-l-4 bg-gradient-to-r from-red-50 to-orange-50 p-4">
              <h5 className="font-heading mb-1 text-sm font-semibold text-black">Spicy Fact</h5>
              <p className="text-lighter dark:text-neutral text-xs">
                The Carolina Reaper is currently the world's hottest pepper at 2.2 million Scoville units! 🌶️
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="bg-card">
        <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-y-0 sm:space-x-6">
              <p className="text-lighter text-sm">
                © 2020 <span>Alas Delis and Spices.</span> All rights reserved.
              </p>
              <div className="flex space-x-4">
                <Link to="/terms-and-conditions" className="text-lighter hover:text-primary text-sm transition-colors">
                  Terms and Conditions
                </Link>
                <Link to="/privacy-policy" className="text-lighter hover:text-primary text-sm transition-colors">
                  Privacy Policy
                </Link>
              </div>
            </div>

            <div className="text-lighter flex items-center text-xs">
              <span>Made with HOT</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
