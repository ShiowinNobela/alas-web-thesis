import { ButtonGroup, Button } from 'flowbite-react';
import PropTypes from 'prop-types';

const ButtonGroupFilter = ({
  options,
  value,
  onChange,
  className = '',
  activeButtonClassName = ' text-primary dark:text-primary ',
}) => {
  return (
    <ButtonGroup className={className}>
      {options.map((option) => {
        const isActive = value === option.value;
        const Icon = option.icon;
        return (
          <Button
            key={option.value}
            onClick={() => onChange(option.value)}
            color="alternative"
            className={`dark:hover:text-primary hover:text-primary focus:ring-0 dark:text-white ${isActive ? activeButtonClassName : ''}`}
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
