
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ContentSidebar from '../components/sidebar/ContentSidebar'; // Updated import
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
  
  const initialTopic = chatId ? null : null;

  const { currentTopic, createNewChatSession } = useContentChatSessions(
    initialTopic,
    chatId
  );

  const { activeChats, setActiveChats } = useContentSidebar();

  useEffect(() => {
    if (!chatId) {
      const savedChats = localStorage.getItem('contentActiveChats');
      if (savedChats) {
        try {
          const chats = JSON.parse(savedChats);
          setActiveChats(chats);
        } catch (error) {
          console.error('Error parsing active chats:', error);
        }
      }
    }
  }, [chatId, setActiveChats]);

  const handleTopicClick = (topic: string) => {
    const savedChats = localStorage.getItem('contentActiveChats');
    let activeChats = savedChats ? JSON.parse(savedChats) : [];
    
    const existingChat = activeChats.find((chat: any) => 
      chat.title === topic && !chat.hidden
    );
    
    if (existingChat) {
      navigate(existingChat.path, { replace: true });
    } else {
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
