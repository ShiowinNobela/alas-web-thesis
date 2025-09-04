import { Badge } from 'flowbite-react';
import { Shield, Briefcase, ShoppingCart, UserCircle } from 'lucide-react';
import PropTypes from 'prop-types';

const RoleBadge = ({ role }) => {
  const roleConfig = {
    admin: {
      icon: Shield,
      color: 'cyan',
      text: 'Admin',
    },
    staff: {
      icon: Briefcase,
      color: 'blue',
      text: 'Staff',
    },
    customer: {
      icon: ShoppingCart,
      color: 'yellow',
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
      className="flex items-center justify-center gap-1 px-3"
    >
      {text}
    </Badge>
  );
};

RoleBadge.propTypes = {
  role: PropTypes.string,
};

export default RoleBadge;
