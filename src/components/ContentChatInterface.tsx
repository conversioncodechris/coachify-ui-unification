import React, { useState } from 'react';
import { Message, Source } from './content/ContentTypes';
import ChatHeader from './content/ChatHeader';
import ChatMessage from './content/ChatMessage';
import MessageInput from './content/MessageInput';
import SourcesPanel from './content/SourcesPanel';
import SuggestedQuestions from './content/SuggestedQuestions';

interface ContentChatInterfaceProps {
  topic: string;
  onBackToTopics: () => void;
}

const ContentChatInterface: React.FC<ContentChatInterfaceProps> = ({ topic, onBackToTopics }) => {
  const suggestedQuestions = [
    `What makes a good ${topic}?`,
    `What length should my ${topic} be?`,
    `How can I make my ${topic} stand out?`,
    `Best practices for ${topic} content?`,
    `What should I avoid in my ${topic}?`
  ];
  
  const [messages, setMessages] = useState<Message[]>([
    {
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
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);
  const [showSuggestions, setShowSuggestions] = useState(true);

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
      const aiResponse: Message = {
        sender: 'ai',
        content: `Here's some guidance for creating your ${topic}. This is a simulated response that would typically include tailored content advice, formatting tips, and platform-specific recommendations.`,
        timestamp: new Date(),
        sources: mockSources
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
    if (!isSourcesPanelOpen) {
      setActiveSourceIndex(0);
    }
  };

  const handleSuggestedQuestion = (question: string) => {
    handleSendMessage(question);
  };

  const allSources = messages
    .filter(msg => msg.sender === 'ai' && msg.sources && msg.sources.length > 0)
    .flatMap(msg => msg.sources || []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 h-full transition-all duration-300 relative">
        <ChatHeader 
          topic={topic}
          onBackToTopics={onBackToTopics}
          isSourcesPanelOpen={isSourcesPanelOpen}
          toggleSourcesPanel={toggleSourcesPanel}
          allSourcesLength={allSources.length}
        />

        <div className="flex-1 overflow-y-auto p-4 pt-20">
          <div className="max-w-3xl mx-auto space-y-6">
            {messages.map((message, index) => (
              <ChatMessage
                key={index}
                content={message.content}
                sender={message.sender}
                sources={message.sources}
                timestamp={message.timestamp}
                toggleSourcesPanel={toggleSourcesPanel}
              />
            ))}
          </div>
          
          {showSuggestions && (
            <SuggestedQuestions
              topic={topic}
              questions={suggestedQuestions}
              onSelectQuestion={handleSuggestedQuestion}
            />
          )}
        </div>

        <MessageInput
          topic={topic}
          onSendMessage={handleSendMessage}
          toggleSourcesPanel={toggleSourcesPanel}
          allSourcesLength={allSources.length}
          isSourcesPanelOpen={isSourcesPanelOpen}
        />
        
        {!isSourcesPanelOpen && allSources.length > 0 && (
          <div 
            className="absolute right-0 top-16 bottom-0 w-1 bg-insta-blue cursor-pointer animate-pulse"
            onClick={toggleSourcesPanel}
          />
        )}
      </div>

      <SourcesPanel
        isOpen={isSourcesPanelOpen}
        togglePanel={toggleSourcesPanel}
        sources={allSources}
        activeSourceIndex={activeSourceIndex}
        setActiveSourceIndex={setActiveSourceIndex}
      />
    </div>
  );
};

export default ContentChatInterface;
