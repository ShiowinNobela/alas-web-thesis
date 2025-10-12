import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import UserDropdown from '@/components/bigComponents/UserDropdown';
import { Button } from '@/components/ui/button';
import ThemeToggle from '../filters/ThemeToggle';
import { handleLogout } from '@/utils/logout';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Cart from '../bigComponents/Cart';
import { ShoppingCart } from 'lucide-react';

const navItemStyle =
  'px-2 py-2 border-b-2 border-transparent hover:border-primary hover:text-primary transition-all cursor-pointer';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const storedUser = JSON.parse(window.localStorage.getItem('user'));

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;
  const getNavItemClass = (path) => `${navItemStyle} ${isActive(path) ? 'text-primary' : ''}`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/ProductListPage', label: 'Menu' },
    { to: '/AboutUs', label: 'About' },
    { to: '/ContactUs', label: 'Contact' },
  ];

   const legalLinks = [
    { to: '/Faqs', label: 'FAQS' },
    { to: '/TermsAndConditions', label: 'Terms & Conditions' },
    { to: '/PrivacyPolicy', label: 'Privacy Policy' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full shadow bg-card">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              className="w-auto cursor-pointer h-11"
              src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
              alt="Logo"
              onError={(e) => {
                e.currentTarget.src = 'https://8upload.com/display/68d52d9e15810/logo-alas1.jpg.php';
              }}
            />
          </Link>
          <h1 className="hidden text-lg tracking-tight font-heading text-content lg:block">Alas Delis and Spices</h1>
          <ThemeToggle />
        </div>

        {/* Desktop Navigation */}
        <nav className="items-center hidden gap-5 text-sm font-semobold md:flex md:gap-2 lg:gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getNavItemClass(link.to)}>
              {link.label}
            </Link>
          ))}
          <div className="relative group">
            <button className={`${navItemStyle} flex items-center gap-1`}>
              Policies
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="absolute left-0 z-50 invisible w-48 mt-2 transition-all duration-300 bg-white border rounded-lg shadow-lg opacity-0 top-full group-hover:opacity-100 group-hover:visible">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block px-4 py-3 text-sm text-gray-700 border-b hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg last:border-b-0"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {storedUser && (
            <>
              <Link to="/user/dashboard" className={getNavItemClass('/user/dashboard')}>
                Dashboard
              </Link>
            </>
          )}

          {storedUser ? (
            <UserDropdown />
          ) : (
            <Link to="/LoginPage" className={getNavItemClass('/LoginPage')}>
              Sign In
            </Link>
          )}

          <Link to={storedUser ? '/ProductListPage' : '/LoginPage'} onClick={closeMobileMenu}>
            <Button variant="CTA" className="text-xs lg:text-sm">
              Order Now
            </Button>
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <div className="flex items-center gap-3 md:hidden">
          {storedUser && (
            <Drawer direction="right">
              <DrawerTrigger>
                <Button variant="ghost">
                  <ShoppingCart />
                </Button>
              </DrawerTrigger>
              <DrawerContent>
                <Cart />
              </DrawerContent>
            </Drawer>
          )}

          <Button onClick={toggleMobileMenu} aria-label="Toggle Menu" variant="CTA">
            {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
          </Button>
        </div>

        <div
          className={`bg-card text-content fixed top-0 left-0 z-40 h-screen w-2/3 max-w-xs transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between px-5 py-4 divide-y-2 border-content">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                className="w-auto h-12"
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
                alt="Logo"
              />
            </Link>
          </div>

          <nav className="flex flex-col flex-1 gap-1 px-5 py-4 text-lg uppercase divide-y border-primary">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeMobileMenu} className="py-3 transition">
                {link.label}
              </Link>
            ))}

            {storedUser ? (
              <>
                <Link to="/UserOrderPage" onClick={closeMobileMenu} className="py-3 transition">
                  My Orders
                </Link>
                <Link to="/UserSettings" onClick={closeMobileMenu} className="py-3 transition">
                  Profile
                </Link>
                <button onClick={handleLogout} className="py-3 text-left transition">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/LoginPage" onClick={closeMobileMenu} className="py-3 transition">
                Sign In
              </Link>
            )}

            <Button
              variant="CTA"
              to={storedUser ? '/ProductListPage' : '/LoginPage'}
              onClick={closeMobileMenu}
              className="mt-4"
            >
              Order
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
