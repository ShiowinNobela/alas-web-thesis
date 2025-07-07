import PropTypes from "prop-types";

const PrimaryButton = ({ type = "button", onClick, children }) => (
  <button
    type={type}
    onClick={onClick}
    className="w-full text-white bg-primary hover:bg-[#bf663a] focus:ring-4 focus:outline-none focus:ring-[#d47849]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase transition-all font-heading"
  >
    {children}
  </button>
);

PrimaryButton.propTypes = {
  type: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default PrimaryButton;
