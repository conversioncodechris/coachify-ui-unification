
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
      compliance: getAssetCount("complianceAssets"),
      coach: getAssetCount("coachAssets"), 
      content: getAssetCount("contentAssets")
    };
    
    setAssetCounts(counts);
    
    // Also store counts in localStorage for other components to access
    localStorage.setItem('assetCounts', JSON.stringify(counts));
  };

  useEffect(() => {
    loadAssetCounts();
    
    // Handle storage changes (from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'contentAssets' || e.key === 'complianceAssets' || e.key === 'coachAssets' || e.key === 'assetCounts') {
        loadAssetCounts();
      }
    };
    
    // Handle custom events (from the same window)
    const handleCustomEvent = () => {
      loadAssetCounts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    };
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
    handleOpenAssetDialog,
    loadAssetCounts
  };
}
