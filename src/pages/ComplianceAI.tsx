
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
  const chatMatch = location.pathname.match(/\/compliance\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  const getInitialTopic = () => {
    if (!chatId) return null;
    
    try {
      const savedChats = localStorage.getItem('complianceActiveChats');
      if (savedChats) {
        const activeChats = JSON.parse(savedChats);
        const currentChat = activeChats.find((chat: any) => 
          chat.path === `/compliance/chat/${chatId}`
        );
        return currentChat?.title || null;
      }
    } catch (error) {
      console.error('Error parsing active chats from localStorage:', error);
    }
    
    return null;
  };

  const { currentTopic, createNewChatSession, createEmptyChat } = useComplianceChatSessions(
    getInitialTopic(),
    chatId
  );

  const handleTopicClick = (topic: string) => {
    try {
      const savedChats = localStorage.getItem('complianceActiveChats');
      let activeChats = savedChats ? JSON.parse(savedChats) : [];
      
      // Remove hidden flag from any existing chat with this topic
      activeChats = activeChats.map((chat: any) => 
        chat.title === topic ? { ...chat, hidden: false } : chat
      );
      
      // Look for existing chat with this topic
      const existingChat = activeChats.find((chat: any) => chat.title === topic);
      
      if (existingChat) {
        // Update localStorage with unhidden chat
        localStorage.setItem('complianceActiveChats', JSON.stringify(activeChats));
        navigate(existingChat.path);
      } else {
        createNewChatSession(topic);
      }
    } catch (error) {
      console.error('Error handling topic click:', error);
      createNewChatSession(topic);
    }
  };

  const handleBackToTopics = () => {
    navigate('/compliance', { replace: true });
  };

  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();
    createEmptyChat();
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar 
          type="compliance" 
          onNewChat={handleNewChat}
        />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic && chatId ? (
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
