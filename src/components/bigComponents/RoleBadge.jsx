import { Badge } from 'flowbite-react';
import { Shield, Briefcase, ShoppingCart, UserCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const RoleBadge = ({ role }) => {
  const roleConfig = {
    admin: {
      icon: Shield,
      color: 'blue',
      text: 'Admin',
    },
    staff: {
      icon: Briefcase,
      color: 'teal',
      text: 'Staff',
    },
    customer: {
      icon: ShoppingCart,
      color: 'lime',
      text: 'Customer',
    },
    default: {
      icon: UserCircle,
      color: 'gray',
      text: 'Unknown',
    },
  };

  const normalizedRole = role?.toLowerCase().trim();

  const { icon, color, text } =
    roleConfig[normalizedRole] || roleConfig.default;

  return (
    <Badge
      color={color}
      icon={icon}
      className="flex items-center justify-center gap-1"
    >
      {text}
    </Badge>
  );
};

RoleBadge.propTypes = {
  role: PropTypes.string,
};

export default RoleBadge;
