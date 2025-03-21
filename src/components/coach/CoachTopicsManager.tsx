
import React, { useState, useEffect } from 'react';
import { useToast } from "../../hooks/use-toast";
import { CoachTopic } from './CoachTypes'; // Updated import path
import CoachTopicsGrid from './CoachTopicsGrid';
import AddTopicDialog from '../compliance/AddTopicDialog';
import ContentFooter from '../content/ContentFooter';
import { ContentAsset } from '@/types/contentAssets';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface CoachTopicsManagerProps {
  topics: CoachTopic[];
  setTopics: React.Dispatch<React.SetStateAction<CoachTopic[]>>;
  onTopicClick: (title: string) => void;
  emojiOptions: string[];
}

const CoachTopicsManager: React.FC<CoachTopicsManagerProps> = ({
  topics,
  setTopics,
  onTopicClick,
  emojiOptions
}) => {
  const { toast } = useToast();
  const [newTopic, setNewTopic] = useState<CoachTopic>({
    icon: '😊',
    title: '',
    description: '',
    content: '' // This is now valid because we've added content to the CoachTopic interface
  });
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const loadRoleplayScenarios = () => {
      console.log("Loading coach roleplay scenarios...");
      const storedAssets = localStorage.getItem('coachAssets');
      
      if (storedAssets) {
        try {
          console.log("Parsing stored coach assets:", storedAssets);
          const assets = JSON.parse(storedAssets);
          
          const roleplayScenarios = assets.filter((asset: ContentAsset) => 
            asset.type === 'roleplay' && !asset.hidden
          );
          
          console.log("Found roleplay scenarios:", roleplayScenarios.length);
          
          if (roleplayScenarios.length > 0) {
            const existingTopicTitles = new Set(topics.map(topic => topic.title));
            
            const newTopics: CoachTopic[] = [];
            
            roleplayScenarios.forEach((scenario: ContentAsset) => {
              if (!existingTopicTitles.has(scenario.title)) {
                console.log("Converting roleplay scenario to topic:", scenario.title);
                newTopics.push({
                  icon: scenario.icon || '🎭',
                  title: scenario.title,
                  description: scenario.subtitle || 'Roleplay scenario',
                  isNew: true,
                  pinned: scenario.pinned
                });
              }
            });
            
            console.log("New roleplay topics to add:", newTopics.length);
            
            if (newTopics.length > 0) {
              setTopics(prevTopics => [...newTopics, ...prevTopics]);
              
              toast({
                title: "Scenarios added",
                description: `${newTopics.length} roleplay scenarios loaded.`,
              });
            }
          }
        } catch (error) {
          console.error('Error parsing coach assets:', error);
        }
      }
    };

    if (isInitialLoad) {
      loadRoleplayScenarios();
      setIsInitialLoad(false);
    }
    
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'coachAssets') {
        console.log("Storage event detected, reloading coach scenarios...");
        loadRoleplayScenarios();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    const handleCustomEvent = () => {
      console.log("Custom event detected, reloading coach scenarios...");
      loadRoleplayScenarios();
    };
    
    window.addEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    };
  }, [topics, setTopics, toast, isInitialLoad]);

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
      icon: '😊',
      title: '',
      description: '',
      content: '' // This is now valid
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

    // Create a new ContentAsset for the roleplay scenario
    const newRoleplayAsset: ContentAsset = {
      id: `coach-${Date.now()}`,
      type: 'roleplay',
      title: newTopic.title.trim(),
      subtitle: newTopic.description.trim(),
      icon: newTopic.icon,
      source: "created",
      dateAdded: new Date(),
      content: newTopic.content || "", // This is now valid
      isNew: true,
      aiType: "coach"
    };
    
    // Save to localStorage
    const storageKey = 'coachAssets';
    let existingAssets: ContentAsset[] = [];
    
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        existingAssets = JSON.parse(storedAssets);
      } catch (error) {
        console.error(`Error parsing ${storageKey}:`, error);
      }
    }
    
    existingAssets.push(newRoleplayAsset);
    localStorage.setItem(storageKey, JSON.stringify(existingAssets));

    // Add to topics state
    setTopics(prevTopics => [...prevTopics, { 
      ...newTopic,
      title: newTopic.title.trim(),
      description: newTopic.description.trim(),
      isNew: true
    }]);
    
    setIsAddTopicOpen(false);
    
    // Trigger UI update
    const customEvent = new Event('contentAssetsUpdated');
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Roleplay Scenario Added",
      description: `"${newTopic.title}" has been added to your scenarios.`,
    });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 pt-4 pb-24">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-insta-text">Roleplay Scenarios</h2>
            <Button onClick={handleAddTopicClick} className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Add New Scenario
            </Button>
          </div>
          
          <CoachTopicsGrid 
            topics={topics}
            onTopicClick={onTopicClick}
            onHideTopic={handleHideTopic}
            onTogglePin={handleTogglePin}
            onAddTopicClick={handleAddTopicClick}
          />
        </div>
      </div>
      
      <ContentFooter placeholder="Ask about roleplay scenarios..." />
      
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

export default CoachTopicsManager;
