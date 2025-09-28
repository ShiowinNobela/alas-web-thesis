import PropTypes from 'prop-types';
import { Landmark } from 'lucide-react';

const logos = {
  gcash: {
    type: 'img',
    src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1759069559/GCash_logo_to7sgw.svg',
  },
  maya: {
    type: 'img',
    src: 'https://res.cloudinary.com/drq2wzvmo/image/upload/v1759069559/Maya_logo_af9qst.svg',
  },
  bank_transfer: {
    type: 'icon',
    Icon: Landmark,
  },
};

export default function PaymentMethodIcon({ method }) {
  const normalized = method?.toLowerCase();
  const asset = logos[normalized];

  if (!asset) {
    return <span>{method}</span>;
  }

  if (asset.type === 'img') {
    return <img src={asset.src} alt={method} className="inline h-4 w-auto align-middle" loading="lazy" />;
  }

  const Icon = asset.Icon;
  return <Icon className="text-primary inline h-8 w-5 align-middle" />;
}

PaymentMethodIcon.propTypes = {
  method: PropTypes.string.isRequired,
};
