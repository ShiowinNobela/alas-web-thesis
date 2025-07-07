import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const PromptLink = ({ promptText, linkText, to }) => (
  <p className="text-sm font-light text-gray-500 text-center">
    {promptText}{" "}
    <Link
      to={to}
      className="w-full block mt-2 border border-primary text-primary hover:bg-primary/10 focus:ring-4 focus:outline-none focus:ring-primary/30 font-medium rounded-lg text-sm px-5 py-2.5 text-center uppercase transition-all font-heading"
    >
      {linkText}
    </Link>
  </p>
);

PromptLink.propTypes = {
  promptText: PropTypes.node.isRequired,
  linkText: PropTypes.node.isRequired,
  to: PropTypes.string.isRequired,
};

export default PromptLink;
