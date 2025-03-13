
// Initial rewards points system

// Points conversion rate (1 point = $0.01)
export const POINTS_VALUE = 0.01;
export const POINTS_EARNING_RATE = 10; // Earn 10 points per $1 spent

export interface RewardPoints {
  available: number;
  pending: number;
  history: PointsTransaction[];
  lifetimeEarned: number;
}

export interface PointsTransaction {
  id: string;
  date: string;
  amount: number;
  type: 'earned' | 'redeemed' | 'expired';
  description: string;
}

// Mock user points data - in a real app, this would come from a database
export const getUserPoints = (): RewardPoints => {
  // Try to get from localStorage first
  const storedPoints = localStorage.getItem('userRewardPoints');
  if (storedPoints) {
    return JSON.parse(storedPoints);
  }

  // Default initial points
  const initialPoints: RewardPoints = {
    available: 500, // $5.00 worth of points
    pending: 0,
    history: [
      {
        id: '1',
        date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days ago
        amount: 500,
        type: 'earned',
        description: 'Welcome bonus'
      }
    ],
    lifetimeEarned: 500
  };

  // Store in localStorage
  localStorage.setItem('userRewardPoints', JSON.stringify(initialPoints));
  return initialPoints;
};

// Calculate how many points would be earned for a purchase
export const calculatePointsEarned = (subtotal: number): number => {
  return Math.floor(subtotal * POINTS_EARNING_RATE);
};

// Calculate maximum points that can be redeemed based on available points and order total
export const calculateMaxRedeemablePoints = (
  availablePoints: number,
  orderTotal: number
): number => {
  const pointsValueInDollars = availablePoints * POINTS_VALUE;
  // Don't allow redeeming more than 50% of the order total
  const maxRedeemableValue = orderTotal * 0.5;
  
  if (pointsValueInDollars <= maxRedeemableValue) {
    return availablePoints;
  } else {
    return Math.floor(maxRedeemableValue / POINTS_VALUE);
  }
};

// Calculate discount amount based on points redeemed
export const calculatePointsDiscount = (pointsToRedeem: number): number => {
  return pointsToRedeem * POINTS_VALUE;
};

// Save points transaction to history
export const savePointsTransaction = (
  points: RewardPoints,
  transaction: Omit<PointsTransaction, 'id' | 'date'>
): RewardPoints => {
  const newTransaction: PointsTransaction = {
    ...transaction,
    id: Date.now().toString(),
    date: new Date().toISOString()
  };

  const updatedPoints = { ...points };

  if (transaction.type === 'earned') {
    updatedPoints.available += transaction.amount;
    updatedPoints.lifetimeEarned += transaction.amount;
  } else if (transaction.type === 'redeemed') {
    updatedPoints.available -= transaction.amount;
  }

  updatedPoints.history = [newTransaction, ...updatedPoints.history];
  
  // Persist to localStorage
  localStorage.setItem('userRewardPoints', JSON.stringify(updatedPoints));
  
  return updatedPoints;
};
