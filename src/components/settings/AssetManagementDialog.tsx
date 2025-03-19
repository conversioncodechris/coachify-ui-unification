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
import { FileText, FileVideo, Book, Users, MessageSquare, Plus } from "lucide-react";
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
  const [activeTab, setActiveTab] = useState<AssetType>("pdf");
  const { toast } = useToast();
  
  useEffect(() => {
    if (isOpen) {
      const storedKey = aiType === "content" ? "contentAssets" : `${aiType}Assets`;
      const storedAssets = localStorage.getItem(storedKey);
      if (storedAssets) {
        try {
          console.log(`Loading ${storedKey} assets`);
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
    pdf: { icon: <FileText className="h-4 w-4" />, label: "PDFs" },
    guidelines: { icon: <Book className="h-4 w-4" />, label: "Guidelines" },
    roleplay: { icon: <Users className="h-4 w-4" />, label: "Role Play" },
    video: { icon: <FileVideo className="h-4 w-4" />, label: "Videos" },
    other: { icon: <FileText className="h-4 w-4" />, label: "Other" },
    prompt: { icon: <MessageSquare className="h-4 w-4" />, label: "Prompts" },
  };

  const handleAssetAdded = (newAssets: ContentAsset[]) => {
    setAssets((prev) => {
      const assetsWithType = newAssets.map(asset => ({
        ...asset,
        aiType: asset.aiType || aiType
      }));
      
      const updated = [...prev, ...assetsWithType];
      console.log(`Added ${newAssets.length} assets, new total: ${updated.length}`);
      
      const storedKey = aiType === "content" ? "contentAssets" : `${aiType}Assets`;
      localStorage.setItem(storedKey, JSON.stringify(updated));
      
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
      
      return updated;
    });
    
    if (activeTab === "prompt") {
      toast({
        title: "Note: Prompts Management",
        description: "For user-facing prompts, please use the Prompts tab in Settings.",
      });
    } else {
      toast({
        title: "Training Asset Added",
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
    
    const customEvent = new Event('contentAssetsUpdated');
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Changes Saved",
      description: `Training assets updated for ${aiTypeTitle[aiType]}.`,
    });
    
    onOpenChange(false);
  };

  const getAssetCountByType = (type: AssetType) => {
    return assets.filter(asset => asset.type === type).length;
  };

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
                onAssetAdded={handleAssetAdded}
                aiType={aiType}
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
