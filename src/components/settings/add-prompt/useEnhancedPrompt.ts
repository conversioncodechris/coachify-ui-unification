
import { useState, useEffect } from 'react';
import { enhancePrompt } from '@/utils/promptEnhancer';
import { EnhancedPrompt } from './types';

export const useEnhancedPrompt = (content: string) => {
  const [enhancedPromptSuggestion, setEnhancedPromptSuggestion] = useState<EnhancedPrompt | null>(null);
  const [showEnhancement, setShowEnhancement] = useState(false);

  useEffect(() => {
    if (content.trim().length > 20) {
      // Clear any existing suggestion first
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
      
      // Add a delay to avoid overwhelming with suggestions
      const timer = setTimeout(() => {
        const enhanced = enhancePrompt(content);
        if (enhanced && enhanced.enhanced !== content) {
          setEnhancedPromptSuggestion(enhanced);
          setShowEnhancement(true);
        }
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      // Reset if content is cleared or too short
      setEnhancedPromptSuggestion(null);
      setShowEnhancement(false);
    }
  }, [content]);

  const acceptEnhancedPrompt = (enhancedText: string, setContent: (value: string) => void) => {
    if (enhancedText) {
      setContent(enhancedText);
      setShowEnhancement(false);
    }
  };

  const rejectEnhancedPrompt = () => {
    setShowEnhancement(false);
  };

  return {
    enhancedPromptSuggestion,
    setEnhancedPromptSuggestion,
    showEnhancement,
    setShowEnhancement,
    acceptEnhancedPrompt,
    rejectEnhancedPrompt
  };
};
