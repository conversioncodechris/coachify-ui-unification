
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
import { AlertCircle, RefreshCw } from 'lucide-react';
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
  const [promptAssets, setPromptAssets] = useState<ContentAsset[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
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
    handleSuggestedQuestion
  } = useContentChat(topic);

  // Load prompt assets from localStorage
  const loadPromptAssets = () => {
    const storedAssets = localStorage.getItem('contentAssets');
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        // Filter assets to only show prompts
        const prompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
        setPromptAssets(prompts);
      } catch (error) {
        console.error('Error parsing content assets:', error);
      }
    } else {
      // If no contentAssets, set empty array
      setPromptAssets([]);
    }
  };

  // Load prompt assets initially
  useEffect(() => {
    loadPromptAssets();
  }, []);

  const handleRefreshAssets = () => {
    setIsRefreshing(true);
    // Re-load prompt assets
    loadPromptAssets();
    
    // Show loading spinner for a moment
    setTimeout(() => {
      setIsRefreshing(false);
      toast({
        title: "Assets Refreshed",
        description: `${promptAssets.length} prompts available.`,
      });
    }, 500);
  };

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
          
          {/* Prompt assets banner - only show if there are prompts */}
          {promptAssets.length > 0 && (
            <div className="bg-blue-50 px-4 py-2 border-b flex items-center justify-between overflow-x-auto">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Available Prompts:</span>
                <div className="flex gap-1 overflow-x-auto">
                  {promptAssets.map((asset) => (
                    <Badge key={asset.id} variant="outline" className="whitespace-nowrap flex items-center gap-1">
                      <span>{asset.icon}</span>
                      <span className="max-w-40 truncate">{asset.title}</span>
                    </Badge>
                  ))}
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleRefreshAssets}
                disabled={isRefreshing}
                className="h-8 w-8 p-0"
              >
                <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              </Button>
            </div>
          )}
        </div>

        <ChatMessagesArea 
          messages={messages}
          topic={topic}
          showSuggestions={showSuggestions}
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
