
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { UseAddPromptFormProps, PromptPurpose } from './types';
import { DEFAULT_EMOJI_OPTIONS, PROMPT_PURPOSES, PROMPT_PLATFORMS } from './constants';
import { usePromptFormActions } from './usePromptFormActions';
import { useEnhancedPrompt } from './useEnhancedPrompt';
import { usePlatformSelection } from './usePlatformSelection';

export { PROMPT_PURPOSES, PROMPT_PLATFORMS } from './constants';
export type { PromptPurpose, PromptPlatform } from './types';

export const useAddPromptForm = ({ 
  defaultAiType, 
  onPromptAdded, 
  onClose 
}: UseAddPromptFormProps) => {
  const { toast } = useToast();
  
  // Form state
  const [selectedEmoji, setSelectedEmoji] = useState("💬");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedAiType, setSelectedAiType] = useState<"content" | "compliance" | "coach">(defaultAiType);
  const [selectedPurpose, setSelectedPurpose] = useState<PromptPurpose>("Open House");
  
  // Enhanced prompt
  const {
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt,
    setEnhancedPromptSuggestion,
    setShowEnhancement
  } = useEnhancedPrompt(content);

  // Platform selection
  const {
    selectedPlatforms,
    selectAllPlatforms,
    togglePlatform,
    handleSelectAllPlatforms,
    setSelectedPlatforms,
    setSelectAllPlatforms
  } = usePlatformSelection();

  // Form actions
  const { resetForm, handleSubmit, isSubmitting } = usePromptFormActions();

  const emojiOptions = DEFAULT_EMOJI_OPTIONS;

  // Reset the form when the dialog opens
  useState(() => {
    resetFormFn();
  });

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const resetFormFn = () => {
    resetForm(
      setSelectedEmoji,
      setTitle,
      setSubtitle,
      setContent,
      setSelectedAiType,
      defaultAiType,
      setEnhancedPromptSuggestion,
      setShowEnhancement,
      setSelectedPurpose,
      setSelectedPlatforms,
      setSelectAllPlatforms
    );
  };

  const handleClose = () => {
    resetFormFn();
    onClose();
  };

  const handleFormSubmit = () => {
    handleSubmit(
      title,
      subtitle,
      selectedEmoji,
      content,
      selectedAiType,
      selectedPurpose,
      selectedPlatforms,
      onPromptAdded,
      onClose,
      resetFormFn
    );
  };

  const acceptPromptEnhancement = (enhancedText: string) => {
    acceptEnhancedPrompt(enhancedText, setContent);
  };

  return {
    selectedEmoji,
    title,
    setTitle,
    subtitle,
    setSubtitle,
    content,
    setContent,
    selectedAiType,
    setSelectedAiType,
    isSubmitting,
    emojiOptions,
    handleSelectEmoji,
    handleClose,
    handleSubmit: handleFormSubmit,
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt: acceptPromptEnhancement,
    rejectEnhancedPrompt,
    selectedPurpose,
    setSelectedPurpose,
    selectedPlatforms,
    togglePlatform,
    selectAllPlatforms,
    handleSelectAllPlatforms
  };
};
