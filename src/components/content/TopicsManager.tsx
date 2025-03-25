import React, { useState, useEffect } from 'react';
import { useToast } from "../../hooks/use-toast";
import { ContentTopic } from './ContentTopicCard';
import TopicsGrid from './TopicsGrid';
import AddTopicDialog from './AddTopicDialog';
import ContentFooter from './ContentFooter';
import { ContentAsset } from '@/types/contentAssets';
import { Plus, MessageSquare } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { addConversationalPrompt } from '@/components/settings/prompts/addConversationalPrompt';
import { Card } from '@/components/ui/card';

interface TopicsManagerProps {
  topics: ContentTopic[];
  setTopics: React.Dispatch<React.SetStateAction<ContentTopic[]>>;
  onTopicClick: (title: string) => void;
  emojiOptions: string[];
}

const TopicsManager: React.FC<TopicsManagerProps> = ({
  topics,
  setTopics,
  onTopicClick,
  emojiOptions
}) => {
  const { toast } = useToast();
  const [newTopic, setNewTopic] = useState<ContentTopic>({
    id: `manual-${Date.now()}`,
    icon: '📝',
    title: '',
    description: '',
    content: '',
    purpose: 'Open House',
    platforms: []
  });
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  const [processedPromptIds, setProcessedPromptIds] = useState<Set<string>>(new Set());
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadPromptsAsTopics = () => {
      console.log("Loading prompts as topics...");
      const storedAssets = localStorage.getItem('contentAssets');
      
      if (storedAssets) {
        try {
          console.log("Parsing stored assets:", storedAssets);
          const assets = JSON.parse(storedAssets);
          
          const filteredPrompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
          setPrompts(filteredPrompts);
          console.log("Found prompts:", filteredPrompts.length);
          
          if (filteredPrompts.length > 0) {
            const existingTopicIds = new Set(topics.map(topic => topic.id));
            const currentProcessedIds = new Set(processedPromptIds);
            
            const newTopics: ContentTopic[] = [];
            
            filteredPrompts.forEach((prompt: ContentAsset) => {
              if (!currentProcessedIds.has(prompt.id) && !existingTopicIds.has(prompt.id)) {
                console.log("Converting prompt to topic:", prompt.title);
                newTopics.push({
                  id: prompt.id,
                  icon: prompt.icon || '📝',
                  title: prompt.title,
                  description: prompt.subtitle || 'Prompt-based topic',
                  isNew: prompt.isNew || true
                });
                
                currentProcessedIds.add(prompt.id);
              }
            });
            
            console.log("New topics to add:", newTopics.length);
            
            if (newTopics.length > 0) {
              setProcessedPromptIds(currentProcessedIds);
              setTopics(prevTopics => [...newTopics, ...prevTopics]);
              
              toast({
                title: "New topics added",
                description: `${newTopics.length} topics created from your prompts.`,
              });
            }
          }
        } catch (error) {
          console.error('Error parsing content assets:', error);
        }
      }
    };

    if (isInitialLoad) {
      loadPromptsAsTopics();
      setIsInitialLoad(false);
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'contentAssets') {
        console.log("Storage event detected, reloading prompts...");
        loadPromptsAsTopics();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleCustomEvent = () => {
      console.log("Custom event detected, reloading prompts...");
      loadPromptsAsTopics();
    };
    
    window.addEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    };
  }, [topics, setTopics, toast, processedPromptIds, isInitialLoad]);

  const handleHideTopic = (topicId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      return prevTopics.map(topic => 
        topic.id === topicId ? { ...topic, hidden: true } : topic
      );
    });
    
    toast({
      title: "Topic Hidden",
      description: "The topic has been hidden from view.",
    });
  };

  const handleTogglePin = (topicId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      return prevTopics.map(topic => 
        topic.id === topicId ? { ...topic, pinned: !topic.pinned } : topic
      );
    });
  };

  const handleAddTopicClick = () => {
    setNewTopic({
      id: `manual-${Date.now()}`,
      icon: '📝',
      title: '',
      description: '',
      content: '',
      purpose: 'Open House',
      platforms: []
    });
    setIsAddTopicOpen(true);
  };
  
  const handleAddTopicSubmit = () => {
    if (!newTopic.title.trim() || !newTopic.description.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    if (newTopic.title.includes('\n') || newTopic.description.includes('\n')) {
      toast({
        title: "Invalid format",
        description: "Title and description must be single line text.",
      });
      return;
    }

    const newPromptAsset: ContentAsset = {
      id: `manual-${Date.now()}`,
      type: 'prompt',
      title: newTopic.title.trim(),
      subtitle: newTopic.description.trim(),
      icon: newTopic.icon,
      source: "created",
      dateAdded: new Date(),
      content: newTopic.content || "",
      isNew: true,
      aiType: "content",
      metadata: {
        purpose: newTopic.purpose,
        platforms: newTopic.platforms
      }
    };
    
    const storageKey = 'contentAssets';
    let existingAssets: ContentAsset[] = [];
    
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        existingAssets = JSON.parse(storedAssets);
      } catch (error) {
        console.error(`Error parsing ${storageKey}:`, error);
      }
    }
    
    existingAssets.push(newPromptAsset);
    localStorage.setItem(storageKey, JSON.stringify(existingAssets));

    setTopics(prevTopics => [{ 
      ...newTopic,
      id: newPromptAsset.id,
      title: newTopic.title.trim(),
      description: newTopic.description.trim(),
      isNew: true
    }, ...prevTopics]);
    
    setIsAddTopicOpen(false);
    
    const customEvent = new Event('contentAssetsUpdated');
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Prompt Added",
      description: `"${newTopic.title}" has been added to your topics.`,
    });
  };

  const handleAddConversationalPrompt = () => {
    try {
      const newPrompt = addConversationalPrompt();
      
      if (newPrompt) {
        toast({
          title: "Conversational Prompt Added",
          description: "Your new conversational prompt is ready to use.",
        });
        
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
      } else {
        toast({
          title: "Already Exists",
          description: "This conversational prompt is already in your collection.",
        });
      }
    } catch (error) {
      console.error("Error adding conversational prompt:", error);
      toast({
        title: "Error",
        description: "Failed to add conversational prompt. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 pt-4 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-insta-text">Content Creation Prompts</h2>
            <Button onClick={handleAddTopicClick} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Prompt
            </Button>
          </div>
          
          <Card className="mb-6 p-4 border-dashed border-2 bg-purple-50/50">
            <div className="flex items-center gap-4">
              <div className="text-3xl">🎙️</div>
              <div className="flex-1">
                <h3 className="font-medium text-lg">Try Conversational Interview</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Turn a casual conversation into content for multiple platforms
                </p>
                <Button 
                  onClick={handleAddConversationalPrompt}
                  size="sm"
                  className="bg-purple-100 text-purple-800 hover:bg-purple-200 flex items-center gap-1"
                >
                  <MessageSquare className="h-4 w-4" />
                  Add to My Prompts
                </Button>
              </div>
            </div>
          </Card>
          
          <TopicsGrid 
            topics={topics}
            onTopicClick={onTopicClick}
            onHideTopic={handleHideTopic}
            onTogglePin={handleTogglePin}
            onAddTopicClick={handleAddTopicClick}
          />
        </div>
      </div>
      
      <ContentFooter placeholder="Ask about content creation prompts..." />
      
      <AddTopicDialog 
        isOpen={isAddTopicOpen}
        onOpenChange={setIsAddTopicOpen}
        newTopic={newTopic}
        setNewTopic={setNewTopic}
        onSubmit={handleAddTopicSubmit}
        emojiOptions={emojiOptions}
      />
    </>
  );
};

export default TopicsManager;
