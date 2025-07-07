import { useState } from "react";
import PropTypes from "prop-types";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const PasswordInput = ({ label, value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <label className="block mb-2 text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`bg-gray-50 border-2 ${
            error
              ? "border-red focus:ring-red focus:border-red"
              : "border-gray-300 focus:ring-primary focus:border-primary"
          } text-content rounded-lg block w-full p-2.5 pr-10 outline-none`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-2 flex items-center text-content hover:text-primary"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
        </button>
      </div>
      {typeof error === "string" && error && (
        <p className="mt-1 text-sm text-red">{error}</p>
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
