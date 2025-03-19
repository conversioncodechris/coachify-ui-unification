
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';

export const useEditPrompt = (prompts: ContentAsset[], setPrompts: React.Dispatch<React.SetStateAction<ContentAsset[]>>) => {
  const { toast } = useToast();

  const handleEditPrompt = (updatedPrompt: ContentAsset) => {
    setPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
    
    const aiType = updatedPrompt.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        const updatedAssets = assets.map((asset: ContentAsset) => 
          asset.id === updatedPrompt.id ? updatedPrompt : asset
        );
        
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Updated",
          description: "The prompt was successfully updated.",
        });
      } catch (error) {
        console.error(`Error updating prompt in ${storageKey}:`, error);
      }
    }
  };

  const togglePinPrompt = (prompt: ContentAsset) => {
    const updatedPrompt = { 
      ...prompt, 
      pinned: !prompt.pinned 
    };
    handleEditPrompt(updatedPrompt);
    
    toast({
      title: updatedPrompt.pinned ? "Prompt Pinned" : "Prompt Unpinned",
      description: updatedPrompt.pinned 
        ? "This prompt will appear at the top of the list." 
        : "This prompt has been unpinned.",
    });
  };

  const toggleHidePrompt = (prompt: ContentAsset) => {
    const updatedPrompt = { 
      ...prompt, 
      hidden: !prompt.hidden 
    };
    handleEditPrompt(updatedPrompt);
    
    toast({
      title: updatedPrompt.hidden ? "Prompt Hidden" : "Prompt Visible",
      description: updatedPrompt.hidden 
        ? "This prompt will not be shown to users." 
        : "This prompt is now visible to users.",
    });
  };

  return {
    handleEditPrompt,
    togglePinPrompt,
    toggleHidePrompt
  };
};
