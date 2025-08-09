import { ButtonGroup, Button } from 'flowbite-react';
import PropTypes from 'prop-types';

const ButtonGroupFilter = ({
  options,
  value,
  onChange,
  className = '',
  buttonClassName = '',
  activeButtonClassName = 'bg-stone-500 text-blue-800',
}) => {
  return (
    <ButtonGroup outline className={className}>
      {options.map((option) => {
        const isActive = value === option.value;
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            onClick={() => onChange(option.value)}
            color="dark"
            className={`capitalize ${buttonClassName} ${
              isActive ? activeButtonClassName : ''
            }`}
          >
            {option.icon && <Icon className="me-2 h-4 w-4" />}
            {option.label}
          </Button>
        );
      })}
    </ButtonGroup>
  );
};

ButtonGroupFilter.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      icon: PropTypes.elementType,
    })
  ).isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  buttonClassName: PropTypes.string,
  activeButtonClassName: PropTypes.string,
};

export default ButtonGroupFilter;
