
import { useState, useEffect } from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';

export const usePrompts = () => {
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  const [addPromptOpen, setAddPromptOpen] = useState(false);
  const [editPromptOpen, setEditPromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<ContentAsset | null>(null);
  const { toast } = useToast();
  
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

  const handleAddPrompt = (newPrompt: ContentAsset) => {
    setPrompts(prev => [...prev, newPrompt]);
    
    const aiType = newPrompt.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    const storedAssets = localStorage.getItem(storageKey);
    let assets = [];
    
    if (storedAssets) {
      try {
        assets = JSON.parse(storedAssets);
      } catch (error) {
        console.error(`Error parsing ${storageKey}:`, error);
      }
    }
    
    assets.push(newPrompt);
    localStorage.setItem(storageKey, JSON.stringify(assets));
    
    const customEvent = new Event('contentAssetsUpdated');
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Prompt Created",
      description: `This prompt will appear as a topic card in the ${aiType} AI.`,
    });
    
    setAddPromptOpen(false);
  };

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

  const handleDeletePrompt = (id: string) => {
    const promptToDelete = prompts.find(p => p.id === id);
    if (!promptToDelete) return;
    
    const aiType = promptToDelete.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    setPrompts(prev => prev.filter(p => p.id !== id));
    
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        const updatedAssets = assets.filter((asset: ContentAsset) => asset.id !== id);
        
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Deleted",
          description: "The prompt was successfully removed.",
        });
      } catch (error) {
        console.error(`Error deleting prompt from ${storageKey}:`, error);
      }
    }
  };

  const openEditPrompt = (prompt: ContentAsset) => {
    setSelectedPrompt(prompt);
    setEditPromptOpen(true);
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
    visiblePrompts,
    hiddenPrompts,
    addPromptOpen,
    setAddPromptOpen,
    editPromptOpen,
    setEditPromptOpen,
    selectedPrompt,
    handleAddPrompt,
    handleEditPrompt,
    handleDeletePrompt,
    openEditPrompt,
    togglePinPrompt,
    toggleHidePrompt
  };
};
