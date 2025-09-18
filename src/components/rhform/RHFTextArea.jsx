import PropTypes from 'prop-types';
import { Controller } from 'react-hook-form';
import { Textarea, Label } from 'flowbite-react';

export default function RHFTextarea({ name, control, rules, label, ...props }) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <div className="flex flex-col gap-1">
          {label && (
            <Label htmlFor={name} className="text-sm font-medium text-gray-700">
              {label}
            </Label>
          )}
          <Textarea
            id={name}
            {...field}
            {...props}
            value={field.value || ''} // Explicitly set the value
            color={fieldState.error ? 'failure' : 'gray'}
          />
          {fieldState.error && <p className="text-sm text-red-500">{fieldState.error.message}</p>}
        </div>
      )}
    />
  );
}

RHFTextarea.propTypes = {
  name: PropTypes.string.isRequired,
  control: PropTypes.any.isRequired,
  rules: PropTypes.object,
  label: PropTypes.string,
};
