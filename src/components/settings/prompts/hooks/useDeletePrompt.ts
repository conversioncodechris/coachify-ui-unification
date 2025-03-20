
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
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeletePrompt = (id: string) => {
    if (isDeleting) return; // Prevent multiple deletion attempts
    
    console.log(`Executing deletePrompt for ID: ${id}`);
    setIsDeleting(true);
    
    // Find the prompt to delete from the current state
    const promptToDelete = prompts.find(p => p.id === id);
    
    if (!promptToDelete) {
      console.error(`Prompt with ID ${id} not found in the current state`);
      setIsDeleting(false);
      return;
    }
    
    console.log("Found prompt to delete:", promptToDelete);
    
    // Get all assets from all relevant storage keys
    ["content", "compliance", "coach"].forEach(aiType => {
      const storageKey = `${aiType}Assets`;
      
      try {
        // Get current assets from localStorage
        const storedAssetsJson = localStorage.getItem(storageKey);
        
        if (!storedAssetsJson) {
          console.log(`No assets found in localStorage for ${storageKey}`);
          return;
        }
        
        // Parse the stored assets
        const storedAssets = JSON.parse(storedAssetsJson);
        
        // Log the assets before filtering for debugging
        console.log(`Checking ${storageKey} - assets before filtering:`, storedAssets.length);
        
        // Find if the asset exists in this storage
        const assetExists = storedAssets.some((asset: any) => asset.id === id);
        
        if (assetExists) {
          console.log(`Found asset with ID ${id} in ${storageKey}`);
          
          // Filter out the asset to delete
          const updatedAssets = storedAssets.filter((asset: any) => asset.id !== id);
          
          console.log(`${storageKey}: Filtered from ${storedAssets.length} to ${updatedAssets.length}`);
          
          // Save updated assets back to localStorage
          localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
          
          // Notify other components that content assets have been updated
          window.dispatchEvent(new CustomEvent('contentAssetsUpdated'));
        }
      } catch (error) {
        console.error(`Error processing ${storageKey}:`, error);
      }
    });
    
    // Update the state after processing all localStorage keys
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
    
    // Show success toast
    toast({
      title: "Prompt Deleted",
      description: "The prompt was successfully removed.",
    });
    
    setIsDeleting(false);
  };

  return {
    handleDeletePrompt,
    isDeleting
  };
};
