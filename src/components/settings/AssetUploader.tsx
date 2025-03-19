
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Upload, Cloud, Edit } from "lucide-react";
import { ContentAsset, AssetType } from "@/types/contentAssets";

// Import refactored components
import FileUploadTab from "./asset-uploader/FileUploadTab";
import CloudUploadTab from "./asset-uploader/CloudUploadTab";
import DraftAssetTab from "./asset-uploader/DraftAssetTab";
import PromptForm from "./asset-uploader/PromptForm";

interface AssetUploaderProps {
  assetType: AssetType;
  onAssetAdded: (assets: ContentAsset[]) => void;
  aiType?: "compliance" | "coach" | "content";
}

const AssetUploader: React.FC<AssetUploaderProps> = ({ 
  assetType, 
  onAssetAdded,
  aiType = "content" 
}) => {
  const [uploadMethod, setUploadMethod] = useState<"upload" | "cloud" | "draft">("upload");

  return (
    <Card>
      <CardContent className="pt-6">
        {assetType === 'prompt' ? (
          <>
            <div className="mb-4 bg-blue-50 p-3 rounded-md border border-blue-100">
              <p className="text-sm text-blue-800 flex items-center">
                <MessageSquare className="h-4 w-4 mr-2" />
                Prompts added here will appear as topic cards in {aiType.charAt(0).toUpperCase() + aiType.slice(1)} AI.
              </p>
            </div>
            <PromptForm 
              onAddPrompt={(asset) => onAssetAdded([asset])} 
              aiType={aiType}
            />
          </>
        ) : (
          <Tabs defaultValue="upload" onValueChange={(value) => setUploadMethod(value as any)}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="h-4 w-4" />
                <span>Upload</span>
              </TabsTrigger>
              <TabsTrigger value="cloud" className="flex items-center gap-2">
                <Cloud className="h-4 w-4" />
                <span>Cloud</span>
              </TabsTrigger>
              <TabsTrigger value="draft" className="flex items-center gap-2">
                <Edit className="h-4 w-4" />
                <span>Draft</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload">
              <FileUploadTab assetType={assetType} onAssetAdded={onAssetAdded} />
            </TabsContent>

            <TabsContent value="cloud">
              <CloudUploadTab assetType={assetType} onAssetAdded={onAssetAdded} />
            </TabsContent>

            <TabsContent value="draft">
              <DraftAssetTab assetType={assetType} onAssetAdded={onAssetAdded} />
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  );
};

export default AssetUploader;
