
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ContentSidebar from '../components/ContentSidebar';
import TopicsManager from '../components/content/TopicsManager';
import ChatSessionManager from '../components/content/ChatSessionManager';
import ContentChatInterface from '../components/ContentChatInterface';
import { DEFAULT_CONTENT_TOPICS, DEFAULT_EMOJI_OPTIONS } from '../data/defaultContentTopics';
import { useContentChatSessions } from '../hooks/useContentChatSessions';
import { ContentTopic } from '../components/content/ContentTopicCard';

const ContentAI = () => {
  const [topics, setTopics] = useState<ContentTopic[]>(DEFAULT_CONTENT_TOPICS);
  const location = useLocation();
  
  const chatMatch = location.pathname.match(/\/content\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  const { currentTopic, createNewChatSession } = useContentChatSessions(null, chatId);

  const handleTopicClick = (topic: string) => {
    createNewChatSession(topic);
  };

  const handleBackToTopics = () => {
    window.history.pushState({}, '', '/content');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <ContentSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic ? (
            <ContentChatInterface 
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

export default ContentAI;
