import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Crown } from "lucide-react";
import type { VipLevel } from "@/types/agent";

interface VipBadgeProps {
  vipLevel: VipLevel;
  directRecruits: number;
  totalRecruits: number;
}

export function VipBadge({
  vipLevel,
  directRecruits,
  totalRecruits,
}: VipBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge
            className={`${vipLevel.color} text-white flex items-center gap-1`}
          >
            <Crown className="h-3 w-3" />
            VIP{vipLevel.level}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p>Direct Recruits: {directRecruits}</p>
          <p>Total Network: {totalRecruits}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
