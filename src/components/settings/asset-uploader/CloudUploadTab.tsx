
import React from "react";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import YouTubeLinksManager from "./youtube/YouTubeLinksManager";
import CloudResourceForm from "./cloud/CloudResourceForm";

interface CloudUploadTabProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType?: "compliance" | "coach" | "content";
}

const CloudUploadTab: React.FC<CloudUploadTabProps> = ({ 
  assetType, 
  onAssetAdded,
  aiType = "content" 
}) => {
  return (
    <div className="space-y-6">
      {assetType === "video" && (
        <YouTubeLinksManager 
          assetType={assetType} 
          onAssetAdded={onAssetAdded} 
          aiType={aiType}
        />
      )}
      
      <CloudResourceForm 
        assetType={assetType} 
        onAssetAdded={onAssetAdded} 
        aiType={aiType}
      />
    </div>
  );
};

export default CloudUploadTab;
