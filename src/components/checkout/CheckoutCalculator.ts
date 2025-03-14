
/**
 * Calculate points discount based on reward points and order subtotal
 */
export const calculatePointsDiscount = (
  useRewardPoints: boolean,
  rewardPoints: number,
  subtotal: number
): number => {
  if (!useRewardPoints) return 0;
  
  // Maximum discount is 30% of order subtotal
  const maxDiscount = subtotal * 0.3;
  // Points value conversion (1 point = $0.01)
  const pointsValue = rewardPoints * 0.01;
  
  return Math.min(pointsValue, maxDiscount);
};

/**
 * Calculate the total amount after applying discounts
 */
export const calculateTotal = (
  subtotal: number,
  shipping: number,
  pointsDiscount: number
): number => {
  return subtotal + shipping - pointsDiscount;
};
