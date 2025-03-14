
import React from "react";
import { ContentAsset } from "@/types/contentAssets";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, ExternalLink, FileText, Cloud, Edit } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface AssetsListProps {
  assets: ContentAsset[];
  onDelete: (id: string) => void;
}

const AssetsList: React.FC<AssetsListProps> = ({ assets, onDelete }) => {
  if (assets.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No assets added yet. Use the options above to add assets.
      </div>
    );
  }

  // Helper function to format file size
  const formatFileSize = (bytes: number | undefined): string => {
    if (!bytes) return "Unknown size";
    
    const units = ["B", "KB", "MB", "GB"];
    let size = bytes;
    let unitIndex = 0;
    
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    
    return `${size.toFixed(1)} ${units[unitIndex]}`;
  };

  // Get source icon
  const getSourceIcon = (source: string) => {
    switch (source) {
      case "google-drive":
        return <Cloud className="h-4 w-4 text-blue-500" />;
      case "dropbox":
        return <Cloud className="h-4 w-4 text-blue-600" />;
      case "upload":
        return <FileText className="h-4 w-4 text-gray-500" />;
      default:
        return <Edit className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-medium">Added Assets ({assets.length})</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {assets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="flex items-start p-4">
                <div className="text-3xl mr-3">{asset.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{asset.title}</div>
                  <div className="text-sm text-muted-foreground truncate">{asset.subtitle}</div>
                  <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                    {getSourceIcon(asset.source)}
                    <span>
                      Added {formatDistanceToNow(new Date(asset.dateAdded), { addSuffix: true })}
                    </span>
                    {asset.size && (
                      <span className="ml-2">• {formatFileSize(asset.size)}</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-1">
                  {asset.url && (
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(asset.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default AssetsList;
