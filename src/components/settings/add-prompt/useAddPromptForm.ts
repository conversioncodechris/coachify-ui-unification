
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { ContentAsset } from '@/types/contentAssets';
import { enhancePrompt, EnhancedPrompt } from '@/utils/promptEnhancer';
import { useToast } from '@/hooks/use-toast';

export type PromptPurpose = 
  | "Open House" 
  | "Price Reduction" 
  | "Market Report" 
  | "New Listing" 
  | "Just Sold" 
  | "Testimonial" 
  | "Neighborhood Highlight" 
  | "Home Improvement Tips" 
  | "Other";

export type PromptPlatform = 
  | "Facebook" 
  | "Instagram" 
  | "LinkedIn" 
  | "Twitter/X" 
  | "Email" 
  | "Video Script" 
  | "SMS Message" 
  | "Press Release" 
  | "Blog Post";

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
  const { toast } = useToast();
  
  // Form state
  const [selectedEmoji, setSelectedEmoji] = useState("💬");
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedAiType, setSelectedAiType] = useState<"content" | "compliance" | "coach">(defaultAiType);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = useState<EnhancedPrompt | null>(null);
  const [showEnhancement, setShowEnhancement] = useState(false);
  const [selectedPurpose, setSelectedPurpose] = useState<PromptPurpose>("Open House");
  const [selectedPlatforms, setSelectedPlatforms] = useState<PromptPlatform[]>([]);
  const [selectAllPlatforms, setSelectAllPlatforms] = useState(false);

  const emojiOptions = [
    "💬", "🗣️", "📝", "📚", "🧠", "💡", "🔍", "📊", "📋", "📈",
    "🤔", "🎯", "🏆", "✅", "⚠️", "🚨", "🔒", "🛡️", "📑", "📌"
  ];

  // Reset the form when the dialog opens
  useEffect(() => {
    resetForm();
  }, []);
  
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

  // Update selectAllPlatforms state when individual platforms change
  useEffect(() => {
    const allPlatforms = Object.values(PromptPlatform) as PromptPlatform[];
    setSelectAllPlatforms(selectedPlatforms.length === allPlatforms.length);
  }, [selectedPlatforms]);

  const handleSelectEmoji = (emoji: string) => {
    setSelectedEmoji(emoji);
  };

  const togglePlatform = (platform: PromptPlatform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const handleSelectAllPlatforms = (checked: boolean) => {
    const allPlatforms = Object.values(PromptPlatform) as PromptPlatform[];
    if (checked) {
      setSelectedPlatforms([...allPlatforms]);
    } else {
      setSelectedPlatforms([]);
    }
    setSelectAllPlatforms(checked);
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
    setSelectedPurpose("Open House");
    setSelectedPlatforms([]);
    setSelectAllPlatforms(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = () => {
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
        id: uuidv4(),
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
      resetForm();
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

  const acceptEnhancedPrompt = (enhancedText: string) => {
    setContent(enhancedText);
    setShowEnhancement(false);
    
    // Show toast to confirm enhancement accepted
    toast({
      title: "Enhancement Applied",
      description: "The AI-enhanced prompt has been applied",
    });
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
    
    // Show toast to confirm rejection
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
    handleSubmit,
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt,
    selectedPurpose,
    setSelectedPurpose,
    selectedPlatforms,
    togglePlatform,
    selectAllPlatforms,
    handleSelectAllPlatforms
  };
};
