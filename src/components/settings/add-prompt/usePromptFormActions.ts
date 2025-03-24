
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/hooks/use-toast';
import { ContentAsset } from '@/types/contentAssets';
import { PromptPurpose, PromptPlatform } from './types';

export const usePromptFormActions = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = (
    setSelectedEmoji: (value: string) => void,
    setTitle: (value: string) => void,
    setSubtitle: (value: string) => void,
    setContent: (value: string) => void,
    setSelectedAiType: (value: "content" | "compliance" | "coach") => void,
    defaultAiType: "content" | "compliance" | "coach",
    setEnhancedPromptSuggestion: (value: any) => void,
    setShowEnhancement: (value: boolean) => void,
    setSelectedPurpose: (value: PromptPurpose) => void,
    setSelectedPlatforms: (value: PromptPlatform[]) => void,
    setSelectAllPlatforms: (value: boolean) => void
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
    selectedPlatforms: PromptPlatform[],
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
      // Create the prompt/asset object
      const newPrompt: ContentAsset = {
        id: uuidv4(),
        type: 'prompt',
        title: title.trim(),
        subtitle: subtitle.trim() || "Custom prompt",
        icon: selectedEmoji,
        source: "created",
        dateAdded: new Date(),
        content: content,
        isNew: true,
        aiType: selectedAiType,
        purpose: selectedPurpose,
        platforms: selectedPlatforms
      };

      // Add the prompt
      onPromptAdded(newPrompt);
      setIsSubmitting(false);
      
      // Show success toast
      toast({
        title: "Prompt Added",
        description: "Your prompt has been successfully added",
      });
      
      // Reset form and close dialog
      resetFormFn();
      onClose();
    } catch (error) {
      console.error("Error adding prompt:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Add Failed",
        description: "There was an error adding your prompt",
        variant: "destructive",
      });
    }
  };

  return {
    resetForm,
    handleSubmit,
    isSubmitting
  };
};
