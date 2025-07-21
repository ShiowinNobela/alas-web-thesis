/**
 * Calculate coupon discount based on coupon type and cart total
 * @param {Object} coupon - The coupon object with type, value, etc.
 * @param {number} cartTotal - The total cart amount before discount
 * @returns {Object} - Object containing discount amount and final total
 */
export const calculateCouponDiscount = (coupon, cartTotal) => {
  if (!coupon || !cartTotal) {
    return {
      discountAmount: 0,
      finalTotal: cartTotal || 0,
      isValid: false
    };
  }

  let discountAmount = 0;
  const numericCartTotal = parseFloat(cartTotal);

  switch (coupon.type) {
    case 'FIXED':
      // Fixed amount discount
      discountAmount = parseFloat(coupon.amount || coupon.value || 0);
      break;
      
    case 'PERCENTAGE':
      // Percentage discount
      const percentage = parseFloat(coupon.amount || coupon.value || 0);
      discountAmount = (numericCartTotal * percentage) / 100;
      break;
      
    default:
      // Default to fixed amount if type is unclear
      discountAmount = parseFloat(coupon.amount || coupon.value || 0);
      break;
  }

  // Ensure discount doesn't exceed cart total
  discountAmount = Math.min(discountAmount, numericCartTotal);
  discountAmount = Math.max(discountAmount, 0); // Ensure non-negative

  const finalTotal = numericCartTotal - discountAmount;

  return {
    discountAmount: parseFloat(discountAmount.toFixed(2)),
    finalTotal: parseFloat(finalTotal.toFixed(2)),
    isValid: true,
    originalTotal: numericCartTotal
  };
};

/**
 * Preview coupon discount without applying it
 * @param {Object} coupon - The coupon object with type, value, etc.
 * @param {number} cartTotal - The total cart amount before discount
 * @returns {Object} - Preview calculation for UI display
 */
export const previewCouponDiscount = (coupon, cartTotal) => {
  const calculation = calculateCouponDiscount(coupon, cartTotal);
  
  return {
    ...calculation,
    preview: {
      originalTotal: formatCurrency(cartTotal),
      discountAmount: formatCurrency(calculation.discountAmount),
      finalTotal: formatCurrency(calculation.finalTotal),
      savings: formatCurrency(calculation.discountAmount),
      formula: `₱${cartTotal.toFixed(2)} - ₱${calculation.discountAmount.toFixed(2)} = ₱${calculation.finalTotal.toFixed(2)}`
    }
  };
};

/**
 * Format currency for display
 * @param {number} amount - The amount to format
 * @returns {string} - Formatted currency string
 */
export const formatCurrency = (amount) => {
  return `₱${parseFloat(amount).toFixed(2)}`;
};
