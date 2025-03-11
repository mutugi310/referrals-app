import { Button } from "@/components/ui/button";
type ExcelFormat = "xlsx" | "xlsm" | "xlsb" | "xltx";
interface TreeDownloadProps {
  excelFormat: ExcelFormat;
  setExcelFormat: (value: ExcelFormat) => void;
  onDownloadJSON: () => void;
  onDownloadExcel: () => void;
}

export function TreeDownload({
  excelFormat,
  setExcelFormat,
  onDownloadJSON,
  onDownloadExcel,
}: TreeDownloadProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Download Your Tree</h2>
      <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
        <Button
          variant="outline"
          className="cursor-pointer"
          onClick={onDownloadJSON}
        >
          Download Tree as JSON
        </Button>

        <div className="flex items-center space-x-2">
          <select
            value={excelFormat}
            onChange={(e) => setExcelFormat(e.target.value as ExcelFormat)}
            className="border p-2"
          >
            <option value="xlsx">.xlsx</option>
            <option value="xlsm">.xlsm</option>
            <option value="xlsb">.xlsb</option>
            <option value="xltx">.xltx</option>
          </select>
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={onDownloadExcel}
          >
            Download Tree as Excel
          </Button>
        </div>
      </div>
    </div>
  );
}
