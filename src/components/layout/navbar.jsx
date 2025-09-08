import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import Logo from '/logo-alas1.jpg';
import UserDropdown from '@/components/bigComponents/UserDropdown';
import { Button } from '@/components/ui/button';
import ThemeToggle from '../filters/ThemeToggle';
import { handleLogout } from '@/utils/logout';

const navItemStyle =
  'px-2 py-2 border-b-2 border-transparent hover:border-brand hover:text-brand transition-all cursor-pointer';

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const storedUser = JSON.parse(window.localStorage.getItem('user'));

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;
  const getNavItemClass = (path) => `${navItemStyle} ${isActive(path) ? 'text-brand' : ''}`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/ProductListPage', label: 'Menu' },
    { to: '/AboutUs', label: 'About' },
    { to: '/ContactUs', label: 'Contact' },
    { to: '/Faqs', label: 'FAQ' },
  ];

  return (
    <header className="bg-card sticky top-0 z-50 w-full drop-shadow-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-4 py-4">
        <div className="flex flex-row items-center justify-center gap-4">
          <Link to="/" onClick={closeMobileMenu}>
            <img className="h-11 w-auto cursor-pointer" src={Logo} alt="Logo" />
          </Link>
          <h1 className="font-heading text-content hidden text-lg lg:block">Alas Delis and Spices</h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="text-content font-heading hidden items-center gap-8 tracking-wide md:flex">
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to} className={getNavItemClass(link.to)}>
              {link.label}
            </Link>
          ))}

          {storedUser ? (
            <UserDropdown />
          ) : (
            <Link to="/LoginPage" className={getNavItemClass('/LoginPage')}>
              Sign In
            </Link>
          )}

          <ThemeToggle />

          <Link to={storedUser ? '/ProductListPage' : '/LoginPage'} onClick={closeMobileMenu}>
            <Button variant="CTA">Order Now</Button>
          </Link>
        </nav>

        {/* Hamburger Icon */}
        <Button onClick={toggleMobileMenu} className="lg:hidden" aria-label="Toggle Menu" variant="CTA">
          {mobileMenuOpen ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </Button>

        {/* Mobile Menu */}
        <div
          className={`bg-card text-content fixed top-0 left-0 z-40 h-screen w-2/3 max-w-xs transform ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="border-content flex items-center justify-between divide-y-2 px-5 py-4">
            <Link to="/" onClick={closeMobileMenu}>
              <img className="h-12 w-auto" src={Logo} alt="Logo" />
            </Link>
          </div>

          <nav className="border-primary flex flex-1 flex-col gap-1 divide-y px-5 py-4 text-lg uppercase">
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
