import { useNavigate } from 'react-router-dom';
import { ArrowLeftIcon } from 'lucide-react';
import { Button } from '@/components/ui/button'; // adjust if needed

function BackButton({ className = '', label = 'Go Back' }) {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(-1)}
      className={`group hover:text-content text-lighter inline-flex items-center gap-2 transition-colors ${className}`}
    >
      <ArrowLeftIcon
        size={20}
        className="transition-transform duration-200 group-hover:-translate-x-1"
      />
      {label}
    </Button>
  );
}

export default BackButton;
