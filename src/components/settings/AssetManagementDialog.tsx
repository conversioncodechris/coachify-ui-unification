
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { FileText, FileVideo, Book, Users, MessageSquare, Upload, Cloud } from "lucide-react";
import AssetUploader from "./AssetUploader";
import AssetsList from "./AssetsList";
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

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
  const [assets, setAssets] = useState<ContentAsset[]>([]);
  const [activeTab, setActiveTab] = useState<AssetType>("prompt");
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen) {
      const storedKey = aiType === "content" ? "contentAssets" : `${aiType}Assets`;
      const storedAssets = localStorage.getItem(storedKey);
      if (storedAssets) {
        try {
          setAssets(JSON.parse(storedAssets));
        } catch (error) {
          console.error(`Error parsing ${storedKey}:`, error);
        }
      } else {
        setAssets([]);
      }
    }
  }, [isOpen, aiType]);
  
  const typeLabels: Record<AssetType, { icon: React.ReactNode; label: string }> = {
    prompt: { icon: <MessageSquare className="h-4 w-4" />, label: "Prompts" },
    pdf: { icon: <FileText className="h-4 w-4" />, label: "PDFs" },
    guidelines: { icon: <Book className="h-4 w-4" />, label: "Brand Guidelines" },
    roleplay: { icon: <Users className="h-4 w-4" />, label: "Role Play" },
    video: { icon: <FileVideo className="h-4 w-4" />, label: "Training Videos" },
    other: { icon: <FileText className="h-4 w-4" />, label: "Other Assets" },
  };

  const handleAssetAdded = (newAssets: ContentAsset[]) => {
    setAssets((prev) => [...prev, ...newAssets]);
    
    if (aiType === "content" && activeTab === "prompt") {
      toast({
        title: "Prompt Added",
        description: "This prompt will create a new topic card in Content AI.",
      });
    } else {
      toast({
        title: "Asset Added",
        description: `Added to ${aiTypeTitle[aiType]} successfully.`,
      });
    }
  };

  const handleAssetDelete = (id: string) => {
    setAssets((prev) => prev.filter(asset => asset.id !== id));
  };

  const aiTypeTitle = {
    compliance: "Compliance AI",
    coach: "Coach AI",
    content: "Content AI"
  };

  const handleSaveChanges = () => {
    const storedKey = aiType === "content" ? "contentAssets" : `${aiType}Assets`;
    
    // Save assets to localStorage
    console.log(`Saving ${assets.length} assets to ${storedKey}`);
    localStorage.setItem(storedKey, JSON.stringify(assets));
    
    const updateCounts = () => {
      const counts = {
        compliance: 0,
        coach: 0,
        content: 0
      };
      
      ["compliance", "coach", "content"].forEach(type => {
        const typeKey = type === "content" ? "contentAssets" : `${type}Assets`;
        const typeAssets = localStorage.getItem(typeKey);
        if (typeAssets) {
          try {
            counts[type as keyof typeof counts] = JSON.parse(typeAssets).length;
          } catch (error) {
            console.error(`Error parsing ${typeKey}:`, error);
          }
        }
      });
      
      localStorage.setItem('assetCounts', JSON.stringify(counts));
    };
    
    updateCounts();
    
    if (aiType === "content" && assets.some(asset => asset.type === "prompt")) {
      toast({
        title: "Changes Saved",
        description: `Prompts will appear as topic cards in Content AI.`,
      });
    } else {
      toast({
        title: "Changes Saved",
        description: `${assets.length} assets updated for ${aiTypeTitle[aiType]}.`,
      });
    }
    
    // Dispatch custom event first (for same window)
    console.log("Dispatching contentAssetsUpdated event");
    const customEvent = new Event('contentAssetsUpdated');
    window.dispatchEvent(customEvent);
    
    // Close the dialog after saving
    onOpenChange(false);
  };

  const getAssetCountByType = (type: AssetType) => {
    return assets.filter(asset => asset.type === type).length;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>
            {aiTypeTitle[aiType]} Content Management
          </DialogTitle>
          <DialogDescription>
            {aiType === "content" ? 
              "Add and manage assets for your AI system. Prompts will appear as topic cards in Content AI." :
              "Add and manage assets for your AI system. These will be available in the AI interface."
            }
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="prompt" onValueChange={(value) => setActiveTab(value as AssetType)}>
          <TabsList className="grid grid-cols-3 md:grid-cols-6 mb-4">
            {Object.entries(typeLabels).map(([key, { icon, label }]) => {
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

          {Object.keys(typeLabels).map((type) => (
            <TabsContent key={type} value={type} className="space-y-4">
              {type === "prompt" && aiType === "content" && (
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100 mb-4">
                  <p className="text-sm text-blue-800 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Prompts added here will appear as topic cards in Content AI.
                  </p>
                </div>
              )}
              
              <AssetUploader 
                assetType={type as AssetType} 
                onAssetAdded={handleAssetAdded} 
              />

              <AssetsList 
                assets={assets.filter(asset => asset.type === type)} 
                onDelete={handleAssetDelete}
              />
            </TabsContent>
          ))}
        </Tabs>

        <DialogFooter className="mt-auto">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
          <Button onClick={handleSaveChanges}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AssetManagementDialog;
