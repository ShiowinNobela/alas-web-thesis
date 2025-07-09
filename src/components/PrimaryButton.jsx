import PropTypes from 'prop-types';

const PrimaryButton = ({ type = 'button', onClick, children }) => (
  <button
    type={type}
    onClick={onClick}
    className="bg-primary font-heading w-full rounded-lg px-5 py-2 text-center text-sm font-medium text-white uppercase transition-all hover:bg-[#bf663a] focus:ring-4 focus:ring-[#d47849]/50 focus:outline-none"
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
