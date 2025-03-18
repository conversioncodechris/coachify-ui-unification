
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
    icon: '📝',
    title: '',
    description: ''
  });
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  const [processedPromptIds, setProcessedPromptIds] = useState<Set<string>>(new Set());

  // Load prompt assets from localStorage and convert to topic cards
  useEffect(() => {
    const loadPromptsAsTopics = () => {
      console.log("Loading prompts as topics...");
      const storedAssets = localStorage.getItem('contentAssets');
      
      if (storedAssets) {
        try {
          console.log("Parsing stored assets:", storedAssets);
          const assets = JSON.parse(storedAssets);
          
          // Filter assets to only show prompts
          const filteredPrompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
          setPrompts(filteredPrompts);
          console.log("Found prompts:", filteredPrompts.length);
          
          if (filteredPrompts.length > 0) {
            // Get existing topic titles for duplicate checking
            const existingTopicTitles = new Set(topics.map(topic => topic.title));
            
            // Create a set of processed prompt IDs
            const currentProcessedIds = new Set(processedPromptIds);
            
            // Convert prompts to topics, but only if they don't already exist and haven't been processed before
            const newTopics: ContentTopic[] = [];
            
            filteredPrompts.forEach((prompt: ContentAsset) => {
              // Only process this prompt if we haven't seen its ID before
              if (!currentProcessedIds.has(prompt.id)) {
                console.log("Converting prompt to topic:", prompt.title);
                newTopics.push({
                  id: prompt.id, // Store the original asset ID
                  icon: prompt.icon || '📝',
                  title: prompt.title,
                  description: prompt.subtitle || 'Prompt-based topic',
                  isNew: prompt.isNew || true // Ensure isNew is set, defaulting to true if not present
                });
                
                // Mark this prompt as processed
                currentProcessedIds.add(prompt.id);
              }
            });
            
            console.log("New topics to add:", newTopics.length);
            
            if (newTopics.length > 0) {
              // Update the processed IDs
              setProcessedPromptIds(currentProcessedIds);
              
              // Update the state with new topics - ADD TOPICS TO THE BEGINNING of the array
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

    // Initial load - only run once
    if (processedPromptIds.size === 0) {
      loadPromptsAsTopics();
    }
    
    // Add event listener for storage changes from other tabs/windows
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'contentAssets') {
        console.log("Storage event detected, reloading prompts...");
        loadPromptsAsTopics();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Add listener for custom events within the same window
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

  // Re-check for new prompts only when the component mounts
  useEffect(() => {
    // Manually trigger a check for new prompts when component mounts
    if (processedPromptIds.size === 0) {
      const customEvent = new Event('contentAssetsUpdated');
      console.log("Manually dispatching contentAssetsUpdated event");
      window.dispatchEvent(customEvent);
    }
  }, [processedPromptIds.size]);

  const handleHideTopic = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      // Make sure that the topic at this index is marked as hidden
      if (index >= 0 && index < updatedTopics.length) {
        updatedTopics[index] = { ...updatedTopics[index], hidden: true };
      }
      return updatedTopics;
    });
    
    toast({
      title: "Topic Hidden",
      description: "The topic has been hidden from view.",
    });
  };

  const handleTogglePin = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      // Make sure the index is valid before toggling
      if (index >= 0 && index < updatedTopics.length) {
        updatedTopics[index] = { 
          ...updatedTopics[index], 
          pinned: !updatedTopics[index].pinned 
        };
      }
      return updatedTopics;
    });
  };

  const handleAddTopicClick = () => {
    setNewTopic({
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

    // Add new manually-created topic to the BEGINNING of the array
    setTopics(prevTopics => [{ 
      ...newTopic,
      id: `manual-${Date.now()}`, // Generate a unique ID for manually created topics
      title: newTopic.title.trim(),
      description: newTopic.description.trim(),
      isNew: true // Mark manually-created topics as new
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
