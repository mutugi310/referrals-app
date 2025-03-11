import { Badge } from "@/components/ui/badge";

export function VipLegend() {
  return (
    <div className="mb-6 p-4 border rounded-md">
      <h3 className="text-lg font-bold mb-2">VIP Levels</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Note: All VIP levels require a minimum of 5 direct recruits to qualify
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
        <div className="flex items-center gap-2">
          <Badge className="bg-red-600">VIP1</Badge>
          <span>5+ direct recruits</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-orange-600">VIP2</Badge>
          <span>31-100 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-yellow-600">VIP3</Badge>
          <span>101-200 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-green-600">VIP4</Badge>
          <span>201-350 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-teal-600">VIP5</Badge>
          <span>351-500 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-cyan-600">VIP6</Badge>
          <span>501-900 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-blue-600">VIP7</Badge>
          <span>901-1600 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-indigo-600">VIP8</Badge>
          <span>1601-3500 total network*</span>
        </div>
        <div className="flex items-center gap-2">
          <Badge className="bg-purple-600">VIP9</Badge>
          <span>3501+ total network*</span>
        </div>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        * Total network includes all direct and indirect recruits, but only
        counts if you have 5+ direct recruits
      </p>
    </div>
  );
}
