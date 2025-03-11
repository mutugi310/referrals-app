import type { Agent } from "@/types/agent";
import { VipBadge } from "./vip-badge";
import { getVipBadge, countTotalRecruits } from "@/utils/vip";

interface TreeNodeProps {
  node: Agent;
}

export function TreeNode({ node }: TreeNodeProps) {
  const directRecruits = node.referrals.length;
  const totalRecruits = countTotalRecruits(node);
  const vipBadge = getVipBadge(totalRecruits, directRecruits);

  return (
    <ul className="ml-4 border-l-2 border-border pl-2">
      <li className="my-2 p-2 rounded shadow-sm">
        <div className="flex items-center gap-2">
          <span className="font-semibold">
            {node.firstName} ({node.id})
          </span>
          {vipBadge && (
            <VipBadge
              vipLevel={vipBadge}
              directRecruits={directRecruits}
              totalRecruits={totalRecruits}
            />
          )}
        </div>
        {node.referrals.length > 0 && (
          <div className="mt-2">
            {node.referrals.map((child) => (
              <div key={child.id}>
                <TreeNode node={child} />
              </div>
            ))}
          </div>
        )}
      </li>
    </ul>
  );
}
