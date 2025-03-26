
import { useState } from 'react';

export const useContentSuggestions = (topic: string) => {
  const suggestedQuestions = [
    `What makes a good ${topic}?`,
    `What length should my ${topic} be?`,
    `How can I make my ${topic} stand out?`,
    `Best practices for ${topic} content?`,
    `What should I avoid in my ${topic}?`
  ];

  const [showSuggestions, setShowSuggestions] = useState(true);

  return {
    suggestedQuestions,
    showSuggestions,
    setShowSuggestions
  };
};
