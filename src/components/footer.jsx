function Footer() {
  return (
    <footer className="body-font bg-orange-200 text-gray-600">
      <div className="container mx-auto flex max-w-6xl flex-col px-5 py-16 md:flex-row md:items-start md:justify-between">
        {/* Left side: Two link columns */}
        <div className="flex flex-col sm:flex-row">
          <div className="mb-8 sm:mr-16 sm:mb-0">
            <h2 className="title-font mb-3 text-sm font-semibold tracking-widest text-gray-900">
              CATEGORIES
            </h2>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-800">First Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Second Link</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Third Link</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="title-font mb-3 text-sm font-semibold tracking-widest text-gray-900">
              RESOURCES
            </h2>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-600 hover:text-gray-800">About Us</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">Contact</a>
              </li>
              <li>
                <a className="text-gray-600 hover:text-gray-800">
                  Frequently Asked Questions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Right side: Big logo and description */}
        <div className="mt-12 text-center md:mt-0 md:max-w-sm md:text-left">
          <a className="title-font flex items-center justify-center text-2xl font-bold text-gray-900 md:justify-start">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="mr-2 h-12 w-12 rounded-full bg-orange-500 p-2 text-white"
              viewBox="0 0 24 24"
            >
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            Sauce Shop
          </a>
          <p className="mt-3 text-sm text-gray-500">
            Delicious sauces delivered to your door. Quality ingredients, bold
            flavors, always fresh.
          </p>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-red-100">
        <div className="container mx-auto flex flex-col items-center px-5 py-4 sm:flex-row">
          <p className="text-center text-sm text-gray-500 sm:text-left">
            © 2025 Sauce Shop —
            <a
              href="https://twitter.com/"
              className="ml-1 text-gray-600 hover:text-gray-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              @sauceshop
            </a>
          </p>
          <span className="mt-2 inline-flex justify-center sm:mt-0 sm:ml-auto">
            <a className="text-gray-500 hover:text-gray-700">
              <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500 hover:text-gray-700">
              <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
              </svg>
            </a>
            <a className="ml-3 text-gray-500 hover:text-gray-700">
              <svg fill="currentColor" className="h-5 w-5" viewBox="0 0 24 24">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
              </svg>
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
