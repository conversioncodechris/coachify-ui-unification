import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ComplianceChatInterface from '../components/ComplianceChatInterface';
import TopicsManager from '../components/compliance/TopicsManager';
import ChatSessionManager from '../components/compliance/ChatSessionManager';
import { ComplianceTopic } from '../components/compliance/TopicCard';

const EMOJI_OPTIONS = [
  '📝', '🏠', '⚖️', '🤝', '💰', '📱', '🔒', '🌎', '📊', '📋', 
  '🔍', '💼', '🏘️', '🧾', '🔐', '📣', '🔔', '💡', '📚', '🛡️'
];

const ComplianceAI = () => {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  const chatMatch = location.pathname.match(/\/compliance\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  useEffect(() => {
    if (chatId) {
      const savedChats = localStorage.getItem('complianceActiveChats');
      if (savedChats) {
        const activeChats = JSON.parse(savedChats);
        const currentChat = activeChats.find((chat: {title: string, path: string, hidden?: boolean}) => 
          chat.path.includes(chatId) && !chat.hidden
        );
        
        if (currentChat) {
          setSelectedTopic(currentChat.title);
        }
      }
    } else {
      setSelectedTopic(null);
    }
  }, [chatId, location.pathname]);

  const [topics, setTopics] = useState<ComplianceTopic[]>([
    {
      icon: '🏠',
      title: 'Fair Housing Laws',
      description: 'Anti-discrimination requirements'
    },
    {
      icon: '📝',
      title: 'Disclosure Requirements',
      description: 'Property condition and material facts'
    },
    {
      icon: '⚖️',
      title: 'License Law',
      description: 'State licensing requirements'
    },
    {
      icon: '🤝',
      title: 'Agency Relationships',
      description: 'Fiduciary duties and client representation'
    },
    {
      icon: '💰',
      title: 'Commissions & Compensation',
      description: 'Regulatory guidelines on fees'
    },
    {
      icon: '📱',
      title: 'Digital Marketing Compliance',
      description: 'Online advertising rules'
    },
    {
      icon: '🔒',
      title: 'Data Privacy',
      description: 'Client information protection'
    },
    {
      icon: '🌎',
      title: 'Environmental Regulations',
      description: 'Hazards and property conditions'
    },
    {
      icon: '📊',
      title: 'Antitrust Compliance',
      description: 'Competition and price-fixing issues'
    },
    {
      icon: '📋',
      title: 'Contracts & Forms',
      description: 'Legal document requirements'
    },
    {
      icon: '🔍',
      title: 'RESPA Compliance',
      description: 'Real Estate Settlement Procedures Act rules'
    },
    {
      icon: '💼',
      title: 'Broker Supervision',
      description: 'Requirements for managing agents'
    },
    {
      icon: '🏘️',
      title: 'Property Management Laws',
      description: 'Landlord-tenant regulations'
    },
    {
      icon: '🧾',
      title: 'Tax Compliance',
      description: 'Real estate tax reporting requirements'
    },
    {
      icon: '🔐',
      title: 'Wire Fraud Prevention',
      description: 'Security protocols for transactions'
    },
    {
      icon: '📣',
      title: 'Advertising Regulations',
      description: 'Truth in advertising requirements'
    }
  ]);

  const handleTopicClick = (topic: string) => {
    setSelectedTopic(topic);
  };

  const handleBackToTopics = () => {
    setSelectedTopic(null);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar type="compliance" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={selectedTopic} chatId={chatId} />
          
          {selectedTopic ? (
            <ComplianceChatInterface 
              topic={selectedTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <TopicsManager
              topics={topics}
              setTopics={setTopics}
              onTopicClick={handleTopicClick}
              emojiOptions={EMOJI_OPTIONS}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAI;
