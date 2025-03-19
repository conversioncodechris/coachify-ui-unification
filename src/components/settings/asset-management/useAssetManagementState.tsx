
import React, { useState, useEffect } from "react";
import { ContentAsset } from "@/types/contentAssets";
import { useToast } from "@/hooks/use-toast";

interface UseAssetManagementStateProps {
  aiType: "compliance" | "coach" | "content";
  isOpen: boolean;
}

export function useAssetManagementState({ aiType, isOpen }: UseAssetManagementStateProps) {
  const [assets, setAssets] = useState<ContentAsset[]>([]);
  const { toast } = useToast();

  // Load assets from localStorage when dialog opens
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

  // Handle adding new assets
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
    
    toast({
      title: "Training Asset Added",
      description: `Added to ${aiTypeTitle[aiType]} successfully.`,
    });
  };

  // Handle asset deletion
  const handleAssetDelete = (id: string) => {
    setAssets((prev) => prev.filter(asset => asset.id !== id));
  };

  // Save changes to localStorage
  const handleSaveChanges = (onCloseCallback: () => void) => {
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
    
    onCloseCallback();
  };

  const aiTypeTitle = {
    compliance: "Compliance AI",
    coach: "Coach AI",
    content: "Content AI"
  };

  return {
    assets,
    handleAssetAdded,
    handleAssetDelete,
    handleSaveChanges,
    aiTypeTitle
  };
}
