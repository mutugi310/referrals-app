import type { Agent, FlatAgent } from "../types/agent";

export const findAgentWithParent = (
  node: Agent,
  id: string,
  parentId: string | null = null
): { parentId: string | null; node: Agent } | null => {
  if (node.id === id) return { parentId, node };
  for (const child of node.referrals) {
    const result = findAgentWithParent(child, id, node.id);
    if (result) return result;
  }
  return null;
};

export const addAgent = (
  node: Agent,
  recruiterId: string,
  newAgent: Agent
): boolean => {
  if (node.id === recruiterId) {
    node.referrals.push(newAgent);
    return true;
  }
  for (const child of node.referrals) {
    if (addAgent(child, recruiterId, newAgent)) return true;
  }
  return false;
};

export const removeAgent = (node: Agent, id: string): boolean => {
  const index = node.referrals.findIndex((child) => child.id === id);
  if (index !== -1) {
    node.referrals.splice(index, 1);
    return true;
  }
  for (const child of node.referrals) {
    if (removeAgent(child, id)) return true;
  }
  return false;
};

export const flattenTree = (
  node: Agent,
  parentId: string | null = null,
  result: FlatAgent[] = []
): FlatAgent[] => {
  result.push({ id: node.id, firstName: node.firstName, parentId });
  node.referrals.forEach((child) => flattenTree(child, node.id, result));
  return result;
};

export const buildTreeFromFlatData = (data: FlatAgent[]): Agent | null => {
  const nodes: Record<string, Agent> = {};
  let root: Agent | null = null;
  data.forEach((row) => {
    nodes[row.id] = { id: row.id, firstName: row.firstName, referrals: [] };
  });
  data.forEach((row) => {
    if (row.parentId) {
      nodes[row.parentId]?.referrals.push(nodes[row.id]);
    } else {
      root = nodes[row.id];
    }
  });
  return root;
};
