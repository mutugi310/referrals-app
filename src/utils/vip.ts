import { VipLevel } from "../types/agent";
import type { Agent } from "../types/agent";

export const getVipBadge = (
  totalRecruits: number,
  directRecruits: number
): VipLevel | null => {
  // First check if agent qualifies for VIP1 (minimum requirement)
  if (directRecruits < 5) {
    return null; // Not eligible for any VIP level without 5 direct recruits
  }

  // Define VIP levels
  const vipLevels: VipLevel[] = [
    { level: 9, color: "bg-purple-600 hover:bg-purple-700", minRecruits: 3501 },
    { level: 8, color: "bg-indigo-600 hover:bg-indigo-700", minRecruits: 1601 },
    { level: 7, color: "bg-blue-600 hover:bg-blue-700", minRecruits: 901 },
    { level: 6, color: "bg-cyan-600 hover:bg-cyan-700", minRecruits: 501 },
    { level: 5, color: "bg-teal-600 hover:bg-teal-700", minRecruits: 351 },
    { level: 4, color: "bg-green-600 hover:bg-green-700", minRecruits: 201 },
    { level: 3, color: "bg-yellow-600 hover:bg-yellow-700", minRecruits: 101 },
    { level: 2, color: "bg-orange-600 hover:bg-orange-700", minRecruits: 31 },
  ];

  // Check for VIP levels 2-9 based on total recruits (only if they have VIP1)
  for (const vip of vipLevels) {
    if (totalRecruits >= vip.minRecruits) {
      return vip;
    }
  }

  // If they have 5+ direct recruits but don't qualify for higher levels, they are VIP1
  return { level: 1, color: "bg-red-600 hover:bg-red-700", minRecruits: 5 };
};

export const countTotalRecruits = (node: Agent): number => {
  if (!node.referrals.length) return 0;
  return (
    node.referrals.length +
    node.referrals.reduce((sum, child) => sum + countTotalRecruits(child), 0)
  );
};
