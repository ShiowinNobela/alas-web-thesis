import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Label, Select } from 'flowbite-react';

export default function RHFSelectInput({ name, control, label, rules, options, placeholder }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState: { error } }) => (
        <div className="flex flex-col gap-1">
          {label && <Label htmlFor={name} value={label} />}
          <Select id={name} {...field} color="gray">
            {placeholder && (
              <option value="" disabled>
                {placeholder}
              </option>
            )}
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt.charAt(0).toUpperCase() + opt.slice(1)}
              </option>
            ))}
          </Select>
          {error && <p className="text-sm text-red-500">{error.message}</p>}
        </div>
      )}
    />
  );
}

RHFSelectInput.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  label: PropTypes.string,
  rules: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.string).isRequired,
  placeholder: PropTypes.string,
};
