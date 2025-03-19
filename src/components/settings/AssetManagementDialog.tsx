
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs } from "@/components/ui/tabs";
import { AssetType } from "@/types/contentAssets";
import AssetTypeTab from "./asset-management/AssetTypeTab";
import AssetTypeTabs from "./asset-management/AssetTypeTabs";
import { useAssetState, typeLabels } from "./asset-management/useAssetState";

interface AssetManagementDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  aiType: "compliance" | "coach" | "content";
}

const AssetManagementDialog: React.FC<AssetManagementDialogProps> = ({
  isOpen,
  onOpenChange,
  aiType,
}) => {
  const {
    assets,
    activeTab,
    setActiveTab,
    handleAssetAdded,
    handleAssetDelete,
    getAssetCountByType,
    handleSaveChanges,
    aiTypeTitle
  } = useAssetState(isOpen, aiType);

  const assetTypes = Object.keys(typeLabels).filter(type => 
    type !== 'prompt'
  ) as AssetType[];

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {aiTypeTitle[aiType]} Training Content
          </DialogTitle>
          <DialogDescription>
            Add and manage training assets for your AI system. 
            These documents will help the AI provide more accurate responses.
          </DialogDescription>
        </DialogHeader>

        <Tabs 
          defaultValue="pdf" 
          onValueChange={(value) => setActiveTab(value as AssetType)}
        >
          <AssetTypeTabs 
            assetTypes={assetTypes} 
            typeLabels={typeLabels} 
            getAssetCountByType={getAssetCountByType} 
          />

          {assetTypes.map((type) => (
            <AssetTypeTab
              key={type}
              type={type}
              assets={assets}
              onAssetAdded={handleAssetAdded}
              onDelete={handleAssetDelete}
              aiType={aiType}
            />
          ))}
        </Tabs>

        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => handleSaveChanges(onOpenChange)}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetManagementDialog;
