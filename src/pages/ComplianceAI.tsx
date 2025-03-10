
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ComplianceChatInterface from '../components/ComplianceChatInterface';
import TopicsManager from '../components/compliance/TopicsManager';
import ChatSessionManager from '../components/compliance/ChatSessionManager';
import { DEFAULT_TOPICS, DEFAULT_EMOJI_OPTIONS } from '../data/defaultTopics';
import { useComplianceChatSessions } from '../hooks/useComplianceChatSessions';
import { ComplianceTopic } from '../components/compliance/TopicCard';

const ComplianceAI = () => {
  const [topics, setTopics] = useState<ComplianceTopic[]>(DEFAULT_TOPICS);
  const location = useLocation();
  
  const chatMatch = location.pathname.match(/\/compliance\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  // Pass null instead of currentTopic, which hasn't been declared yet
  const { currentTopic, createNewChatSession } = useComplianceChatSessions(null, chatId);

  const handleTopicClick = (topic: string) => {
    createNewChatSession(topic);
  };

  const handleBackToTopics = () => {
    // Just navigate to the main compliance page
    window.history.pushState({}, '', '/compliance');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar type="compliance" />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic ? (
            <ComplianceChatInterface 
              topic={currentTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <TopicsManager
              topics={topics}
              setTopics={setTopics}
              onTopicClick={handleTopicClick}
              emojiOptions={DEFAULT_EMOJI_OPTIONS}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceAI;
