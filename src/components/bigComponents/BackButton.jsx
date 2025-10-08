import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // adjust if needed
import PropTypes from 'prop-types';

function BackButton({ className = '', label = 'Go Back' }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className={`group inline-flex items-center gap-2 text-yellow-400 transition-colors hover:text-yellow-500 ${className}`}
    >
      <ArrowLeftIcon size={20} className="transition-transform duration-200 group-hover:-translate-x-1" />
      {label}
    </Button>
  );
}
BackButton.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
};

export default BackButton;
