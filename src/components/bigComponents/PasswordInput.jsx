import PropTypes from 'prop-types';
import { useId, useMemo, useState } from 'react';
import { CheckIcon, EyeIcon, EyeOffIcon, XIcon } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function PasswordInput({
  label,
  value,
  onChange,
  placeholder,
  error,
  showRequirements = true,
}) {
  const id = useId();
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  // Password strength check
  const checkStrength = (pass) => {
    const requirements = [
      { regex: /.{8,}/, text: 'At least 8 characters' },
      { regex: /[0-9]/, text: 'At least 1 number' },
      { regex: /[a-z]/, text: 'At least 1 lowercase letter' },
      { regex: /[A-Z]/, text: 'At least 1 uppercase letter' },
    ];
    return requirements.map((req) => ({
      met: req.regex.test(pass),
      text: req.text,
    }));
  };

  const strength = checkStrength(value);
  const strengthScore = useMemo(
    () => strength.filter((req) => req.met).length,
    [strength]
  );

  const getStrengthColor = (score) => {
    if (score === 0) {
      return 'bg-border';
    }
    if (score <= 1) {
      return 'bg-red-500';
    }
    if (score <= 2) {
      return 'bg-orange-500';
    }
    if (score === 3) {
      return 'bg-amber-500';
    }
    return 'bg-emerald-500';
  };

  const getStrengthText = (score) => {
    if (score === 3) {
      return 'Medium password';
    }
    if (score <= 2) {
      return 'Weak password';
    }
    if (score === 3) {
      return 'Medium password';
    }
    return 'Strong password';
  };

  return (
    <div>
      {/* Label */}
      <Label htmlFor={id}>{label}</Label>

      {/* Password input */}
      <div className="relative mt-2">
        <Input
          id={id}
          type={isVisible ? 'text' : 'password'}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`pe-9 ${error ? 'border-red-500 focus-visible:ring-red-500' : ''}`}
          aria-describedby={showRequirements ? `${id}-description` : undefined}
        />
        <button
          type="button"
          onClick={toggleVisibility}
          className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px]"
          aria-label={isVisible ? 'Hide password' : 'Show password'}
        >
          {isVisible ? <EyeOffIcon size={16} /> : <EyeIcon size={16} />}
        </button>
      </div>

      {/* Optional error message */}
      {typeof error === 'string' && error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}

      {/* Password requirements section (conditionally rendered) */}
      {showRequirements && (
        <>
          <div
            className="bg-primary mt-3 mb-2 h-1 w-full overflow-hidden rounded-full"
            role="progressbar"
            aria-valuenow={strengthScore}
            aria-valuemin={0}
            aria-valuemax={4}
            aria-label="Password strength"
          >
            <div
              className={`h-full ${getStrengthColor(strengthScore)} transition-all duration-500 ease-out`}
              style={{ width: `${(strengthScore / 4) * 100}%` }}
            />
          </div>

          <p
            id={`${id}-description`}
            className="text-foreground mb-2 text-sm font-medium"
          >
            {getStrengthText(strengthScore)}. Must contain:
          </p>

          <ul className="space-y-1.5" aria-label="Password requirements">
            {strength.map((req, index) => (
              <li key={index} className="flex items-center gap-2">
                {req.met ? (
                  <CheckIcon size={16} className="text-emerald-500" />
                ) : (
                  <XIcon size={16} className="text-muted-foreground/80" />
                )}
                <span
                  className={`text-xs ${req.met ? 'text-emerald-600' : 'text-muted-foreground'}`}
                >
                  {req.text}
                  <span className="sr-only">
                    {req.met ? ' - Requirement met' : ' - Requirement not met'}
                  </span>
                </span>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  showRequirements: PropTypes.bool,
};
