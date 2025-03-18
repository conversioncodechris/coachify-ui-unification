import React, { useState, useEffect } from 'react';
import { useToast } from "../../hooks/use-toast";
import { ContentTopic } from './ContentTopicCard';
import TopicsGrid from './TopicsGrid';
import AddTopicDialog from './AddTopicDialog';
import ContentFooter from './ContentFooter';
import { ContentAsset } from '@/types/contentAssets';

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
    description: ''
  });
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  const [processedPromptIds, setProcessedPromptIds] = useState<Set<string>>(new Set());

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
            const existingTopicTitles = new Set(topics.map(topic => topic.title));
            const currentProcessedIds = new Set(processedPromptIds);
            
            const newTopics: ContentTopic[] = [];
            
            filteredPrompts.forEach((prompt: ContentAsset) => {
              if (!currentProcessedIds.has(prompt.id)) {
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

    if (processedPromptIds.size === 0) {
      loadPromptsAsTopics();
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
  }, [topics, setTopics, toast, processedPromptIds]);

  useEffect(() => {
    if (processedPromptIds.size === 0) {
      const customEvent = new Event('contentAssetsUpdated');
      console.log("Manually dispatching contentAssetsUpdated event");
      window.dispatchEvent(customEvent);
    }
  }, [processedPromptIds.size]);

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
      description: ''
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

    setTopics(prevTopics => [{ 
      ...newTopic,
      id: `manual-${Date.now()}`,
      title: newTopic.title.trim(),
      description: newTopic.description.trim(),
      isNew: true
    }, ...prevTopics]);
    
    setIsAddTopicOpen(false);
    
    toast({
      title: "Topic Added",
      description: `"${newTopic.title}" has been added to your topics.`,
    });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 pt-4 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-2xl font-semibold text-insta-text mb-6">Content Creation Topics</h2>
          
          <TopicsGrid 
            topics={topics}
            onTopicClick={onTopicClick}
            onHideTopic={handleHideTopic}
            onTogglePin={handleTogglePin}
            onAddTopicClick={handleAddTopicClick}
          />
        </div>
      </div>
      
      <ContentFooter placeholder="Ask about content creation topics..." />
      
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
