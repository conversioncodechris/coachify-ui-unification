
import { useState } from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';

export const useDeletePrompt = (
  prompts: ContentAsset[], 
  setPrompts: React.Dispatch<React.SetStateAction<ContentAsset[]>>,
  selectedPrompt: ContentAsset | null,
  setSelectedPrompt: React.Dispatch<React.SetStateAction<ContentAsset | null>>,
  setEditPromptOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

  const handleDeletePrompt = (id: string) => {
    console.log(`Executing deletePrompt for ID: ${id}`);
    const promptToDelete = prompts.find(p => p.id === id);
    
    if (!promptToDelete) {
      console.error(`Prompt with ID ${id} not found`);
      return;
    }
    
    const aiType = promptToDelete.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    // Update local state
    setPrompts(prev => prev.filter(p => p.id !== id));
    
    // If edit dialog is open and we're deleting the selected prompt, close it
    if (selectedPrompt && selectedPrompt.id === id) {
      setSelectedPrompt(null);
      setEditPromptOpen(false);
    }
    
    // Update localStorage
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        const updatedAssets = assets.filter((asset: ContentAsset) => asset.id !== id);
        
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        // Dispatch event to notify other components
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Deleted",
          description: "The prompt was successfully removed.",
        });
      } catch (error) {
        console.error(`Error deleting prompt from ${storageKey}:`, error);
        toast({
          title: "Error",
          description: "Failed to delete the prompt. Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  return {
    handleDeletePrompt
  };
};
