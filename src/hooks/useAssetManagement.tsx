
import { useState, useEffect, useCallback } from 'react';

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

  const getAssetCount = useCallback((key: string): number => {
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
  }, []);

  const loadAssetCounts = useCallback(() => {
    console.log("Loading asset counts...");
    const counts = {
      compliance: getAssetCount("complianceAssets"),
      coach: getAssetCount("coachAssets"), 
      content: getAssetCount("contentAssets")
    };
    
    setAssetCounts(counts);
    console.log("Asset counts updated:", counts);
    
    // Also store counts in localStorage for other components to access
    localStorage.setItem('assetCounts', JSON.stringify(counts));
  }, [getAssetCount]);

  // Handle events and storage changes
  useEffect(() => {
    // Initial load on component mount
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
  }, [loadAssetCounts]);

  // Update when dialog closes
  useEffect(() => {
    if (!assetDialogOpen) {
      console.log("Asset dialog closed, reloading asset counts");
      loadAssetCounts();
    }
  }, [assetDialogOpen, loadAssetCounts]);

  const handleOpenAssetDialog = useCallback((type: AssetType) => {
    setSelectedAiType(type);
    setAssetDialogOpen(true);
  }, []);

  return {
    assetCounts,
    assetDialogOpen,
    selectedAiType,
    setAssetDialogOpen,
    handleOpenAssetDialog,
    loadAssetCounts
  };
}
