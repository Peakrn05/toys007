// Loyalty tiers — bonusRate is extra points earned per $1 spent
export const LOYALTY_TIERS = [
  { name: "Black Member",    min: 20000, bonusRate: 0.5,  gradient: "linear-gradient(135deg, #232526 0%, #414345 100%)" },
  { name: "Platinum Member", min: 10000, bonusRate: 0.25, gradient: "linear-gradient(135deg, #757F9A 0%, #D7DDE8 100%)" },
  { name: "Gold Member",     min: 5000,  bonusRate: 0,    gradient: "linear-gradient(135deg, #BF953F 0%, #FCF6BA 100%)" },
  { name: "Member",          min: 0,     bonusRate: 0,    gradient: "linear-gradient(135deg, #FF1744 0%, #FF6D00 100%)" },
] as const;

export function getLoyaltyTier(points: number) {
  return LOYALTY_TIERS.find((t) => points >= t.min) ?? LOYALTY_TIERS[LOYALTY_TIERS.length - 1];
}

export function getNextTier(points: number) {
  return [...LOYALTY_TIERS].reverse().find((t) => points < t.min);
}
