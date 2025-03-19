
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, FileVideo, Book, Users } from "lucide-react";
import AssetUploader from "../AssetUploader";
import AssetsList from "../AssetsList";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { Badge } from "@/components/ui/badge";

interface AssetManagementTabsProps {
  assets: ContentAsset[];
  onAssetDelete: (id: string) => void;
  onAssetAdded: (newAssets: ContentAsset[]) => void;
  aiType: "compliance" | "coach" | "content";
}

const AssetManagementTabs: React.FC<AssetManagementTabsProps> = ({
  assets,
  onAssetDelete,
  onAssetAdded,
  aiType,
}) => {
  // Type labels mapping
  const typeLabels: Record<AssetType, { icon: React.ReactNode; label: string }> = {
    pdf: { icon: <FileText className="h-4 w-4" />, label: "PDFs" },
    guidelines: { icon: <Book className="h-4 w-4" />, label: "Guidelines" },
    roleplay: { icon: <Users className="h-4 w-4" />, label: "Role Play" },
    video: { icon: <FileVideo className="h-4 w-4" />, label: "Videos" },
    other: { icon: <FileText className="h-4 w-4" />, label: "Other" },
    prompt: { icon: <FileText className="h-4 w-4" />, label: "Prompts" },
  };
  
  // Filter out prompt type as it's handled separately
  const assetTypes = Object.keys(typeLabels).filter(type => 
    type !== 'prompt'
  ) as AssetType[];
  
  // Helper function to get asset count by type
  const getAssetCountByType = (type: AssetType) => {
    return assets.filter(asset => asset.type === type).length;
  };

  return (
    <Tabs defaultValue="pdf">
      <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
        {assetTypes.map((key) => {
          const { icon, label } = typeLabels[key as AssetType];
          const count = getAssetCountByType(key as AssetType);
          return (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              {icon}
              <span className="hidden sm:inline">{label}</span>
              {count > 0 && (
                <Badge variant="secondary" className="ml-1 px-1 py-0 h-5 min-w-5 flex items-center justify-center">
                  {count}
                </Badge>
              )}
            </TabsTrigger>
          );
        })}
      </TabsList>

      {assetTypes.map((type) => (
        <TabsContent key={type} value={type} className="space-y-4">              
          <AssetUploader 
            assetType={type as AssetType} 
            onAssetAdded={onAssetAdded}
            aiType={aiType}
          />

          <AssetsList 
            assets={assets.filter(asset => asset.type === type)} 
            onDelete={onAssetDelete}
          />
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default AssetManagementTabs;
