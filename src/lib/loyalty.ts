// Loyalty tiers — bonusRate is extra points earned per $1 spent
export const LOYALTY_TIERS = [
  { name: "Black Member",    min: 20000, bonusRate: 0.5 },
  { name: "Platinum Member", min: 10000, bonusRate: 0.25 },
  { name: "Gold Member",     min: 5000,  bonusRate: 0 },
  { name: "Member",          min: 0,     bonusRate: 0 },
] as const;

export function getLoyaltyTier(points: number) {
  return LOYALTY_TIERS.find((t) => points >= t.min) ?? LOYALTY_TIERS[LOYALTY_TIERS.length - 1];
}

export function getNextTier(points: number) {
  return [...LOYALTY_TIERS].reverse().find((t) => points < t.min);
}
