import React from 'react';
import CoachChatInterface from '../components/CoachChatInterface';
import CoachSidebar from '../components/sidebar/CoachSidebar';
import { useCoachChatSessions } from '../hooks/useCoachChatSessions';
import { useCoachSidebar } from '../hooks/useCoachSidebar';
import ChatSessionManager from '../components/coach/ChatSessionManager';
import CoachTopicsManager from '../components/coach/CoachTopicsManager';
import { DEFAULT_COACH_TOPICS } from '../data/defaultCoachTopics';
import useMediaQuery from '../hooks/use-mobile';
// Correct the import to use the types from CoachTypes.ts
import { CoachTopic } from '../components/coach/CoachTypes';

const CoachAI: React.FC = () => {
  const isMobile = useMediaQuery(768);
  const {
    chatInterfaceVisible,
    toggleChatInterfaceVisibility,
    selectedSession,
    setSelectedSession,
  } = useCoachSidebar();
  const { chatSessions, addSession, updateSession, deleteSession } = useCoachChatSessions();

  const [coachTopics, setCoachTopics] = React.useState<CoachTopic[]>(DEFAULT_COACH_TOPICS);

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
      <CoachSidebar
        chatSessions={chatSessions}
        selectedSession={selectedSession}
        setSelectedSession={setSelectedSession}
        toggleChatInterfaceVisibility={toggleChatInterfaceVisibility}
        deleteSession={deleteSession}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Chat Interface or Topics Manager */}
        {chatInterfaceVisible && selectedSession ? (
          <CoachChatInterface
            session={selectedSession}
            updateSession={updateSession}
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
      {isMobile && (
        <ChatSessionManager
          chatSessions={chatSessions}
          selectedSession={selectedSession}
          setSelectedSession={setSelectedSession}
          addSession={addSession}
          updateSession={updateSession}
          deleteSession={deleteSession}
          chatInterfaceVisible={chatInterfaceVisible}
          toggleChatInterfaceVisibility={toggleChatInterfaceVisibility}
        />
      )}
    </div>
  );
};

export default CoachAI;
