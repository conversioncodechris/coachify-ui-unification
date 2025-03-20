
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
    
    // Determine the correct storage key based on prompt's aiType
    const aiType = promptToDelete.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    try {
      // Get current assets from localStorage
      const storedAssetsJson = localStorage.getItem(storageKey);
      
      if (!storedAssetsJson) {
        console.error(`No assets found in localStorage for ${storageKey}`);
        return;
      }
      
      // Parse the stored assets
      const storedAssets = JSON.parse(storedAssetsJson);
      
      // Filter out the asset to delete
      const updatedAssets = storedAssets.filter((asset: ContentAsset) => asset.id !== id);
      console.log(`Filtered localStorage assets: from ${storedAssets.length} to ${updatedAssets.length}`);
      
      // Save updated assets back to localStorage
      localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
      
      // Update the state after successful localStorage update
      setPrompts(prevPrompts => {
        const updatedPrompts = prevPrompts.filter(p => p.id !== id);
        console.log(`Updated prompts state: from ${prevPrompts.length} to ${updatedPrompts.length}`);
        return updatedPrompts;
      });
      
      // If we're deleting the currently selected prompt, clear selection and close dialog
      if (selectedPrompt && selectedPrompt.id === id) {
        setSelectedPrompt(null);
        setEditPromptOpen(false);
      }
      
      // Notify other components that content assets have been updated
      window.dispatchEvent(new CustomEvent('contentAssetsUpdated'));
      
      // Show success toast
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
  };

  return {
    handleDeletePrompt
  };
};
