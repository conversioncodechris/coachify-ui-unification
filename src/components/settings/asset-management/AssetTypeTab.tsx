
import React from "react";
import { TabsContent } from "@/components/ui/tabs";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import AssetUploader from "../AssetUploader";
import AssetsList from "../AssetsList";

interface AssetTypeTabProps {
  type: AssetType;
  assets: ContentAsset[];
  onAssetAdded: (newAssets: ContentAsset[]) => void;
  onDelete: (id: string) => void;
  aiType: "compliance" | "coach" | "content";
}

const AssetTypeTab: React.FC<AssetTypeTabProps> = ({
  type,
  assets,
  onAssetAdded,
  onDelete,
  aiType
}) => {
  const filteredAssets = assets.filter(asset => asset.type === type);
  
  return (
    <TabsContent key={type} value={type} className="space-y-4">
      <AssetUploader 
        assetType={type} 
        onAssetAdded={onAssetAdded}
        aiType={aiType}
      />

      <AssetsList 
        assets={filteredAssets} 
        onDelete={onDelete}
      />
    </TabsContent>
  );
};

export default AssetTypeTab;
