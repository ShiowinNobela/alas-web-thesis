import { useState } from "react";
import PropTypes from "prop-types";

const STATUS_OPTIONS = [
  { label: "All", value: "" },
  { label: "Pending", value: "pending" },
  { label: "Processing", value: "processing" },
  { label: "Shipping", value: "shipping" },
  { label: "Delivered", value: "delivered" },
  { label: "Refunded", value: "refunded" },
  { label: "Returned", value: "returned" },
  { label: "Cancelled", value: "cancelled" },
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
        className="relative min-w-[10.5rem] pl-4 pr-8 py-2.5 text-black bg-white border border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-admin-100 font-medium rounded-lg text-sm text-left"
        type="button"
      >
        Filter: {selected || "All"}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 pointer-events-none"
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
        <div className="z-10 bg-neutral divide-y divide-gray-100 rounded-lg shadow-sm w-44 absolute mt-2">
          <ul
            className="py-1 text-sm text-black"
            aria-labelledby="dropdownActionButton"
          >
            {STATUS_OPTIONS.map(({ label, value }) => (
              <li key={value}>
                <button
                  onClick={() => handleSelect(value)}
                  className="w-full text-left block px-4 py-2 hover:bg-secondary"
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
