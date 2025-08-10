import { Card } from 'flowbite-react';
import {
  HiSwitchHorizontal,
  HiShoppingCart,
  HiCurrencyDollar,
  HiTag,
} from 'react-icons/hi';
import { AlertTriangle, Package } from 'lucide-react';
import PropTypes from 'prop-types';

const iconsMap = {
  orders: HiShoppingCart,
  sales: HiCurrencyDollar,
  discount: HiTag,
  switch: HiSwitchHorizontal,
  lowStock: AlertTriangle,
  packageBlue: Package,
  packageGreen: Package,
};

export default function SummaryCard({
  iconKey = 'switch',
  iconColor = 'text-gray-500',
  title,
  value,
  className = '',
  paddingClass = '',
}) {
  const IconComponent = iconsMap[iconKey] || HiSwitchHorizontal;

  return (
    <Card
      className={`rounded-xl p-0 shadow-sm ring-1 ${paddingClass} ${className}`}
    >
      <div className="flex items-center gap-3">
        <IconComponent className={`h-6 w-6 ${iconColor}`} />
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="text-2xl font-semibold">{value}</p>
        </div>
      </div>
    </Card>
  );
}

SummaryCard.propTypes = {
  iconKey: PropTypes.oneOf(Object.keys(iconsMap)),
  iconColor: PropTypes.string,
  title: PropTypes.node.isRequired,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
    PropTypes.element,
  ]).isRequired,
  className: PropTypes.string,
  paddingClass: PropTypes.string,
};

SummaryCard.defaultProps = {
  iconKey: 'switch',
  iconColor: 'text-gray-500',
  className: '',
  paddingClass: '',
};
