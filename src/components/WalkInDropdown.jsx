import { useState } from "react";
import PropTypes from "prop-types";

const STATUS_OPTIONS = [
  { label: "Pending", value: "pending" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "All", value: "" },
];

export default function WalkInDropdown({ selected, onChange }) {
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
        type="button"
        className="relative min-w-[10.5rem] pl-4 pr-8 py-2.5 text-black bg-white border border-gray-500 focus:outline-none hover:bg-gray-100 focus:ring-1 focus:ring-admin-100 font-medium rounded-lg text-sm text-left"
      >
        Filter: {selected || "All"}
        <svg
          className="absolute right-3 top-1/2 -translate-y-1/2 w-2.5 h-2.5 pointer-events-none"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            d="M1 1l4 4 4-4"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute mt-2 w-44 z-10 bg-neutral divide-y divide-gray-100 rounded-lg shadow-sm">
          <ul className="py-1 text-sm text-black">
            {STATUS_OPTIONS.map(({ label, value }) => (
              <li key={value}>
                <button
                  onClick={() => handleSelect(value)}
                  className="block w-full px-4 py-2 text-left hover:bg-secondary"
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

WalkInDropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
