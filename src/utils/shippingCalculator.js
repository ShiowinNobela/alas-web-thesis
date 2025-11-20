export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;
  return distance;
};

export const calculateShippingFee = (distance) => {
  if (distance <= 5) return 60;    // Zone A
  if (distance <= 15) return 110;  // Zone B
  if (distance <= 40) return 180;  // Zone C
  return null; // Beyond delivery range
};

export const getZoneName = (distance) => {
  if (distance <= 5) return 'Zone A — City / central';
  if (distance <= 15) return 'Zone B — Suburban / nearby towns';
  if (distance <= 40) return 'Zone C — Outskirts / provincial';
  return 'Beyond delivery range';
};