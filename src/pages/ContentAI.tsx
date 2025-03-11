
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentSidebar from '../components/ContentSidebar';
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
  
  const getInitialTopic = () => {
    if (!chatId) return null;
    
    try {
      const savedChats = localStorage.getItem('contentActiveChats');
      if (savedChats) {
        const activeChats = JSON.parse(savedChats);
        const currentChat = activeChats.find((chat: any) => 
          chat.path === `/content/chat/${chatId}`
        );
        return currentChat?.title || null;
      }
    } catch (error) {
      console.error('Error parsing active chats from localStorage:', error);
    }
    
    return null;
  };

  const { currentTopic, createNewChatSession } = useContentChatSessions(
    getInitialTopic(),
    chatId
  );

  const { activeChats, setActiveChats } = useContentSidebar();

  useEffect(() => {
    const savedChats = localStorage.getItem('contentActiveChats');
    if (savedChats) {
      try {
        setActiveChats(JSON.parse(savedChats));
      } catch (error) {
        console.error('Error parsing active chats:', error);
      }
    }
  }, [location.pathname, setActiveChats]);

  const handleTopicClick = (topic: string) => {
    try {
      const savedChats = localStorage.getItem('contentActiveChats');
      let activeChats = savedChats ? JSON.parse(savedChats) : [];
      
      activeChats = activeChats.map((chat: any) => 
        chat.title === topic ? { ...chat, hidden: false } : chat
      );
      
      const existingChat = activeChats.find((chat: any) => chat.title === topic);
      
      if (existingChat) {
        localStorage.setItem('contentActiveChats', JSON.stringify(activeChats));
        navigate(existingChat.path);
      } else {
        createNewChatSession(topic);
      }
    } catch (error) {
      console.error('Error handling topic click:', error);
      createNewChatSession(topic);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <ContentSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic && chatId ? (
            <ContentChatInterface topic={currentTopic} />
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
