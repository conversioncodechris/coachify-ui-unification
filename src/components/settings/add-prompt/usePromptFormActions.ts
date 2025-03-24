
import { useState } from 'react';
import { nanoid } from 'nanoid';
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';
import { PromptPurpose, PromptPlatform } from './types';

export const usePromptFormActions = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const resetForm = (
    setSelectedEmoji: (emoji: string) => void,
    setTitle: (title: string) => void,
    setSubtitle: (subtitle: string) => void,
    setContent: (content: string) => void,
    setSelectedAiType: (aiType: "content" | "compliance" | "coach") => void,
    defaultAiType: "content" | "compliance" | "coach",
    setEnhancedPromptSuggestion: (suggestion: any) => void,
    setShowEnhancement: (show: boolean) => void,
    setSelectedPurpose: (purpose: PromptPurpose) => void,
    setSelectedPlatforms: (platforms: PromptPlatform[]) => void,
    setSelectAllPlatforms: (selected: boolean) => void
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
    resetFormCallback: () => void
  ) => {
    if (isSubmitting) return;
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create metadata for purpose and platforms
      const metadata = {
        purpose: selectedPurpose,
        platforms: selectedPlatforms
      };
      
      // Create new prompt asset
      const newPrompt: ContentAsset = {
        id: nanoid(),
        type: 'prompt',
        title: title.trim(),
        subtitle: subtitle.trim() || "Prompt-based topic",
        icon: selectedEmoji,
        source: "created",
        dateAdded: new Date(),
        content: content || "",
        isNew: true,
        aiType: selectedAiType,
        metadata: metadata
      };
      
      // Pass to parent handler
      onPromptAdded(newPrompt);
      
      // Reset form
      resetFormCallback();
      onClose();
    } catch (error) {
      console.error("Error creating prompt:", error);
      setIsSubmitting(false);
      toast({
        title: "Error",
        description: "Failed to create prompt",
        variant: "destructive"
      });
    }
  };

  return {
    resetForm,
    handleSubmit,
    isSubmitting
  };
};
