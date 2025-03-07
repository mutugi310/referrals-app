"use client";
// pages/tree.tsx
import { useState, ChangeEvent } from "react";
import * as XLSX from "xlsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "../ui/button";

interface Agent {
  id: string;
  firstName: string;
  referrals: Agent[];
}

interface FlatAgent {
  id: string;
  firstName: string;
  parentId: string | null;
}

const TreePage = () => {
  const [tree, setTree] = useState<Agent | null>(null);
  const [pioneerId, setPioneerId] = useState("");
  const [pioneerFirstName, setPioneerFirstName] = useState("");
  const [recruiterId, setRecruiterId] = useState("");
  const [newAgentId, setNewAgentId] = useState("");
  const [newAgentFirstName, setNewAgentFirstName] = useState("");
  const [removeAgentId, setRemoveAgentId] = useState("");
  const [excelFormat, setExcelFormat] = useState("xlsx");

  // Find an agent and its parent in the tree.
  const findAgentWithParent = (
    node: Agent,
    id: string,
    parentId: string | null = null
  ): { parentId: string | null; node: Agent } | null => {
    if (node.id === id) return { parentId, node };
    for (let child of node.referrals) {
      const result = findAgentWithParent(child, id, node.id);
      if (result) return result;
    }
    return null;
  };

  // Recursive function to add a new agent under the correct recruiter.
  const addAgent = (
    node: Agent,
    recruiterId: string,
    newAgent: Agent
  ): boolean => {
    if (node.id === recruiterId) {
      node.referrals.push(newAgent);
      return true;
    }
    for (let child of node.referrals) {
      if (addAgent(child, recruiterId, newAgent)) return true;
    }
    return false;
  };

  // Recursive function to remove an agent by id from the tree.
  const removeAgent = (node: Agent, id: string): boolean => {
    const index = node.referrals.findIndex((child) => child.id === id);
    if (index !== -1) {
      node.referrals.splice(index, 1);
      return true;
    }
    for (let child of node.referrals) {
      if (removeAgent(child, id)) return true;
    }
    return false;
  };

  // Flatten the tree into rows for Excel export.
  const flattenTree = (
    node: Agent,
    parentId: string | null = null,
    result: FlatAgent[] = []
  ) => {
    result.push({ id: node.id, firstName: node.firstName, parentId });
    node.referrals.forEach((child) => flattenTree(child, node.id, result));
    return result;
  };

  // Rebuild the tree from flat Excel data.
  const buildTreeFromFlatData = (data: FlatAgent[]): Agent | null => {
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

  const handleAddAgent = () => {
    if (!tree) {
      alert("Tree not initialized");
      return;
    }
    // Check if the new agent's ID already exists.
    const existing = findAgentWithParent(tree, newAgentId);
    if (existing) {
      const parentInfo = existing.parentId
        ? `under agent ID ${existing.parentId}`
        : "at the root";
      alert(
        `An agent with ID ${newAgentId} already exists ${parentInfo}. Please confirm the ID.`
      );
      return;
    }
    // Verify recruiter exists.
    if (!findAgentWithParent(tree, recruiterId)) {
      alert("Recruiter not found in the tree.");
      return;
    }
    const newAgent: Agent = {
      id: newAgentId,
      firstName: newAgentFirstName,
      referrals: [],
    };
    const success = addAgent(tree, recruiterId, newAgent);
    if (!success) {
      alert("Recruiter not found");
    } else {
      setTree({ ...tree });
      setRecruiterId("");
      setNewAgentId("");
      setNewAgentFirstName("");
    }
  };

  const handlePioneerCreation = () => {
    if (!pioneerId || !pioneerFirstName) {
      alert("Please provide both ID and First Name for the pioneer agent.");
      return;
    }
    const pioneer: Agent = {
      id: pioneerId,
      firstName: pioneerFirstName,
      referrals: [],
    };
    setTree(pioneer);
    setPioneerId("");
    setPioneerFirstName("");
  };

  const handleRemoveAgent = () => {
    if (!tree) {
      alert("Tree not initialized");
      return;
    }
    if (tree.id === removeAgentId) {
      alert("Cannot remove the pioneer agent.");
      return;
    }
    const success = removeAgent(tree, removeAgentId);
    if (!success) {
      alert("Agent not found");
    } else {
      setTree({ ...tree });
      setRemoveAgentId("");
    }
  };

  // JSON upload for existing tree.
  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setTree(data);
        } catch (err) {
          console.error("Invalid JSON file");
        }
      };
      reader.readAsText(file);
    }
  };

  // Excel upload for existing tree.
  const handleExcelUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = e.target?.result;
          if (data) {
            const workbook = XLSX.read(data, { type: "binary" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData: FlatAgent[] = XLSX.utils.sheet_to_json(worksheet, {
              raw: false,
            });
            const newTree = buildTreeFromFlatData(jsonData);
            if (newTree) {
              setTree(newTree);
            } else {
              alert("Invalid tree data in Excel file.");
            }
          }
        } catch (err) {
          console.error("Error reading Excel file", err);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadJSON = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(tree, null, 2)], {
      type: "application/json",
    });
    element.href = URL.createObjectURL(file);
    element.download = "tree.json";
    document.body.appendChild(element);
    element.click();
  };

  const handleDownloadExcel = () => {
    if (!tree) {
      alert("Tree not initialized");
      return;
    }
    const data = flattenTree(tree, null, []);
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Tree");
    XLSX.writeFile(workbook, `tree.${excelFormat}`, {
      bookType: excelFormat as any,
    });
  };

  const renderTree = (node: Agent) => (
    <ul className="ml-4 border-l-2 border-border pl-2">
      <li className="my-2 p-2  rounded shadow-sm">
        <span className="font-semibold">
          {node.firstName} ({node.id})
        </span>
        {node.referrals.length > 0 && (
          <div className="mt-2">
            {node.referrals.map((child) => (
              <div key={child.id}>{renderTree(child)}</div>
            ))}
          </div>
        )}
      </li>
    </ul>
  );

  return (
    <div className="p-4 max-w-full mx-auto space-y-8">
      {/* Initialize tree: Upload or create pioneer */}
      {!tree && (
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Initialize Your Referral Tree
          </h2>
          <h3 className=" py-3 font-bold align-middle text-center">
            Upload Existing Tree file
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="flex flex-col items-center gap-1 sm:flex-row ">
              <label htmlFor="upload-json">Upload Tree as JSON</label>
              <input
                type="file"
                accept="application/json"
                onChange={handleUpload}
                className="border p-2"
                id="json-upload"
                aria-label="Upload JSON file"
                placeholder="Upload from JSON"
              />
            </div>

            <div className="flex flex-col items-center gap-1 sm:flex-row ">
              <label htmlFor="excel-upload">Upload Tree as Excel</label>
              <input
                type="file"
                accept=".xlsx, .xlsm, .xlsb, .xltx"
                onChange={handleExcelUpload}
                className="border p-2"
                id="excel-upload"
                aria-label="Upload Excel file"
                placeholder="Upload from Excel"
              />
            </div>
          </div>
          <div className=" text-2xl font-bold align-middle text-center p-4">
            OR
          </div>
          <h3 className=" pb-3 font-bold align-middle text-center">
            Start with Pioneer/Head of the Tree
          </h3>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Enter Pioneer Agent ID"
              value={pioneerId}
              onChange={(e) => setPioneerId(e.target.value)}
              className="border p-2"
              aria-label="Pioneer Agent ID"
            />
            <input
              type="text"
              placeholder="Enter Pioneer First Name"
              value={pioneerFirstName}
              onChange={(e) => setPioneerFirstName(e.target.value)}
              className="border p-2"
              aria-label="Pioneer First Name"
            />
            <Button onClick={handlePioneerCreation}> Create Pioneer</Button>
          </div>
        </div>
      )}

      {tree && (
        <>
          {/* Shadcn's Tabs to toggle between Add and Remove Recruit forms */}
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
                  <Button variant="secondary" onClick={handleAddAgent}>
                    {" "}
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
                <Button variant="destructive" onClick={handleRemoveAgent}>
                  {" "}
                  Remove Agent
                </Button>
              </div>
            </TabsContent>
          </Tabs>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-4">Download Your Tree</h2>
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
              <Button variant="outline" onClick={handleDownloadJSON}>
                {" "}
                Download Tree as JSON
              </Button>

              <div className="flex items-center space-x-2">
                <select
                  value={excelFormat}
                  onChange={(e) => setExcelFormat(e.target.value)}
                  className="border p-2"
                >
                  <option value="xlsx">.xlsx</option>
                  <option value="xlsm">.xlsm</option>
                  <option value="xlsb">.xlsb</option>
                  <option value="xltx">.xltx</option>
                </select>
                <Button variant="outline" onClick={handleDownloadExcel}>
                  {" "}
                  Download Tree as Excel
                </Button>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Referral Tree</h2>
            <div className="overflow-auto">{renderTree(tree)}</div>
          </div>
        </>
      )}
    </div>
  );
};

export default TreePage;
