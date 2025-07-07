import PropTypes from "prop-types";

const TextInput = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error,
}) => {
  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`bg-gray-50 border-2 ${
          error
            ? "border-red focus:ring-red focus:border-red"
            : "border-gray-300 focus:ring-primary focus:border-primary"
        } text-content rounded-lg block w-full p-2.5 outline-none`}
      />
      {typeof error === "string" && error && (
        <p className="mt-1 text-sm text-red">{error}</p>
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
