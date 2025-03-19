
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';

export const useAddPrompt = (prompts: ContentAsset[], setPrompts: React.Dispatch<React.SetStateAction<ContentAsset[]>>) => {
  const { toast } = useToast();

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
  };

  return {
    handleAddPrompt
  };
};
