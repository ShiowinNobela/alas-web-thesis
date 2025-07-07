import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const CTAButton = ({ to, children }) => {
  return (
    <Link to={to}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 text-white bg-primary rounded-2xl uppercase font-medium shadow-md transition-colors hover:bg-[#bf663a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        {children}
      </motion.button>
    </Link>
  );
};

CTAButton.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default CTAButton;
