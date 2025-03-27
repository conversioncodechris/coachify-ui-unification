
import { useState, useCallback } from 'react';

export const useContentSuggestions = (topic: string) => {
  const realtorInterviewQuestions = [
    // Set 1
    [
      "What made you choose real estate as a career?",
      "How do you stay current with market trends and property values?",
      "Describe your approach to pricing a home in today's market",
      "What strategies do you use to market properties effectively?",
      "How do you handle multiple offer situations?"
    ],
    // Set 2
    [
      "What's your process for qualifying potential buyers?",
      "How do you handle difficult clients or negotiations?",
      "What do you think separates you from other agents?",
      "How do you help buyers in a competitive seller's market?",
      "What's your approach to staging a home for sale?"
    ],
    // Set 3
    [
      "How do you maintain relationships with past clients?",
      "What technology tools do you use in your business?",
      "How do you determine a property's value in an area with few comparables?",
      "What's your commission structure and what does it include?",
      "How do you help sellers prepare their home for the market?"
    ]
  ];

  const basicSuggestions = [
    `What makes a good ${topic}?`,
    `What length should my ${topic} be?`,
    `How can I make my ${topic} stand out?`,
    `Best practices for ${topic} content?`,
    `What should I avoid in my ${topic}?`
  ];

  const [currentQuestionSet, setCurrentQuestionSet] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const getQuestionsForTopic = useCallback(() => {
    // Use realtor interview questions for the specific topic
    if (topic === "Conversational Interview → Multi-Platform Output") {
      return realtorInterviewQuestions[currentQuestionSet];
    }
    return basicSuggestions;
  }, [topic, currentQuestionSet, basicSuggestions, realtorInterviewQuestions]);

  const refreshQuestions = useCallback(() => {
    // Cycle through question sets
    const nextSet = (currentQuestionSet + 1) % realtorInterviewQuestions.length;
    setCurrentQuestionSet(nextSet);
  }, [currentQuestionSet, realtorInterviewQuestions.length]);

  return {
    suggestedQuestions: getQuestionsForTopic(),
    showSuggestions,
    setShowSuggestions,
    refreshQuestions
  };
};
