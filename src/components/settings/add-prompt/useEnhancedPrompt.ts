
import { useState, useEffect } from 'react';
import { enhancePrompt } from '@/utils/promptEnhancer';
import { useToast } from '@/hooks/use-toast';
import { EnhancedPrompt } from './types';

export const useEnhancedPrompt = (content: string) => {
  const { toast } = useToast();
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = useState<EnhancedPrompt | null>(null);
  const [showEnhancement, setShowEnhancement] = useState(false);

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

  const acceptEnhancedPrompt = (enhancedText: string, setContent: (text: string) => void) => {
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
    enhancedPromptSuggestion,
    showEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt,
    setEnhancedPromptSuggestion,
    setShowEnhancement
  };
};
