
import { useState, useEffect } from 'react';

export type AssetType = "compliance" | "coach" | "content";

export type AssetCounts = {
  compliance: number;
  coach: number;
  content: number;
};

export function useAssetManagement() {
  const [assetCounts, setAssetCounts] = useState<AssetCounts>({
    compliance: 0,
    coach: 0,
    content: 0
  });
  
  const [assetDialogOpen, setAssetDialogOpen] = useState(false);
  const [selectedAiType, setSelectedAiType] = useState<AssetType>("compliance");

  const getAssetCount = (key: string): number => {
    const typeAssets = localStorage.getItem(key);
    if (typeAssets) {
      try {
        return JSON.parse(typeAssets).length;
      } catch (error) {
        console.error(`Error parsing ${key}:`, error);
        return 0;
      }
    }
    return 0;
  };

  const loadAssetCounts = () => {
    const counts = {
      compliance: 0,
      coach: 0, 
      content: 0
    };
    
    // Use consistent key for content assets
    counts.compliance = getAssetCount("complianceAssets");
    counts.coach = getAssetCount("coachAssets");
    counts.content = getAssetCount("contentAssets");
    
    setAssetCounts(counts);
  };

  useEffect(() => {
    loadAssetCounts();
    
    const handleStorageChange = () => {
      loadAssetCounts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  useEffect(() => {
    if (!assetDialogOpen) {
      loadAssetCounts();
    }
  }, [assetDialogOpen]);

  const handleOpenAssetDialog = (type: AssetType) => {
    setSelectedAiType(type);
    setAssetDialogOpen(true);
  };

  return {
    assetCounts,
    assetDialogOpen,
    selectedAiType,
    setAssetDialogOpen,
    handleOpenAssetDialog
  };
}
