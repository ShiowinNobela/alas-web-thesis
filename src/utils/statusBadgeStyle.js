export const getStatusStyle = (status) => {
  const baseStyle = 'px-2 py-1.5 rounded-2xl text-sm font-heading capitalize';

  const colorMap = {
    pending: 'bg-orange-200 text-orange-900',
    processing: 'bg-yellow-200 text-yellow-700',
    shipping: 'bg-green-200 text-green-800',
    delivered: 'bg-blue-200 text-blue-800',
    returned: 'bg-pink-200 text-pink-800',
    refunded: 'bg-violet-200 text-violet-800',
    cancelled: 'bg-red-300 text-red-800',
  };

  return `${baseStyle} ${colorMap[status] || 'bg-gray-200 text-gray-800'}`;
};
