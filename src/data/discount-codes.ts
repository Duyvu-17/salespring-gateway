
export interface DiscountCode {
  id: string;
  code: string;
  description: string;
  discountPercentage: number;
  minOrderAmount: number;
  maxDiscountAmount: number;
  validUntil: Date;
  isActive: boolean;
}

export const discountCodes: DiscountCode[] = [
  {
    id: "1",
    code: "WELCOME10",
    description: "10% off your first order",
    discountPercentage: 10,
    minOrderAmount: 0,
    maxDiscountAmount: 50,
    validUntil: new Date("2023-12-31"),
    isActive: true
  },
  {
    id: "2",
    code: "SUMMER20",
    description: "20% off summer collection",
    discountPercentage: 20,
    minOrderAmount: 50,
    maxDiscountAmount: 100,
    validUntil: new Date("2023-09-30"),
    isActive: true
  },
  {
    id: "3",
    code: "FLASH25",
    description: "25% off flash sale",
    discountPercentage: 25,
    minOrderAmount: 100,
    maxDiscountAmount: 150,
    validUntil: new Date("2023-08-15"),
    isActive: true
  },
  {
    id: "4",
    code: "NEWUSER15",
    description: "15% off for new users",
    discountPercentage: 15,
    minOrderAmount: 0,
    maxDiscountAmount: 75,
    validUntil: new Date("2023-12-31"),
    isActive: true
  },
  {
    id: "5",
    code: "FREEDEL",
    description: "Free delivery on all orders",
    discountPercentage: 0,
    minOrderAmount: 0,
    maxDiscountAmount: 10,
    validUntil: new Date("2023-10-31"),
    isActive: true
  }
];

export const getDiscountCodes = (): DiscountCode[] => {
  return discountCodes.filter(code => code.isActive && code.validUntil > new Date());
};

export const validateDiscountCode = (code: string): DiscountCode | null => {
  const foundCode = discountCodes.find(
    dc => dc.code === code && dc.isActive && dc.validUntil > new Date()
  );
  return foundCode || null;
};

export const calculateDiscount = (
  subtotal: number,
  discountCode: DiscountCode | null
): { discountAmount: number; discountedTotal: number } => {
  if (!discountCode || subtotal < discountCode.minOrderAmount) {
    return { discountAmount: 0, discountedTotal: subtotal };
  }

  let discountAmount = subtotal * (discountCode.discountPercentage / 100);
  
  // Apply maximum discount cap if applicable
  if (discountAmount > discountCode.maxDiscountAmount) {
    discountAmount = discountCode.maxDiscountAmount;
  }
  
  const discountedTotal = subtotal - discountAmount;
  
  return {
    discountAmount,
    discountedTotal
  };
};
