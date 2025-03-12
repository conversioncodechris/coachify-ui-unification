
import { useState, useEffect } from 'react';
import { Message, Source } from '../components/content/ContentTypes';
import { v4 as uuidv4 } from 'uuid';

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

  const [messages, setMessages] = useState<Message[]>([
    {
      id: uuidv4(),
      sender: 'ai',
      content: `Welcome to the ${topic} content creation! What kind of content would you like to create today?`,
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
  
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
    if (!isSourcesPanelOpen) {
      setActiveSourceIndex(0);
    }
  };

  const handleEditMessage = (id: string, newContent: string) => {
    setMessages(prevMessages => 
      prevMessages.map(message => 
        message.id === id ? { ...message, content: newContent } : message
      )
    );
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prevMessages => prevMessages.filter(message => message.id !== id));
  };

  const handleSendMessage = (message: string) => {
    if (!message.trim()) return;
    
    const userMessage: Message = {
      id: uuidv4(),
      sender: 'user',
      content: message,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setShowSuggestions(false);
    
    setTimeout(() => {
      const aiResponse: Message = {
        id: uuidv4(),
        sender: 'ai',
        content: `Here's some guidance for creating your ${topic}. This is a simulated response that would typically include tailored content advice, formatting tips, and platform-specific recommendations.`,
        timestamp: new Date(),
        sources: mockSources
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

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
    handleEditMessage,
    handleDeleteMessage
  };
};
