
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
import AssetManagementTabs from "./AssetManagementTabs";
import { useAssetManagementState } from "./useAssetManagementState";

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
    handleAssetAdded,
    handleAssetDelete,
    handleSaveChanges,
    aiTypeTitle
  } = useAssetManagementState({ aiType, isOpen });

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

        <AssetManagementTabs 
          assets={assets}
          onAssetDelete={handleAssetDelete}
          onAssetAdded={handleAssetAdded}
          aiType={aiType}
        />

        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={() => handleSaveChanges(() => onOpenChange(false))}>
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetManagementDialog;
