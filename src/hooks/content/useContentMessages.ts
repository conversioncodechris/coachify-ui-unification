
import { useState, useCallback } from 'react';
import { Message, Source } from '../../components/content/ContentTypes';

export const useContentMessages = (topic: string) => {
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
  
  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    return userMessage;
  };

  const handleSuggestedQuestion = (question: string) => {
    return handleSendMessage(question);
  };

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

  const addAiMessage = (content: string, additionalSources?: Source[]) => {
    const aiResponse: Message = {
      sender: 'ai',
      content: content,
      timestamp: new Date(),
      sources: additionalSources || mockSources
    };
    
    setMessages(prev => [...prev, aiResponse]);
    return aiResponse;
  };

  const resetMessages = () => {
    setMessages([]);
  };

  const allSources = messages
    .filter(msg => msg.sender === 'ai' && msg.sources && msg.sources.length > 0)
    .flatMap(msg => msg.sources || []);

  return {
    messages,
    setMessages,
    handleSendMessage,
    handleSuggestedQuestion,
    setInitialAiMessage,
    addAiMessage,
    resetMessages,
    allSources,
    mockSources
  };
};
