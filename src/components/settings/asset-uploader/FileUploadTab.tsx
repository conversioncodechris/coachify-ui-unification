
import React from "react";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import FileDropzone from "./file-upload/FileDropzone";
import FileUploadList from "./file-upload/FileUploadList";
import { useFileUpload } from "./file-upload/useFileUpload";

interface FileUploadTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType?: "compliance" | "coach" | "content";
}

const FileUploadTab: React.FC<FileUploadTabProps> = ({ 
  assetType, 
  onAssetAdded, 
  aiType = "content" 
}) => {
  const {
    files,
    newAssets,
    isUploading,
    handleFilesAdded,
    handleAssetTitleChange,
    handleAssetSubtitleChange,
    handleRemoveFile,
    handleClearAll,
    handleSubmitAssets
  } = useFileUpload(assetType, onAssetAdded, aiType);

  return (
    <div className="space-y-4">
      <FileDropzone 
        assetType={assetType}
        onFilesAdded={handleFilesAdded}
      />

      <FileUploadList
        files={files}
        assets={newAssets}
        onRemoveFile={handleRemoveFile}
        onAssetTitleChange={handleAssetTitleChange}
        onAssetSubtitleChange={handleAssetSubtitleChange}
        onSubmit={handleSubmitAssets}
        isUploading={isUploading}
        onClearAll={handleClearAll}
      />
    </div>
  );
};

export default FileUploadTab;
