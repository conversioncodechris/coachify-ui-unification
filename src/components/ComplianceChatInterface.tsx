
import React, { useState } from 'react';
import { getQuestionsForTopic } from '@/data/complianceQuestions';
import { cn } from '@/lib/utils';
import { Message, Source } from './content/ContentTypes';
import ChatHeader from './compliance/ChatHeader';
import ChatMessage from './compliance/ChatMessage';
import MessageInput from './compliance/MessageInput';
import SourcesPanel from './compliance/SourcesPanel';
import SuggestedQuestions from './compliance/SuggestedQuestions';

interface ComplianceChatInterfaceProps {
  topic: string;
  onBackToTopics: () => void;
}

const ComplianceChatInterface: React.FC<ComplianceChatInterfaceProps> = ({ topic, onBackToTopics }) => {
  const topicQuestions = getQuestionsForTopic(topic);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'ai',
      content: `Welcome to the ${topic} topic! Here are some common questions you might have:`,
      timestamp: new Date(),
      sources: [
        {
          title: 'Fair Housing Act',
          content: 'The Fair Housing Act is a federal law that prohibits discrimination in housing based on race, color, national origin, religion, sex, familial status, or disability.',
          url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_act_overview'
        },
        {
          title: 'Recent Legal Precedents',
          content: 'This fictitious source contains information about recent court cases affecting real estate compliance requirements and best practices for agents.',
          url: 'https://example.com/legal-precedents'
        }
      ]
    }
  ]);
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);
  const [showSuggestions, setShowSuggestions] = useState(true);

  const mockSources: Source[] = [
    {
      title: 'Fair Housing Act',
      content: 'The Fair Housing Act is a federal law that prohibits discrimination in housing based on race, color, national origin, religion, sex, familial status, or disability.',
      url: 'https://www.hud.gov/program_offices/fair_housing_equal_opp/fair_housing_act_overview'
    },
    {
      title: 'NAR Code of Ethics',
      content: 'The National Association of REALTORS® Code of Ethics establishes standards of ethical conduct for real estate professionals.',
      url: 'https://www.nar.realtor/about-nar/governing-documents/code-of-ethics/2022-code-of-ethics-standards-of-practice'
    },
    {
      title: 'State Real Estate Commission',
      content: 'State licensing laws and regulations govern real estate practice within each jurisdiction.',
      url: 'https://www.arello.org/regulatory-agencies/'
    },
    {
      title: 'Recent Legal Precedents',
      content: 'This fictitious source contains information about recent court cases affecting real estate compliance requirements and best practices for agents.',
      url: 'https://example.com/legal-precedents'
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
        content: `Thank you for your question about ${topic}. This is a simulated response that would typically come from the AI assistant with helpful information about this real estate compliance topic.`,
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
    <div className="flex h-full pt-16 pb-[120px]">
      <div className={cn(
        "flex flex-col flex-1 h-full transition-all duration-300 relative",
        isSourcesPanelOpen ? "mr-72" : ""
      )}>
        <ChatHeader 
          topic={topic}
          onBackToTopics={onBackToTopics}
          isSourcesPanelOpen={isSourcesPanelOpen}
          toggleSourcesPanel={toggleSourcesPanel}
          allSourcesLength={allSources.length}
        />

        <div className="flex-1 overflow-y-auto p-4 mt-16">
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
              questions={topicQuestions}
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

export default ComplianceChatInterface;
