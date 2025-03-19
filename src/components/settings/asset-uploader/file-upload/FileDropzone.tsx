
import React from "react";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { AssetType } from "@/types/contentAssets";

interface FileDropzoneProps {
  assetType: AssetType;
  onFilesAdded: (files: File[]) => void;
}

const FileDropzone: React.FC<FileDropzoneProps> = ({ 
  assetType, 
  onFilesAdded 
}) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      onFilesAdded(newFiles);
    }
  };

  return (
    <div className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center">
      <Upload className="h-8 w-8 text-muted-foreground mb-2" />
      <p className="text-sm text-muted-foreground mb-2">
        Drag and drop files or click to browse
      </p>
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple
        onChange={handleFileChange}
        accept={assetType === 'pdf' ? '.pdf' : 
                assetType === 'video' ? '.mp4,.webm,.mov,.avi' : 
                undefined}
      />
      <Button
        variant="outline"
        onClick={() => document.getElementById("file-upload")?.click()}
      >
        Select Multiple Files
      </Button>
    </div>
  );
};

export default FileDropzone;
