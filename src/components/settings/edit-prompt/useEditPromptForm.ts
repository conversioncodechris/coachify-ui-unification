
import { useState, useEffect } from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { useToast } from '@/hooks/use-toast';
import { enhancePrompt, EnhancedPrompt } from '@/utils/promptEnhancer';

interface UseEditPromptFormProps {
  prompt: ContentAsset;
  onPromptUpdated: (updatedPrompt: ContentAsset) => void;
  onClose: () => void;
}

export const useEditPromptForm = ({ prompt, onPromptUpdated, onClose }: UseEditPromptFormProps) => {
  // State
  const [selectedEmoji, setSelectedEmoji] = useState<string>(prompt.icon || '🔍');
  const [title, setTitle] = useState<string>(prompt.title || '');
  const [subtitle, setSubtitle] = useState<string>(prompt.subtitle || '');
  const [content, setContent] = useState<string>(prompt.content || '');
  const [selectedAiType, setSelectedAiType] = useState<"compliance" | "coach" | "content">(
    (prompt.aiType as "compliance" | "coach" | "content") || 'content'
  );
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = useState<EnhancedPrompt | null>(null);
  const [showEnhancement, setShowEnhancement] = useState(false);
  const { toast } = useToast();

  // Emoji options
  const emojiOptions = [
    "📝", "🔍", "💡", "📊", "📈", "🗂️", "📚", "🔔",
    "✅", "❓", "🚀", "🎯", "💻", "📱", "🌐", "💼",
    "⚙️", "📄", "📋", "📎", "🔑", "🛠️", "📧", "💬",
    "👥", "🏆", "🔒", "⏱️", "📅", "💰", "🔄", "⭐"
  ];

  useEffect(() => {
    // Reset form when prompt changes
    setSelectedEmoji(prompt.icon || '🔍');
    setTitle(prompt.title || '');
    setSubtitle(prompt.subtitle || '');
    setContent(prompt.content || '');
    setSelectedAiType((prompt.aiType as "compliance" | "coach" | "content") || 'content');
  }, [prompt]);

  // Generate enhanced prompt suggestion when content changes
  useEffect(() => {
    if (content && content.trim().length > 15 && content !== prompt.content) {
      const enhancedPrompt = enhancePrompt(content);
      setEnhancedPromptSuggestion(enhancedPrompt);
      setShowEnhancement(true);
    } else {
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
    }
  }, [content, prompt.content]);

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const handleSave = () => {
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
      // Create updated prompt
      const updatedPrompt: ContentAsset = {
        ...prompt,
        icon: selectedEmoji,
        title: title.trim(),
        subtitle: subtitle.trim(),
        content: content.trim(),
        aiType: selectedAiType,
        dateAdded: prompt.dateAdded // Use the existing dateAdded instead of lastModified
      };

      // Update the prompt
      onPromptUpdated(updatedPrompt);
      setIsSubmitting(false);
      
      toast({
        title: "Prompt Updated",
        description: "Your prompt has been successfully updated",
      });
      
      onClose();
    } catch (error) {
      console.error("Error updating prompt:", error);
      setIsSubmitting(false);
      
      toast({
        title: "Update Failed",
        description: "There was an error updating your prompt",
        variant: "destructive",
      });
    }
  };

  const handleDelete = () => {
    // We'll use the existing delete confirmation dialog by triggering a custom event
    onClose();
    
    // Create and dispatch a custom event with the prompt ID
    const deleteEvent = new CustomEvent('promptDeleteRequested', { 
      detail: { promptId: prompt.id } 
    });
    window.dispatchEvent(deleteEvent);
  };

  const handleClose = () => {
    onClose();
  };

  const acceptEnhancedPrompt = (enhancedText: string) => {
    setContent(enhancedText);
    setShowEnhancement(false);
    
    toast({
      title: "Enhancement Applied",
      description: "The AI-enhanced prompt has been applied",
    });
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
    
    toast({
      title: "Enhancement Rejected",
      description: "Keeping your original prompt",
    });
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
    handleSave,
    handleDelete,
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt
  };
};
