
import { useState, useEffect } from 'react';
import { ContentAsset, AssetType } from "@/types/contentAssets";
import { useToast } from "@/hooks/use-toast";

export function useAssetState(
  isOpen: boolean, 
  aiType: "compliance" | "coach" | "content"
) {
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

  const getAssetCountByType = (type: AssetType) => {
    return assets.filter(asset => asset.type === type).length;
  };

  const aiTypeTitle = {
    compliance: "Compliance AI",
    coach: "Coach AI",
    content: "Content AI"
  };

  const handleSaveChanges = (onOpenChange: (open: boolean) => void) => {
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

  return {
    assets,
    activeTab,
    setActiveTab,
    handleAssetAdded,
    handleAssetDelete,
    getAssetCountByType,
    handleSaveChanges,
    aiTypeTitle
  };
}

export const typeLabels: Record<AssetType, { icon: React.ReactNode; label: string }> = {
  pdf: { icon: <FileText className="h-4 w-4" />, label: "PDFs" },
  guidelines: { icon: <Book className="h-4 w-4" />, label: "Guidelines" },
  roleplay: { icon: <Users className="h-4 w-4" />, label: "Role Play" },
  video: { icon: <FileVideo className="h-4 w-4" />, label: "Videos" },
  other: { icon: <FileText className="h-4 w-4" />, label: "Other" },
  prompt: { icon: <MessageSquare className="h-4 w-4" />, label: "Prompts" },
};

import { MessageSquare } from "lucide-react";
