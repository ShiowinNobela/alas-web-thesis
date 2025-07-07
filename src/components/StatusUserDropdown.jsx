import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";

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
      document.addEventListener("click", handleClickOutside);
    }
    return () => document.removeEventListener("click", handleClickOutside);
  }, [open]);

  return (
    <>
      <div className="relative inline-block z-20">
        <button
          ref={buttonRef}
          onClick={toggleDropdown}
          className="relative min-w-[11.5rem] pl-4 pr-8 py-2.5 text-white bg-secondary border focus:outline-none hover:bg-seconda focus:ring-1 focus:ring-admin-100 text-sm rounded-lg text-left"
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
      </div>

      {open &&
        ReactDOM.createPortal(
          <div
            className="z-50 bg-gray-300 divide-y divide-gray-100 rounded-lg shadow-lg w-44 absolute mt-2 text-content"
            style={{
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              position: "absolute",
            }}
          >
            <ul className="py-1 text-sm">
              {STATUS_OPTIONS.map(({ label, value }) => (
                <li key={value}>
                  <button
                    onClick={() => handleSelect(value)}
                    className="w-full text-left block px-4 py-2 hover:bg-[#d47849]"
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
