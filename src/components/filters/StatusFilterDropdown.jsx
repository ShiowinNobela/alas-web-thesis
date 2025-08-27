import PropTypes from 'prop-types';
import { Dropdown, DropdownItem } from 'flowbite-react';

const STATUS_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Pending', value: 'pending' },
  { label: 'Processing', value: 'processing' },
  { label: 'Shipping', value: 'shipping' },
  { label: 'Delivered', value: 'delivered' },
  { label: 'Refunded', value: 'refunded' },
  { label: 'Returned', value: 'returned' },
  { label: 'Cancelled', value: 'cancelled' },
];

export default function StatusFilterDropdown({ selected, onChange }) {
  return (
    <Dropdown
      label={`Filter: ${selected || 'All'}`}
      dismissOnClick={true}
      inline={false}
      color="alternative"
      className="min-w-[11rem]"
    >
      {STATUS_OPTIONS.map(({ label, value }) => (
        <DropdownItem key={value} onClick={() => onChange(value)}>
          {label}
        </DropdownItem>
      ))}
    </Dropdown>
  );
}

StatusFilterDropdown.propTypes = {
  selected: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
