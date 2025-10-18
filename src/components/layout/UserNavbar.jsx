import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import UserDropdown from '@/components/bigComponents/UserDropdown';
import { Button } from '@/components/ui/button';
import ThemeToggle from '../filters/ThemeToggle';
import { handleLogout } from '@/utils/logout';
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer';
import Cart from '../bigComponents/Cart';
import { Menu, ShoppingCart, X } from 'lucide-react';
import useUserStore from '@/stores/userStore';

const navItemStyle =
  'px-2 py-2 border-b-2 border-transparent hover:border-primary hover:text-primary transition-all cursor-pointer';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const user = useUserStore((state) => state.user);

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;
  const getNavItemClass = (path) => `${navItemStyle} ${isActive(path) ? 'text-primary' : ''}`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/menu', label: 'Menu' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
  ];

  const legalLinks = [
    { to: '/faq', label: 'FAQS' },
    { to: '/terms-and-conditions', label: 'Terms & Conditions' },
    { to: '/privacy-policy', label: 'Privacy Policy' },
  ];

  return (
    <header className="bg-card sticky top-0 z-50 w-full shadow">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              className="h-11 w-auto cursor-pointer"
              src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
              alt="Logo"
              onError={(e) => {
                e.currentTarget.src = 'https://8upload.com/display/68d52d9e15810/logo-alas1.jpg.php';
              }}
            />
          </Link>
          <h1 className="font-heading text-content hidden text-lg tracking-tight lg:block">Alas Delis and Spices</h1>
          <ThemeToggle />
        </div>

        {/* Desktop Navigation */}
        <nav className="font-semobold hidden items-center gap-5 text-sm md:flex md:gap-2 lg:gap-4 xl:gap-8">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getNavItemClass(link.to)}>
              {link.label}
            </Link>
          ))}
          <div className="group relative">
            <button className={`${navItemStyle} flex items-center gap-1`}>
              Policies
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div className="invisible absolute top-full left-0 z-50 mt-2 w-48 rounded-lg border bg-white opacity-0 shadow-lg transition-all duration-300 group-hover:visible group-hover:opacity-100">
              {legalLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="block border-b px-4 py-3 text-sm text-gray-700 first:rounded-t-lg last:rounded-b-lg last:border-b-0 hover:bg-gray-100"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {user && (
            <>
              <Link to="/user/dashboard" className={getNavItemClass('/user/dashboard')}>
                Dashboard
              </Link>
            </>
          )}

          {user ? (
            <UserDropdown />
          ) : (
            <Link to="/login" className={getNavItemClass('/login')}>
              Sign In
            </Link>
          )}

          <Link to={user ? '/menu' : '/login'} onClick={closeMobileMenu}>
            <Button variant="CTA" className="text-xs lg:text-sm">
              Order Now
            </Button>
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <div className="flex items-center gap-3 md:hidden">
          {user && (
            <Drawer direction="right">
              <DrawerTrigger className="bg-primary rounded-sm p-2">
                <ShoppingCart className="size-4 text-white" />
              </DrawerTrigger>
              <DrawerContent>
                <Cart />
              </DrawerContent>
            </Drawer>
          )}

          <Button onClick={toggleMobileMenu} aria-label="Toggle Menu" variant="CTA">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        <div
          className={`bg-card text-content fixed top-0 left-0 z-40 h-screen w-2/3 max-w-xs transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="border-content flex items-center justify-between divide-y-2 px-5 py-4">
            <Link to="/" onClick={closeMobileMenu}>
              <img
                className="h-12 w-auto"
                src="https://res.cloudinary.com/drq2wzvmo/image/upload/v1758546285/logo-alas1_iisjkz.jpg"
                alt="Logo"
              />
            </Link>
          </div>

          <nav className="border-primary flex flex-1 flex-col gap-1 divide-y px-5 py-4 text-lg uppercase">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} onClick={closeMobileMenu} className="py-3 transition">
                {link.label}
              </Link>
            ))}

            {user ? (
              <>
                <Link to="/user/orders" onClick={closeMobileMenu} className="py-3 transition">
                  My Orders
                </Link>
                <Link to="/user/profile" onClick={closeMobileMenu} className="py-3 transition">
                  Profile
                </Link>
                <button onClick={handleLogout} className="py-3 text-left transition">
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login" onClick={closeMobileMenu} className="py-3 transition">
                Sign In
              </Link>
            )}

            <Button variant="CTA" to={user ? '/menu' : '/login'} onClick={closeMobileMenu} className="mt-4">
              Order
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
