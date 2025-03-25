
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import ChatHeader from './content/ChatHeader';
import MessageInput from './content/MessageInput';
import SourcesPanel from './content/SourcesPanel';
import ChatMessagesArea from './content/ChatMessagesArea';
import ChatSourceIndicator from './content/ChatSourceIndicator';
import { useContentChat } from '../hooks/useContentChat';
import { ContentAsset } from '@/types/contentAssets';
import { RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  const { toast } = useToast();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [skipSuggestions, setSkipSuggestions] = useState(false);
  
  // Get topic content from local storage if available
  const [topicContent, setTopicContent] = useState<string | null>(null);
  
  // Load topic content
  useEffect(() => {
    // First check contentTopics for content
    const topicsFromStorage = localStorage.getItem('contentTopics');
    if (topicsFromStorage) {
      try {
        const topics = JSON.parse(topicsFromStorage);
        const currentTopic = topics.find((t: any) => t.title === topic);
        if (currentTopic && currentTopic.content) {
          setTopicContent(currentTopic.content);
          return;
        }
      } catch (error) {
        console.error('Error parsing content topics:', error);
      }
    }
    
    // If not found, check contentAssets
    const assetsFromStorage = localStorage.getItem('contentAssets');
    if (assetsFromStorage) {
      try {
        const assets = JSON.parse(assetsFromStorage);
        const topicAsset = assets.find((a: ContentAsset) => 
          a.type === 'prompt' && a.title === topic
        );
        if (topicAsset && topicAsset.content) {
          setTopicContent(topicAsset.content);
          return;
        }
      } catch (error) {
        console.error('Error parsing content assets:', error);
      }
    }
    
    // Set to null if not found
    setTopicContent(null);
  }, [topic]);

  // Check if we should skip suggestions
  useEffect(() => {
    const savedChats = localStorage.getItem('contentActiveChats');
    if (savedChats) {
      try {
        const activeChats = JSON.parse(savedChats);
        const currentPath = location.pathname;
        const matchingChat = activeChats.find((chat: any) => 
          chat.path === currentPath && !chat.hidden
        );
        
        if (matchingChat && matchingChat.skipSuggestions) {
          setSkipSuggestions(true);
        }
      } catch (error) {
        console.error('Error checking skipSuggestions flag:', error);
      }
    }
  }, [location.pathname]);
  
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
    setInitialAiMessage,
    setShowSuggestions
  } = useContentChat(topic);

  // Set initial AI message based on topic content
  useEffect(() => {
    if (topicContent && messages.length === 0) {
      setInitialAiMessage(topicContent);
      
      // If this is a conversational interview with skipSuggestions, hide suggestions
      if (skipSuggestions) {
        setShowSuggestions(false);
      }
    }
  }, [topicContent, messages.length, setInitialAiMessage, skipSuggestions, setShowSuggestions]);

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
          showSuggestions={showSuggestions && !skipSuggestions}
          suggestedQuestions={suggestedQuestions}
          toggleSourcesPanel={toggleSourcesPanel}
          onSuggestedQuestionSelect={handleSuggestedQuestion}
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
