
import React, { useState } from 'react';
import CoachChatInterface from '../components/CoachChatInterface';
import CoachSidebar from '../components/sidebar/CoachSidebar';
import ChatSessionManager from '../components/coach/ChatSessionManager';
import CoachTopicsManager from '../components/coach/CoachTopicsManager';
import { DEFAULT_COACH_TOPICS } from '../data/defaultCoachTopics';
import { useIsMobile } from '../hooks/use-mobile';
import { CoachTopic } from '../components/coach/CoachTypes';
import { useToast } from '../hooks/use-toast';

interface ChatSession {
  id: string;
  title: string;
  messages: any[];
}

const CoachAI: React.FC = () => {
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // State for chat interface visibility
  const [chatInterfaceVisible, setChatInterfaceVisible] = useState(false);
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);
  const [chatSessions, setChatSessions] = useState<ChatSession[]>([]);
  const [coachTopics, setCoachTopics] = useState<CoachTopic[]>(DEFAULT_COACH_TOPICS);

  // Toggle chat interface visibility
  const toggleChatInterfaceVisibility = () => {
    setChatInterfaceVisible(!chatInterfaceVisible);
  };

  // Session management functions
  const addSession = (session: ChatSession) => {
    setChatSessions([...chatSessions, session]);
  };

  const updateSession = (updatedSession: ChatSession) => {
    setChatSessions(chatSessions.map(session => 
      session.id === updatedSession.id ? updatedSession : session
    ));
  };

  const deleteSession = (sessionId: string) => {
    setChatSessions(chatSessions.filter(session => session.id !== sessionId));
    
    if (selectedSession?.id === sessionId) {
      setSelectedSession(null);
      setChatInterfaceVisible(false);
    }
    
    toast({
      title: "Session deleted",
      description: "Your coaching session has been removed.",
    });
  };

  const handleTopicClick = (title: string) => {
    if (!chatInterfaceVisible) {
      toggleChatInterfaceVisibility();
    }

    const existingSession = chatSessions.find(session => session.title === title);

    if (existingSession) {
      setSelectedSession(existingSession);
    } else {
      const newSession = {
        id: Date.now().toString(),
        title: title,
        messages: []
      };
      addSession(newSession);
      setSelectedSession(newSession);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <CoachSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Interface or Topics Manager */}
        {chatInterfaceVisible && selectedSession ? (
          <CoachChatInterface 
            topic={selectedSession.title} 
            onBackToTopics={() => {
              setSelectedSession(null);
              toggleChatInterfaceVisibility();
            }} 
          />
        ) : (
          <CoachTopicsManager
            topics={coachTopics}
            setTopics={setCoachTopics}
            onTopicClick={handleTopicClick}
          />
        )}
      </div>

      {/* Chat Session Manager (Mobile Only) */}
      {isMobile && selectedSession && (
        <ChatSessionManager 
          topic={selectedSession.title} 
          chatId={selectedSession.id}
        />
      )}
    </div>
  );
};

export default CoachAI;
