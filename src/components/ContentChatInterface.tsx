
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ChatHeader from './content/ChatHeader';
import MessageInput from './content/MessageInput';
import SourcesPanel from './content/SourcesPanel';
import ChatMessagesArea from './content/ChatMessagesArea';
import ChatSourceIndicator from './content/ChatSourceIndicator';
import { useContentChat } from '../hooks/useContentChat';

interface ContentChatInterfaceProps {
  topic: string;
  onBackToTopics: () => void;
}

const ContentChatInterface: React.FC<ContentChatInterfaceProps> = ({ 
  topic,
  onBackToTopics
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const {
    messages,
    suggestedQuestions,
    showSuggestions,
    isSourcesPanelOpen,
    activeSourceIndex,
    allSources,
    setActiveSourceIndex,
    toggleSourcesPanel,
    handleSendMessage,
    handleSuggestedQuestion,
    handleEditMessage,
    handleDeleteMessage
  } = useContentChat(topic);

  // Check if topic exists and chat session is valid, if not, redirect to content page
  useEffect(() => {
    if (!topic) {
      onBackToTopics();
      return;
    }
    
    // Verify the chat exists in localStorage
    const savedChats = localStorage.getItem('contentActiveChats');
    if (savedChats) {
      try {
        const activeChats = JSON.parse(savedChats);
        const currentPath = location.pathname;
        const matchingChat = activeChats.find((chat: any) => 
          chat.path === currentPath && !chat.hidden && chat.title === topic
        );
        
        if (!matchingChat) {
          // Chat not found, redirect
          onBackToTopics();
        }
      } catch (error) {
        // JSON parse error, redirect
        console.error('Error verifying chat session:', error);
        onBackToTopics();
      }
    } else {
      // No active chats in storage, redirect
      onBackToTopics();
    }
  }, [topic, navigate, location.pathname, onBackToTopics]);

  return (
    <div className="flex h-full">
      <div className={cn(
        "flex flex-col flex-1 h-full transition-all duration-300 relative",
        isSourcesPanelOpen ? "mr-72" : ""
      )}>
        <div className="absolute top-0 left-0 right-0 z-10">
          <ChatHeader 
            topic={topic}
            isSourcesPanelOpen={isSourcesPanelOpen}
            toggleSourcesPanel={toggleSourcesPanel}
            allSourcesLength={allSources.length}
            onBackToTopics={onBackToTopics}
          />
        </div>

        <ChatMessagesArea 
          messages={messages}
          topic={topic}
          showSuggestions={showSuggestions}
          suggestedQuestions={suggestedQuestions}
          toggleSourcesPanel={toggleSourcesPanel}
          onSuggestedQuestionSelect={handleSuggestedQuestion}
          onEditMessage={handleEditMessage}
          onDeleteMessage={handleDeleteMessage}
        />

        <div className="absolute bottom-0 left-0 right-0">
          <MessageInput
            topic={topic}
            onSendMessage={handleSendMessage}
            toggleSourcesPanel={toggleSourcesPanel}
            allSourcesLength={allSources.length}
            isSourcesPanelOpen={isSourcesPanelOpen}
          />
        </div>
        
        <ChatSourceIndicator 
          isVisible={!isSourcesPanelOpen && allSources.length > 0}
          onClick={toggleSourcesPanel}
        />
      </div>

      <SourcesPanel
        isOpen={isSourcesPanelOpen}
        togglePanel={toggleSourcesPanel}
        sources={allSources}
        activeSourceIndex={activeSourceIndex}
        setActiveSourceIndex={setActiveSourceIndex}
      />
    </div>
  );
};

export default ContentChatInterface;
