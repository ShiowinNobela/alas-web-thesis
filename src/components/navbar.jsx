import { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useLocation, Link } from 'react-router-dom';
import CTAButton from './CTAButton';
import Logo from '../components/images/logo.png';
import UserDropdown from './UserDropdown';

const navItemStyle =
  'px-2 py-2 border-b-2 border-transparent hover:border-brand hover:text-brand transition-all cursor-pointer';

function parseJwt(token) {
  if (!token) return null;
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  try {
    return JSON.parse(atob(base64));
  } catch (err) {
    console.log('Invalid token format', err);
    return null;
  }
}

function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const storedUser = JSON.parse(window.localStorage.getItem('user'));
  const userInfo = storedUser ? parseJwt(storedUser.token) : null;

  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  const isActive = (path) => location.pathname === path;
  const getNavItemClass = (path) =>
    `${navItemStyle} ${isActive(path) ? 'text-brand' : ''}`;

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/ProductListPage', label: 'Menu' },
    { to: '/AboutUs', label: 'About' },
    { to: '/ContactUs', label: 'Contact' },
    { to: '/Faqs', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white drop-shadow-md">
      <div className="mx-auto flex max-w-[1440px] items-center justify-between px-8 py-4">
        <div className="flex flex-row items-center justify-center">
          <Link to="/" onClick={closeMobileMenu}>
            <img
              className="h-15 w-auto cursor-pointer transition-all duration-200"
              src={Logo}
              alt="Logo"
            />
          </Link>
          <h1 className="font-logo text-content hidden text-xl lg:block">
            Alas Delis and Spices
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="font-heading text-content hidden items-center gap-6 text-lg uppercase md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={getNavItemClass(link.to)}
            >
              {link.label}
            </Link>
          ))}

          {storedUser ? (
            <UserDropdown user={userInfo} />
          ) : (
            <Link to="/LoginPage" className={getNavItemClass('/LoginPage')}>
              Sign In
            </Link>
          )}

          <CTAButton to={storedUser ? '/ProductListPage' : '/LoginPage'}>
            Order
          </CTAButton>
        </nav>

        {/* Hamburger Icon */}
        <button
          onClick={toggleMobileMenu}
          className="block focus:outline-none lg:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>

        {/* Mobile Menu */}
        <div
          className={`fixed top-0 left-0 z-40 h-full w-[70%] max-w-xs transform bg-[#EA1A20] text-white ${
            mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out`}
        >
          <div className="flex items-center justify-between border-b border-white/20 px-5 py-4">
            <Link to="/" onClick={closeMobileMenu}>
              <img className="h-12 w-auto" src={Logo} alt="Logo" />
            </Link>
            <button
              onClick={closeMobileMenu}
              aria-label="Close Menu"
              className="text-white"
            >
              <AiOutlineClose size={24} />
            </button>
          </div>

          <nav className="font-heading flex flex-col gap-1 px-5 py-4 text-lg uppercase">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={closeMobileMenu}
                className="border-b border-white/20 py-3 transition hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
            {storedUser ? (
              <Link
                to="/"
                onClick={closeMobileMenu}
                className="border-b border-white/20 py-3 transition hover:bg-white/10"
              >
                Account
              </Link>
            ) : (
              <Link
                to="/LoginPage"
                onClick={closeMobileMenu}
                className="border-b border-white/20 py-3 transition hover:bg-white/10"
              >
                Sign In
              </Link>
            )}
            <CTAButton
              to={storedUser ? '/ProductListPage' : '/LoginPage'}
              onClick={closeMobileMenu}
              className="mt-4"
            >
              Order
            </CTAButton>
            !twf
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
