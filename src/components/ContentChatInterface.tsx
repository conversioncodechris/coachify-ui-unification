
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
import ContentOutputPanel from './content/ContentOutputPanel';

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
  
  const [topicContent, setTopicContent] = useState<string | null>(null);
  
  useEffect(() => {
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
    
    setTopicContent(null);
  }, [topic]);

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
    generatedContent,
    showContentOutput,
    setActiveSourceIndex,
    toggleSourcesPanel,
    handleSendMessage,
    handleSuggestedQuestion,
    setInitialAiMessage,
    setShowSuggestions,
    resetConversation,
    setShowContentOutput,
    changeCurrentQuestion
  } = useContentChat(topic);

  const isConversationalInterview = topic === "Conversational Interview → Multi-Platform Output";

  useEffect(() => {
    if (topicContent && messages.length === 0) {
      setInitialAiMessage(topicContent);
      
      if (skipSuggestions) {
        setShowSuggestions(false);
      }
    }
  }, [topicContent, messages.length, setInitialAiMessage, skipSuggestions, setShowSuggestions]);

  useEffect(() => {
    if (!topic) {
      onBackToTopics();
      return;
    }
    
    const savedChats = localStorage.getItem('contentActiveChats');
    if (savedChats) {
      try {
        const activeChats = JSON.parse(savedChats);
        const currentPath = location.pathname;
        const matchingChat = activeChats.find((chat: any) => 
          chat.path === currentPath && !chat.hidden && chat.title === topic
        );
        
        if (!matchingChat) {
          onBackToTopics();
        }
      } catch (error) {
        console.error('Error verifying chat session:', error);
        onBackToTopics();
      }
    } else {
      onBackToTopics();
    }
  }, [topic, navigate, location.pathname, onBackToTopics]);

  const handleNewQuestion = () => {
    if (isConversationalInterview && messages.length > 0) {
      changeCurrentQuestion();
      toast({
        title: "New question selected",
        description: "The interview question has been changed."
      });
    }
  };

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
          onNewQuestion={handleNewQuestion}
          isConversationalInterview={isConversationalInterview}
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
      
      {showContentOutput && generatedContent && (
        <ContentOutputPanel
          content={generatedContent}
          onClose={() => setShowContentOutput(false)}
          onReset={() => {
            setShowContentOutput(false);
            resetConversation();
          }}
        />
      )}
    </div>
  );
};

export default ContentChatInterface;
