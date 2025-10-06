import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const PromptLink = ({ promptText, linkText, to }) => (
  <p className="text-lighter text-center text-sm font-light">
    {promptText}{' '}
    <Link
      to={to}
      className="border-primary text-primary hover:bg-primary/10 focus:ring-primary/30 font-heading mt-2 block w-full rounded-2xl border px-5 py-2 text-center text-sm font-medium uppercase transition-all focus:ring-4 focus:outline-none"
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
