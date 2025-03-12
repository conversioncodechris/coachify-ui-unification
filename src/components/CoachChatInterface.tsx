
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Message, Source } from './coach/CoachTypes';
import ChatHeader from './compliance/ChatHeader';
import ChatMessage from './compliance/ChatMessage';
import MessageInput from './compliance/MessageInput';
import SourcesPanel from './compliance/SourcesPanel';
import SuggestedQuestions from './compliance/SuggestedQuestions';

interface CoachChatInterfaceProps {
  topic: string;
  onBackToTopics: () => void;
}

const CoachChatInterface: React.FC<CoachChatInterfaceProps> = ({ topic, onBackToTopics }) => {
  const topicQuestions = [
    `How can I improve my ${topic} skills?`,
    `What are the best practices for ${topic}?`,
    `Common mistakes to avoid in ${topic}?`,
    `How to handle difficult clients when discussing ${topic}?`,
    `Tips for explaining ${topic} to new real estate agents?`
  ];
  
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      content: `Welcome to the ${topic} coaching session! How can I help you improve in this area today?`,
      timestamp: new Date(),
      sources: [
        {
          title: 'Real Estate Coaching Best Practices',
          content: 'These coaching materials are designed to help real estate professionals improve their skills and grow their business.',
          url: 'https://example.com/coaching-best-practices'
        },
        {
          title: 'Agent Success Stories',
          content: 'Learn from successful agents who have mastered these skills and techniques.',
          url: 'https://example.com/success-stories'
        }
      ]
    }
  ]);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const mockSources: Source[] = [
    {
      title: 'Real Estate Coaching Best Practices',
      content: 'These coaching materials are designed to help real estate professionals improve their skills and grow their business.',
      url: 'https://example.com/coaching-best-practices'
    },
    {
      title: 'Agent Success Stories',
      content: 'Learn from successful agents who have mastered these skills and techniques.',
      url: 'https://example.com/success-stories'
    },
    {
      title: 'Training Resources',
      content: 'Access to training materials, scripts, and role-playing scenarios for real estate professionals.',
      url: 'https://example.com/training-resources'
    },
    {
      title: 'Industry Research',
      content: 'Latest research and data on effective coaching techniques in the real estate industry.',
      url: 'https://example.com/industry-research'
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
        content: `Thank you for your question about ${topic}. Here's some coaching advice that might help you improve in this area...`,
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
    <div className="flex h-full">
      <div className={cn(
        "flex flex-col flex-1 h-full transition-all duration-300 relative",
        isSourcesPanelOpen ? "mr-72" : ""
      )}>
        <div className="absolute top-0 left-0 right-0 z-10">
          <ChatHeader 
            topic={topic}
            onBackToTopics={onBackToTopics}
            isSourcesPanelOpen={isSourcesPanelOpen}
            toggleSourcesPanel={toggleSourcesPanel}
            allSourcesLength={allSources.length}
          />
        </div>

        <div className="flex-1 overflow-y-auto p-4 pt-[64px] pb-32">
          <div className="max-w-3xl mx-auto space-y-6 mt-4">
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
              questions={topicQuestions}
              onSelectQuestion={handleSuggestedQuestion}
            />
          )}
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <MessageInput
            topic={topic}
            onSendMessage={handleSendMessage}
            toggleSourcesPanel={toggleSourcesPanel}
            allSourcesLength={allSources.length}
            isSourcesPanelOpen={isSourcesPanelOpen}
          />
        </div>
        
        {!isSourcesPanelOpen && allSources.length > 0 && (
          <div 
            className="absolute right-0 top-[64px] bottom-0 w-1 bg-gray-300 cursor-pointer animate-pulse"
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

export default CoachChatInterface;
