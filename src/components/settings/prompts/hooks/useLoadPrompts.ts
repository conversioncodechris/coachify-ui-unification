
import { useState, useEffect } from 'react';
import { ContentAsset } from '@/types/contentAssets';

export const useLoadPrompts = () => {
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  
  useEffect(() => {
    const loadPrompts = () => {
      const allPrompts: ContentAsset[] = [];
      
      ["content", "compliance", "coach"].forEach(aiType => {
        const storageKey = `${aiType}Assets`;
        const storedAssets = localStorage.getItem(storageKey);
        
        if (storedAssets) {
          try {
            const assets = JSON.parse(storedAssets);
            const typePrompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
            allPrompts.push(...typePrompts);
          } catch (error) {
            console.error(`Error parsing ${storageKey}:`, error);
          }
        }
      });
      
      setPrompts(allPrompts);
    };
    
    loadPrompts();
    
    const handleAssetsUpdated = () => {
      loadPrompts();
    };
    
    window.addEventListener('contentAssetsUpdated', handleAssetsUpdated);
    
    return () => {
      window.removeEventListener('contentAssetsUpdated', handleAssetsUpdated);
    };
  }, []);

  // Get filtered and sorted prompts
  const visiblePrompts = prompts
    .filter(p => !p.hidden)
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return dateB - dateA;
    });
    
  const hiddenPrompts = prompts.filter(p => p.hidden);

  return {
    prompts,
    setPrompts,
    visiblePrompts,
    hiddenPrompts
  };
};
