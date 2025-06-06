export const CheckOutInput = ({ ...props }) => (
  <input
    className="
      bg-white
      shadow-md
      w-full
      py-2 px-3
      text-gray-700
      border border-gray-300
      rounded
      focus:outline-none
      focus:ring-2
      focus:ring-gray-500
      hover:ring-2
      hover:ring-gray-300
      transition-colors
    "
    {...props}
  />
);

export const CheckOutTextArea = ({ ...props }) => (
  <textarea
    className="
      bg-white
      shadow-md
      w-full
      py-2 px-3
      text-gray-700
      leading-tight
      border border-gray-300
      rounded
      focus:outline-none
      focus:ring-2
      focus:ring-gray-500
      hover:ring-2
      hover:ring-gray-300
      transition-colors
    "
    {...props}
  />
);
