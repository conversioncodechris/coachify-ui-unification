
import { useState, useEffect, useCallback } from 'react';
import { Message, Source } from '../components/content/ContentTypes';

export const useContentChat = (topic: string) => {
  const suggestedQuestions = [
    `What makes a good ${topic}?`,
    `What length should my ${topic} be?`,
    `How can I make my ${topic} stand out?`,
    `Best practices for ${topic} content?`,
    `What should I avoid in my ${topic}?`
  ];

  const mockSources: Source[] = [
    {
      title: 'Content Best Practices',
      content: 'This resource provides guidance on creating engaging and effective content for various platforms.',
      url: 'https://example.com/content-best-practices'
    },
    {
      title: 'Platform-Specific Guidelines',
      content: 'Learn about character limits, image sizes, and other technical requirements for different platforms.',
      url: 'https://example.com/platform-guidelines'
    },
    {
      title: 'Content Strategy Guide',
      content: 'A comprehensive guide to developing a content strategy for real estate professionals.',
      url: 'https://example.com/content-strategy'
    },
    {
      title: 'Writing Tips for Real Estate',
      content: 'Expert advice on crafting compelling real estate descriptions and content.',
      url: 'https://example.com/real-estate-writing'
    }
  ];

  const [messages, setMessages] = useState<Message[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);

  // Initialize messages with a welcome message
  useEffect(() => {
    // Check if this is a conversational interview
    const isConversationalInterview = topic === "Conversational Interview";
    
    // If it's a conversational interview, don't show suggestions by default
    if (isConversationalInterview) {
      setShowSuggestions(false);
    }
    
    if (messages.length === 0) {
      // Default welcome message
      let welcomeMessage = `Welcome to the ${topic} content creation! What kind of content would you like to create today?`;
      
      // Custom welcome message for Conversational Interview - more specific and direct
      if (isConversationalInterview) {
        welcomeMessage = "What was the most significant transaction or deal you closed in the past month? Please share the specific property type, location, and what made this deal unique.";
      }
      
      setMessages([
        {
          sender: 'ai',
          content: welcomeMessage,
          timestamp: new Date(),
          sources: [
            {
              title: 'Content Best Practices',
              content: 'This resource provides guidance on creating engaging and effective content for various platforms.',
              url: 'https://example.com/content-best-practices'
            },
            {
              title: 'Platform-Specific Guidelines',
              content: 'Learn about character limits, image sizes, and other technical requirements for different platforms.',
              url: 'https://example.com/platform-guidelines'
            }
          ]
        }
      ]);
    }
  }, [topic, messages.length]);

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
    if (!isSourcesPanelOpen) {
      setActiveSourceIndex(0);
    }
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    
    setTimeout(() => {
      // Customize response for Conversational Interview with specific follow-up questions
      let responseContent = `Here's some guidance for creating your ${topic}. This is a simulated response that would typically include tailored content advice, formatting tips, and platform-specific recommendations.`;
      
      if (topic === "Conversational Interview") {
        responseContent = "Thank you for sharing those details. What challenges did you face during this transaction, and how did you overcome them?";
      }
      
      const aiResponse: Message = {
        sender: 'ai',
        content: responseContent,
        timestamp: new Date(),
        sources: mockSources
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  // Set initial AI message for conversational prompts
  const setInitialAiMessage = useCallback((content: string) => {
    setMessages([
      {
        sender: 'ai',
        content: content,
        timestamp: new Date(),
        sources: mockSources.slice(0, 2)
      }
    ]);
  }, []);

  const allSources = messages
    .filter(msg => msg.sender === 'ai' && msg.sources && msg.sources.length > 0)
    .flatMap(msg => msg.sources || []);

  return {
    messages,
    suggestedQuestions,
    showSuggestions,
    isSourcesPanelOpen,
    activeSourceIndex,
    allSources,
    setActiveSourceIndex,
    toggleSourcesPanel,
    handleSendMessage,
    handleSuggestedQuestion,
    setInitialAiMessage,
    setShowSuggestions
  };
};
