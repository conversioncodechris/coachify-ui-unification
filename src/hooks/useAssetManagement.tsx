
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
    console.log("Loading asset counts...");
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
        console.log(`Storage event detected for ${e.key}, reloading asset counts`);
        loadAssetCounts();
      }
    };
    
    // Handle custom events (from the same window)
    const handleCustomEvent = () => {
      console.log("Custom event detected in useAssetManagement, reloading asset counts");
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
      console.log("Asset dialog closed, reloading asset counts");
      loadAssetCounts();
      
      // Force update of topics by dispatching custom event
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
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
