
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
        console.log('Active chats:', activeChats);
        console.log('Looking for chat with path:', `/compliance/chat/${chatId}`);
        
        // First try exact path match
        const currentChat = activeChats.find((chat: any) => 
          chat.path === `/compliance/chat/${chatId}` && !chat.hidden
        );
        
        if (currentChat) {
          console.log('Found chat by path:', currentChat);
          return currentChat.title;
        }
        
        return null;
      }
    } catch (error) {
      console.error('Error parsing active chats from localStorage:', error);
    }
    
    return null;
  };

  const { currentTopic, createNewChatSession } = useComplianceChatSessions(
    getInitialTopic(),
    chatId
  );

  const handleTopicClick = (topic: string) => {
    try {
      const savedChats = localStorage.getItem('complianceActiveChats');
      let activeChats = savedChats ? JSON.parse(savedChats) : [];
      
      console.log('Handling click for topic:', topic);
      console.log('Current active chats:', activeChats);
      
      // Clean existing chats to ensure no duplicates
      activeChats = activeChats.filter((chat: any) => !chat.hidden);
      
      // Look for exact topic match
      const existingChat = activeChats.find((chat: any) => chat.title === topic);
      
      if (existingChat) {
        console.log('Found existing chat:', existingChat);
        navigate(existingChat.path);
      } else {
        console.log('Creating new chat for topic:', topic);
        createNewChatSession(topic);
      }
    } catch (error) {
      console.error('Error handling topic click:', error);
      createNewChatSession(topic);
    }
  };

  const handleBackToTopics = () => {
    navigate('/compliance');
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <Sidebar type="compliance" />
        
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
