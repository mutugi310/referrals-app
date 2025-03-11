export interface Agent {
  id: string;
  firstName: string;
  referrals: Agent[];
}

export interface FlatAgent {
  id: string;
  firstName: string;
  parentId: string | null;
}

export interface VipLevel {
  level: number;
  color: string;
  minRecruits: number;
}
