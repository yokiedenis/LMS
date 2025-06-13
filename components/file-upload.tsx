"use client";

import toast from "react-hot-toast";

import { UploadDropzone } from "@/lib/uploadthing";
import { ourFileRouter } from "@/app/api/uploadthing/core";

// Define the expected response type from the UploadDropzone component
interface FileResponse {
  url: string;
  name: string;
}

interface FileUploadProps {
  onChange: (url?: string, originalFilename?: string) => void;
  endpoint: keyof typeof ourFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint
}: FileUploadProps) => {

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res: FileResponse[]) => {
        console.log("onClientUploadComplete res:", res);
        // Extract URL and name from the response and pass them to onChange
        if (res[0]) {
          onChange(res[0].url, res[0].name);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(`${error?.message}`);
      }}
    />
  );
}
