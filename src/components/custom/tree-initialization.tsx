import { Button } from "@/components/ui/button";
import type { ChangeEvent } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface TreeInitializationProps {
  onUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  onExcelUpload: (event: ChangeEvent<HTMLInputElement>) => void;
  pioneerId: string;
  setPioneerId: (value: string) => void;
  pioneerFirstName: string;
  setPioneerFirstName: (value: string) => void;
  onPioneerCreate: () => void;
}

export function TreeInitialization({
  onUpload,
  onExcelUpload,
  pioneerId,
  setPioneerId,
  pioneerFirstName,
  setPioneerFirstName,
  onPioneerCreate,
}: TreeInitializationProps) {
  return (
    <div className="container mb-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Initialize Your Referral Tree
      </h2>
      <Card>
        <CardTitle className="flex justify-center">
          {" "}
          Upload Existing Tree file
        </CardTitle>
        <CardDescription></CardDescription>
        <CardContent>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <label htmlFor="json-upload" className="text-sm">
                Upload Tree as JSON
              </label>
              <input
                type="file"
                accept="application/json"
                onChange={onUpload}
                className="border p-2"
                id="json-upload"
                aria-label="Upload JSON file"
                placeholder="Upload from JSON"
              />
            </div>

            <div className="flex flex-col items-center gap-1 sm:flex-row">
              <label htmlFor="excel-upload" className="text-sm">
                Upload Tree as Excel
              </label>
              <input
                type="file"
                accept=".xlsx, .xlsm, .xlsb, .xltx"
                onChange={onExcelUpload}
                className="border p-2"
                id="excel-upload"
                aria-label="Upload Excel file"
                placeholder="Upload from Excel"
              />
            </div>
          </div>
        </CardContent>
      </Card>
      {/*  <h3 className="py-3 font-bold align-middle text-center">
        Upload Existing Tree file
      </h3>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-4">
        <div className="flex flex-col items-center gap-1 sm:flex-row">
          <label htmlFor="json-upload" className="text-sm">
            Upload Tree as JSON
          </label>
          <input
            type="file"
            accept="application/json"
            onChange={onUpload}
            className="border p-2"
            id="json-upload"
            aria-label="Upload JSON file"
            placeholder="Upload from JSON"
          />
        </div>

        <div className="flex flex-col items-center gap-1 sm:flex-row">
          <label htmlFor="excel-upload" className="text-sm">
            Upload Tree as Excel
          </label>
          <input
            type="file"
            accept=".xlsx, .xlsm, .xlsb, .xltx"
            onChange={onExcelUpload}
            className="border p-2"
            id="excel-upload"
            aria-label="Upload Excel file"
            placeholder="Upload from Excel"
          />
        </div>
      </div> */}
      <div className="text-2xl font-bold align-middle text-center p-4">OR</div>
      <Card>
        <CardTitle className="flex justify-center">
          Start with Pioneer/Head of the Tree
        </CardTitle>
        <CardDescription></CardDescription>
        <CardContent>
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
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={onPioneerCreate}>Create Pioneer</Button>
        </CardFooter>
      </Card>
      {/* <h3 className="pb-3 font-bold align-middle text-center">
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
        <Button onClick={onPioneerCreate}>Create Pioneer</Button>
      </div> */}
    </div>
  );
}
