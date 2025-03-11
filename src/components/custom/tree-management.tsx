import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TreeManagementProps {
  recruiterId: string;
  setRecruiterId: (value: string) => void;
  newAgentId: string;
  setNewAgentId: (value: string) => void;
  newAgentFirstName: string;
  setNewAgentFirstName: (value: string) => void;
  onAddAgent: () => void;
  removeAgentId: string;
  setRemoveAgentId: (value: string) => void;
  onRemoveAgent: () => void;
}

export function TreeManagement({
  recruiterId,
  setRecruiterId,
  newAgentId,
  setNewAgentId,
  newAgentFirstName,
  setNewAgentFirstName,
  onAddAgent,
  removeAgentId,
  setRemoveAgentId,
  onRemoveAgent,
}: TreeManagementProps) {
  return (
    <Tabs defaultValue="add">
      <TabsList>
        <TabsTrigger value="add">Add a New Recruit</TabsTrigger>
        <TabsTrigger value="remove">Remove a Recruit</TabsTrigger>
      </TabsList>
      <TabsContent value="add">
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
            <input
              type="text"
              placeholder="Recruiter ID"
              value={recruiterId}
              onChange={(e) => setRecruiterId(e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              type="text"
              placeholder="New Agent ID"
              value={newAgentId}
              onChange={(e) => setNewAgentId(e.target.value)}
              className="border p-2 flex-1"
            />
            <input
              type="text"
              placeholder="New Agent First Name"
              value={newAgentFirstName}
              onChange={(e) => setNewAgentFirstName(e.target.value)}
              className="border p-2 flex-1"
            />
            <Button variant="secondary" onClick={onAddAgent}>
              Add Agent
            </Button>
          </div>
        </div>
      </TabsContent>
      <TabsContent value="remove">
        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <input
            type="text"
            placeholder="Agent ID to remove"
            value={removeAgentId}
            onChange={(e) => setRemoveAgentId(e.target.value)}
            className="border p-2 flex-1"
          />
          <Button variant="destructive" onClick={onRemoveAgent}>
            Remove Agent
          </Button>
        </div>
      </TabsContent>
    </Tabs>
  );
}
