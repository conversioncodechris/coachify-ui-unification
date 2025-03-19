
import { useState, useEffect } from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';

interface UseEditPromptFormProps {
  prompt: ContentAsset;
  onPromptUpdated: (updatedPrompt: ContentAsset) => void;
  onClose: () => void;
}

export const useEditPromptForm = ({
  prompt,
  onPromptUpdated,
  onClose
}: UseEditPromptFormProps) => {
  const { toast } = useToast();
  const [selectedEmoji, setSelectedEmoji] = useState<string>(prompt.icon);
  const [title, setTitle] = useState<string>(prompt.title);
  const [subtitle, setSubtitle] = useState<string>(prompt.subtitle);
  const [content, setContent] = useState<string>(prompt.content || "");
  const [selectedAiType, setSelectedAiType] = useState<"content" | "compliance" | "coach">(
    prompt.aiType || "content"
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset form when prompt changes
    setSelectedEmoji(prompt.icon);
    setTitle(prompt.title);
    setSubtitle(prompt.subtitle);
    setContent(prompt.content || "");
    setSelectedAiType(prompt.aiType || "content");
  }, [prompt]);

  // Common emoji options
  const emojiOptions = [
    "💬", "🗣️", "📝", "📚", "🧠", "💡", "🔍", "📊", "📋", "📈", 
    "🤔", "🎯", "🏆", "✅", "⚠️", "🚨", "🔒", "🛡️", "📑", "📌"
  ];

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleSave = () => {
    if (isSubmitting) return;
    
    if (!title.trim()) {
      toast({
        title: "Missing title",
        description: "Please provide a title for your prompt.",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const updatedPrompt: ContentAsset = {
        ...prompt,
        icon: selectedEmoji,
        title: title.trim(),
        subtitle: subtitle.trim() || "Prompt-based topic",
        content: content,
        isNew: false, // Mark as not new anymore since it's been edited
        aiType: selectedAiType
      };
      
      onPromptUpdated(updatedPrompt);
      onClose();
      
      toast({
        title: "Prompt Updated",
        description: `The prompt has been updated and assigned to ${selectedAiType.charAt(0).toUpperCase() + selectedAiType.slice(1)} AI.`,
      });
    } catch (error) {
      console.error("Error updating prompt:", error);
      toast({
        title: "Error",
        description: "Failed to update prompt. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    onClose();
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
    handleSave
  };
};
