import { EyeIcon, HeartIcon, ShoppingBasket, StarIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="text-content w-full gap-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {IconComponent && <IconComponent className="size-5" />}
          <h3 className="text-content">{label}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h4 className="text-primary text-4xl font-semibold">{stats}</h4>
      </CardContent>
    </Card>
  );
}

UserStats.propTypes = {
  icon: PropTypes.oneOf(['order', 'star', 'heart', 'eye']).isRequired,
  label: PropTypes.string.isRequired,
  stats: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
};
