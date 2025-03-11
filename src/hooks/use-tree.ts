"use client";

import { useState, type ChangeEvent } from "react";
import * as XLSX from "xlsx";
import type { Agent, FlatAgent } from "../types/agent";
import {
  findAgentWithParent,
  addAgent as addAgentToTree,
  removeAgent as removeAgentFromTree,
  flattenTree,
  buildTreeFromFlatData,
} from "../utils/tree";

type ExcelFormat = "xlsx" | "xlsm" | "xlsb" | "xltx";

export function useTree() {
  const [tree, setTree] = useState<Agent | null>(null);
  const [pioneerId, setPioneerId] = useState("");
  const [pioneerFirstName, setPioneerFirstName] = useState("");
  const [recruiterId, setRecruiterId] = useState("");
  const [newAgentId, setNewAgentId] = useState("");
  const [newAgentFirstName, setNewAgentFirstName] = useState("");
  const [removeAgentId, setRemoveAgentId] = useState("");
  const [excelFormat, setExcelFormat] = useState<ExcelFormat>("xlsx");

  const handleAddAgent = () => {
    if (!tree) {
      alert("Tree not initialized");
      return;
    }
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
    if (!findAgentWithParent(tree, recruiterId)) {
      alert("Recruiter not found in the tree.");
      return;
    }
    const newAgent: Agent = {
      id: newAgentId,
      firstName: newAgentFirstName,
      referrals: [],
    };
    const success = addAgentToTree(tree, recruiterId, newAgent);
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
    const success = removeAgentFromTree(tree, removeAgentId);
    if (!success) {
      alert("Agent not found");
    } else {
      setTree({ ...tree });
      setRemoveAgentId("");
    }
  };

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          setTree(data);
        } catch (err: unknown) {
          console.error("Invalid JSON file", err);
        }
      };
      reader.readAsText(file);
    }
  };

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
        } catch {
          console.error("Error reading Excel file");
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDownloadJSON = () => {
    if (!tree) return;
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
      bookType: excelFormat as XLSX.BookType,
    });
  };

  return {
    tree,
    pioneerId,
    setPioneerId,
    pioneerFirstName,
    setPioneerFirstName,
    recruiterId,
    setRecruiterId,
    newAgentId,
    setNewAgentId,
    newAgentFirstName,
    setNewAgentFirstName,
    removeAgentId,
    setRemoveAgentId,
    excelFormat,
    setExcelFormat,
    handleAddAgent,
    handlePioneerCreation,
    handleRemoveAgent,
    handleUpload,
    handleExcelUpload,
    handleDownloadJSON,
    handleDownloadExcel,
  };
}
