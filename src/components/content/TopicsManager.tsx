
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

  // Load prompt assets from localStorage and convert to topic cards
  useEffect(() => {
    const loadPromptsAsTopics = () => {
      const storedAssets = localStorage.getItem('contentAssets');
      if (storedAssets) {
        try {
          const assets = JSON.parse(storedAssets);
          // Filter assets to only show prompts
          const prompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
          
          // Convert prompts to topics if they don't already exist
          if (prompts.length > 0) {
            setTopics(prevTopics => {
              const existingTitles = prevTopics.map(topic => topic.title);
              
              const newTopicsFromPrompts = prompts
                .filter((prompt: ContentAsset) => !existingTitles.includes(prompt.title))
                .map((prompt: ContentAsset) => ({
                  icon: prompt.icon || '📝',
                  title: prompt.title,
                  description: prompt.subtitle || 'Prompt-based topic', // Fix: Use subtitle instead of description
                  isNew: true
                }));
                
              if (newTopicsFromPrompts.length > 0) {
                toast({
                  title: "New topics added",
                  description: `${newTopicsFromPrompts.length} topics created from your prompts.`,
                });
                return [...prevTopics, ...newTopicsFromPrompts];
              }
              
              return prevTopics;
            });
          }
        } catch (error) {
          console.error('Error parsing content assets:', error);
        }
      }
    };

    loadPromptsAsTopics();
  }, [setTopics, toast]);

  const handleHideTopic = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index].hidden = true;
      return updatedTopics;
    });
  };

  const handleTogglePin = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index].pinned = !updatedTopics[index].pinned;
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

    setTopics(prevTopics => [...prevTopics, { 
      ...newTopic,
      title: newTopic.title.trim(),
      description: newTopic.description.trim()
    }]);
    
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
