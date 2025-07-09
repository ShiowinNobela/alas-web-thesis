import PropTypes from 'prop-types';

const TextInput = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder = '',
  error,
}) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`border-2 bg-gray-50 ${
          error
            ? 'border-red focus:ring-red focus:border-red'
            : 'focus:ring-secondary focus:border-secondary border-gray-300'
        } text-content block w-full rounded-lg p-1.5 outline-none`}
      />
      {typeof error === 'string' && error && (
        <p className="text-red mt-1 text-sm">{error}</p>
      )}
    </div>
  );
};

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default TextInput;
