"use client";

import { TreeInitialization } from "./tree-initialization";
import { TreeManagement } from "./tree-management";
import { TreeDownload } from "./tree-download";
import { TreeNode } from "./tree-node";
import { VipLegend } from "./vip-legend";
import { useTree } from "@/hooks/use-tree";

export default function TreePage() {
  const {
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
  } = useTree();

  return (
    <div className="p-4 max-w-full mx-auto space-y-8">
      {!tree && (
        <TreeInitialization
          onUpload={handleUpload}
          onExcelUpload={handleExcelUpload}
          pioneerId={pioneerId}
          setPioneerId={setPioneerId}
          pioneerFirstName={pioneerFirstName}
          setPioneerFirstName={setPioneerFirstName}
          onPioneerCreate={handlePioneerCreation}
        />
      )}

      {tree && (
        <>
          <TreeManagement
            recruiterId={recruiterId}
            setRecruiterId={setRecruiterId}
            newAgentId={newAgentId}
            setNewAgentId={setNewAgentId}
            newAgentFirstName={newAgentFirstName}
            setNewAgentFirstName={setNewAgentFirstName}
            onAddAgent={handleAddAgent}
            removeAgentId={removeAgentId}
            setRemoveAgentId={setRemoveAgentId}
            onRemoveAgent={handleRemoveAgent}
          />

          <TreeDownload
            excelFormat={excelFormat}
            setExcelFormat={setExcelFormat}
            onDownloadJSON={handleDownloadJSON}
            onDownloadExcel={handleDownloadExcel}
          />

          <div>
            <h2 className="text-2xl font-bold mb-4">Referral Tree</h2>
            <VipLegend />
            <div className="overflow-auto">
              {tree && <TreeNode node={tree} />}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
