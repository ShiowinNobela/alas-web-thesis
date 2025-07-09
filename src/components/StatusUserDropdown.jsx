import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

const STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipping', value: 'shipping' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Returned', value: 'returned' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function StatusUserDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef(null);

  const toggleDropdown = () => {
    if (!open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
    setOpen(!open);
  };

  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  // Optional: close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (buttonRef.current && !buttonRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('click', handleClickOutside);
    }
    return () => document.removeEventListener('click', handleClickOutside);
  }, [open]);

  return (
    <>
      <div className="relative z-20 inline-block">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="focus:ring-secondary relative min-w-[11.5rem] rounded-lg border border-gray-300 bg-white py-2.5 pr-8 pl-4 text-left text-sm text-gray-800 transition hover:bg-gray-100 focus:ring-2 focus:outline-none"
          type="button"
        >
          Filter: {selected || 'All'}
          <svg
            className="pointer-events-none absolute top-1/2 right-3 h-2.5 w-2.5 -translate-y-1/2 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>
      </div>

      {open &&
        ReactDOM.createPortal(
          <div
            className="absolute z-50 mt-2 w-44 divide-y divide-gray-100 rounded-lg border border-gray-200 bg-white text-gray-900 shadow-lg"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              position: 'absolute',
            }}
          >
            <ul className="py-1 text-sm">
              {STATUS_OPTIONS.map(({ label, value }) => (
                <li key={value}>
                  <button
                    onClick={() => handleSelect(value)}
                    className="hover:bg-secondary/15 hover:text-content block w-full px-4 py-2 text-left transition"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
}

StatusUserDropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
