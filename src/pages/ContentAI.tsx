
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentSidebar from '../components/sidebar/ContentSidebar';
import TopicsManager from '../components/content/TopicsManager';
import ChatSessionManager from '../components/content/ChatSessionManager';
import ContentChatInterface from '../components/ContentChatInterface';
import { DEFAULT_CONTENT_TOPICS, DEFAULT_EMOJI_OPTIONS } from '../data/defaultContentTopics';
import { useContentChatSessions } from '../hooks/useContentChatSessions';
import { ContentTopic } from '../components/content/ContentTopicCard';
import { useContentSidebar } from '../hooks/useContentSidebar';

const ContentAI = () => {
  const [topics, setTopics] = useState<ContentTopic[]>(DEFAULT_CONTENT_TOPICS);
  const location = useLocation();
  const navigate = useNavigate();
  
  const chatMatch = location.pathname.match(/\/content\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  const { currentTopic, createNewChatSession } = useContentChatSessions(
    null,
    chatId
  );

  const { activeChats, setActiveChats } = useContentSidebar();

  // Load active chats from localStorage when on the main content page
  useEffect(() => {
    if (!chatId) {
      const savedChats = localStorage.getItem('contentActiveChats');
      if (savedChats) {
        try {
          const chats = JSON.parse(savedChats);
          if (Array.isArray(chats)) {
            setActiveChats(chats);
          } else {
            // Invalid data structure, clear localStorage
            localStorage.removeItem('contentActiveChats');
            setActiveChats([]);
          }
        } catch (error) {
          console.error('Error parsing active chats:', error);
          localStorage.removeItem('contentActiveChats');
          setActiveChats([]);
        }
      } else {
        setActiveChats([]);
      }
    }
  }, [chatId, setActiveChats]);

  // Handle browser navigation events
  useEffect(() => {
    const handleBeforeUnload = () => {
      // Ensure localStorage is in sync with current state before page changes
      if (!location.pathname.includes('/content/chat/')) {
        localStorage.removeItem('contentActiveChats');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [location.pathname]);

  const handleTopicClick = (topic: string) => {
    createNewChatSession(topic);
  };
  
  const handleBackToTopics = () => {
    // Clear localStorage for content chats
    localStorage.removeItem('contentActiveChats');
    
    // Force navigation with replace to prevent history issues
    navigate('/content', { replace: true });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <ContentSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic && chatId ? (
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
