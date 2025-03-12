
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CoachSidebar from '../components/sidebar/CoachSidebar';
import CoachChatInterface from '../components/CoachChatInterface';
import ChatSessionManager from '../components/coach/ChatSessionManager';
import { useCoachChatSessions } from '../hooks/useCoachChatSessions';
import { DEFAULT_COACH_TOPICS, DEFAULT_EMOJI_OPTIONS } from '../data/defaultCoachTopics';
import CoachTopicsManager from '../components/coach/CoachTopicsManager';
import { CoachTopic } from '../components/coach/CoachTopicCard';

const CoachAI = () => {
  const [topics, setTopics] = useState<CoachTopic[]>(DEFAULT_COACH_TOPICS);
  const location = useLocation();
  const navigate = useNavigate();
  
  const chatMatch = location.pathname.match(/\/coach\/chat\/(\d+)/);
  const chatId = chatMatch ? chatMatch[1] : null;
  
  const { currentTopic, createNewChatSession } = useCoachChatSessions(
    null,
    chatId
  );

  const handleTopicClick = (topic: string) => {
    createNewChatSession(topic);
  };

  const handleBackToTopics = () => {
    navigate('/coach', { replace: true });
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="flex flex-1 overflow-hidden pt-16">
        <CoachSidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
          <ChatSessionManager topic={currentTopic} chatId={chatId} />
          
          {currentTopic && chatId ? (
            <CoachChatInterface 
              topic={currentTopic} 
              onBackToTopics={handleBackToTopics} 
            />
          ) : (
            <CoachTopicsManager
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

export default CoachAI;
