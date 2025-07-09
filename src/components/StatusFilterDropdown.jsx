import { useState } from 'react';
import PropTypes from 'prop-types';

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

export default function StatusFilterDropdown({ selected, onChange }) {
  const [open, setOpen] = useState(false);

  const toggleDropdown = () => setOpen(!open);
  const handleSelect = (value) => {
    onChange(value);
    setOpen(false);
  };

  return (
    <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="focus:ring-admin-100 relative min-w-[10.5rem] rounded-lg border border-gray-500 bg-white py-2.5 pr-8 pl-4 text-left text-sm font-medium text-black hover:bg-gray-100 focus:ring-1 focus:outline-none"
        type="button"
      >
        Filter: {selected || 'All'}
        <svg
          className="pointer-events-none absolute top-1/2 right-3 h-2.5 w-2.5 -translate-y-1/2"
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

      {open && (
        <div className="bg-neutral absolute z-10 mt-2 w-44 divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul
            className="py-1 text-sm text-black"
            aria-labelledby="dropdownActionButton"
          >
            {STATUS_OPTIONS.map(({ label, value }) => (
              <li key={value}>
                <button
                  onClick={() => handleSelect(value)}
                  className="hover:bg-secondary block w-full px-4 py-2 text-left"
                >
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

StatusFilterDropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
