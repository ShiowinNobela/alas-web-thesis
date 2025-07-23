import { EyeIcon, HeartIcon, ShoppingBasket, StarIcon } from 'lucide-react';
import { Card } from '../ui/card';
import PropTypes from 'prop-types';

const iconMap = {
  order: ShoppingBasket,
  star: StarIcon,
  heart: HeartIcon,
  eye: EyeIcon,
};

export default function UserStats({ icon, label, stats }) {
  const IconComponent = iconMap[icon];
  return (
    <Card className="text-content w-full gap-2 px-4 py-4">
      {IconComponent && <IconComponent />}
      <p className="text-lighter text-sm">{label}</p>
      <h4 className="font-heading text-primary text-5xl leading-15">{stats}</h4>
    </Card>
  );
}

UserStats.propTypes = {
  icon: PropTypes.oneOf(['order', 'star', 'heart', 'eye']).isRequired,
  label: PropTypes.string.isRequired,
  stats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
