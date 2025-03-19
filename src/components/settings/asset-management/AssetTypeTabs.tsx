
import React from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, FileVideo, Book, Users } from "lucide-react";
import { AssetType } from "@/types/contentAssets";

interface AssetTypeTabsProps {
  assetTypes: AssetType[];
  typeLabels: Record<AssetType, { icon: React.ReactNode; label: string }>;
  getAssetCountByType: (type: AssetType) => number;
}

const AssetTypeTabs: React.FC<AssetTypeTabsProps> = ({
  assetTypes,
  typeLabels,
  getAssetCountByType
}) => {
  return (
    <TabsList className="grid grid-cols-3 md:grid-cols-5 mb-4">
      {assetTypes.map((key) => {
        const { icon, label } = typeLabels[key];
        const count = getAssetCountByType(key);
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
  );
};

export default AssetTypeTabs;
