import PropTypes from 'prop-types';
import { useId } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
}) {
  const id = useId();

  return (
    <div>
      {/* Label */}
      <Label htmlFor={id}>{label}</Label>

      {/* Input field with error styling */}
      <div className="">
        <Input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : undefined}
          className={`${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
        />
      </div>

      {/* Optional error message */}
      {typeof error === 'string' && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
}

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};
