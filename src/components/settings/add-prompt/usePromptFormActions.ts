
import { v4 as uuidv4 } from 'uuid';
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';
import { PromptPurpose, PromptPlatform } from './types';
import { useState } from 'react';

export const usePromptFormActions = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = (
    setSelectedEmoji: React.Dispatch<React.SetStateAction<string>>,
    setTitle: React.Dispatch<React.SetStateAction<string>>,
    setSubtitle: React.Dispatch<React.SetStateAction<string>>,
    setContent: React.Dispatch<React.SetStateAction<string>>,
    setSelectedAiType: React.Dispatch<React.SetStateAction<"content" | "compliance" | "coach">>,
    defaultAiType: "content" | "compliance" | "coach",
    setEnhancedPromptSuggestion: React.Dispatch<React.SetStateAction<any>>,
    setShowEnhancement: React.Dispatch<React.SetStateAction<boolean>>,
    setSelectedPurpose: React.Dispatch<React.SetStateAction<PromptPurpose>>,
    setSelectedPlatforms: React.Dispatch<React.SetStateAction<string[]>>,
    setSelectAllPlatforms: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setSelectedEmoji("💬");
    setTitle("");
    setSubtitle("");
    setContent("");
    setSelectedAiType(defaultAiType);
    setEnhancedPromptSuggestion(null);
    setShowEnhancement(false);
    setSelectedPurpose("Open House");
    setSelectedPlatforms([]);
    setSelectAllPlatforms(false);
  };

  const handleSubmit = (
    title: string,
    subtitle: string,
    selectedEmoji: string,
    content: string,
    selectedAiType: "content" | "compliance" | "coach",
    selectedPurpose: PromptPurpose,
    selectedPlatforms: string[],
    onPromptAdded: (prompt: ContentAsset) => void,
    onClose: () => void,
    resetFormFn: () => void
  ) => {
    if (!title.trim()) {
      toast({
        title: "Title Required",
        description: "Please enter a title for your prompt",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const newPrompt: ContentAsset = {
        id: uuidv4(),
        type: 'prompt',
        title: title.trim(),
        subtitle: subtitle.trim() || "Custom prompt",
        icon: selectedEmoji,
        content: content.trim(),
        source: "created",
        dateAdded: new Date(),
        aiType: selectedAiType,
        metadata: {
          purpose: selectedPurpose,
          platforms: selectedPlatforms
        }
      };

      // Here we would typically save to database
      console.log("Adding new prompt:", newPrompt);
      
      onPromptAdded(newPrompt);
      setIsSubmitting(false);
      
      toast({
        title: "Prompt Added",
        description: "Your prompt has been successfully added",
      });
      
      resetFormFn();
      onClose();
    } catch (error) {
      console.error("Error adding prompt:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Error",
        description: "There was an error adding your prompt",
        variant: "destructive",
      });
    }
  };

  return {
    isSubmitting,
    resetForm,
    handleSubmit
  };
};
