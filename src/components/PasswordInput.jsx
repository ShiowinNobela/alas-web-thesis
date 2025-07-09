import { useState } from 'react';
import PropTypes from 'prop-types';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

const PasswordInput = ({ label, value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`border-2 bg-gray-50 ${
            error
              ? 'border-red focus:ring-red focus:border-red'
              : 'focus:ring-secondary focus:border-secondary border-gray-300'
          } text-content block w-full rounded-lg p-1.5 pr-10 outline-none`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="text-content hover:text-primary absolute inset-y-0 right-2 flex items-center"
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {typeof error === 'string' && error && (
        <p className="text-red mt-1 text-sm">{error}</p>
      )}
    </div>
  );
};

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default PasswordInput;
