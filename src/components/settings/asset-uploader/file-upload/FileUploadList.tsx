
import React from "react";
import { Button } from "@/components/ui/button";
import { ContentAsset } from "@/types/contentAssets";
import FileItem from "./FileItem";

interface FileUploadListProps {
  files: File[];
  assets: Partial<ContentAsset>[];
  onRemoveFile: (index: number) => void;
  onAssetTitleChange: (index: number, value: string) => void;
  onAssetSubtitleChange: (index: number, value: string) => void;
  onSubmit: () => void;
  isUploading: boolean;
  onClearAll: () => void;
}

const FileUploadList: React.FC<FileUploadListProps> = ({
  files,
  assets,
  onRemoveFile,
  onAssetTitleChange,
  onAssetSubtitleChange,
  onSubmit,
  isUploading,
  onClearAll
}) => {
  if (assets.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4 mt-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Files Ready for Upload ({assets.length})</h3>
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onClearAll}
        >
          Clear All
        </Button>
      </div>
      
      <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
        {assets.map((asset, index) => (
          <FileItem
            key={index}
            file={files[index]}
            asset={asset}
            index={index}
            onRemove={() => onRemoveFile(index)}
            onTitleChange={(value) => onAssetTitleChange(index, value)}
            onSubtitleChange={(value) => onAssetSubtitleChange(index, value)}
          />
        ))}
      </div>
      
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : `Upload All Files (${assets.length})`}
        </Button>
      </div>
    </div>
  );
};

export default FileUploadList;
