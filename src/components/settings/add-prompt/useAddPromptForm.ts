
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContentAsset } from '@/types/contentAssets';
import { enhancePrompt, EnhancedPrompt } from '@/utils/promptEnhancer';

interface UseAddPromptFormProps {
  defaultAiType: "content" | "compliance" | "coach";
  onPromptAdded: (prompt: ContentAsset) => void;
  onClose: () => void;
}

export const useAddPromptForm = ({ 
  defaultAiType, 
  onPromptAdded, 
  onClose 
}: UseAddPromptFormProps) => {
  const [selectedEmoji, setSelectedEmoji] = useState("💬");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedAiType, setSelectedAiType] = useState<"content" | "compliance" | "coach">(defaultAiType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = useState<EnhancedPrompt | null>(null);
  const [showEnhancement, setShowEnhancement] = useState(false);

  const emojiOptions = [
    "💬", "🗣️", "📝", "📚", "🧠", "💡", "🔍", "📊", "📋", "📈",
    "🤔", "🎯", "🏆", "✅", "⚠️", "🚨", "🔒", "🛡️", "📑", "📌"
  ];

  // Generate enhanced prompt suggestion when content changes
  useEffect(() => {
    if (content.trim().length > 15) {
      const enhancedPrompt = enhancePrompt(content);
      setEnhancedPromptSuggestion(enhancedPrompt);
      setShowEnhancement(true);
    } else {
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
    }
  }, [content]);

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const resetForm = () => {
    setSelectedEmoji("💬");
    setTitle("");
    setSubtitle("");
    setContent("");
    setSelectedAiType(defaultAiType);
    setIsSubmitting(false);
    setEnhancedPromptSuggestion(null);
    setShowEnhancement(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    if (!title.trim()) {
      return; // Validation error - title is required
    }
    
    setIsSubmitting(true);
    
    try {
      // Create new prompt asset
      const newPrompt: ContentAsset = {
        id: uuidv4(),
        type: 'prompt',
        title: title.trim(),
        subtitle: subtitle.trim() || "Prompt-based topic",
        icon: selectedEmoji,
        source: "created",
        dateAdded: new Date(),
        content: content || "",
        isNew: true,
        aiType: selectedAiType
      };
      
      // Pass to parent handler
      onPromptAdded(newPrompt);
      
      // Reset form
      resetForm();
    } catch (error) {
      console.error("Error creating prompt:", error);
      setIsSubmitting(false);
    }
  };

  const acceptEnhancedPrompt = (enhancedText: string) => {
    setContent(enhancedText);
    setShowEnhancement(false);
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
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
    handleSubmit,
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt
  };
};
