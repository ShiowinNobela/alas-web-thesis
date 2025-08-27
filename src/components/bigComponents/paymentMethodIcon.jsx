import PropTypes from 'prop-types';
import GCashLogo from '@/assets/GCash_logo.svg';
import MayaLogo from '@/assets/Maya_logo.svg';
import { Landmark } from 'lucide-react';

const logos = {
  gcash: {
    type: 'svg',
    src: GCashLogo,
  },
  maya: {
    type: 'svg',
    src: MayaLogo,
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

  return asset.type === 'svg' ? (
    <img
      src={asset.src}
      alt={method}
      className="inline h-4 w-auto align-middle"
    />
  ) : (
    <asset.Icon className="text-primary inline h-8 w-5 align-middle" />
  );
}

PaymentMethodIcon.propTypes = {
  method: PropTypes.string.isRequired,
};
