
import React, { useState } from 'react';
import { useToast } from "../../hooks/use-toast";
import { CoachTopic } from './CoachTypes';
import CoachTopicsGrid from './CoachTopicsGrid';
import AddScenarioDialog from './AddScenarioDialog';
import { DEFAULT_EMOJI_OPTIONS } from '@/data/defaultTopics';

interface CoachTopicsManagerProps {
  topics: CoachTopic[];
  setTopics: React.Dispatch<React.SetStateAction<CoachTopic[]>>;
  onTopicClick: (title: string) => void;
}

const CoachTopicsManager: React.FC<CoachTopicsManagerProps> = ({
  topics,
  setTopics,
  onTopicClick,
}) => {
  const { toast } = useToast();
  const [newScenario, setNewScenario] = useState<CoachTopic>({
    icon: '🎯',
    title: '',
    description: '',
    content: ''
  });
  const [isAddScenarioOpen, setIsAddScenarioOpen] = useState(false);

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

  const handleAddScenarioClick = () => {
    setNewScenario({
      icon: '🎯',
      title: '',
      description: '',
      content: ''
    });
    setIsAddScenarioOpen(true);
  };
  
  const handleAddScenarioSubmit = () => {
    if (!newScenario.title?.trim() || !newScenario.description?.trim()) {
      toast({
        title: "Missing information",
        description: "Please provide both a title and description.",
      });
      return;
    }
    
    if (newScenario.title.includes('\n') || newScenario.description.includes('\n')) {
      toast({
        title: "Invalid format",
        description: "Title and description must be single line text.",
      });
      return;
    }

    setTopics(prevTopics => [...prevTopics, { 
      ...newScenario,
      title: newScenario.title.trim(),
      description: newScenario.description.trim(),
      isNew: true
    }]);
    
    setIsAddScenarioOpen(false);
    
    toast({
      title: "Scenario Added",
      description: `"${newScenario.title}" has been added to your coaching scenarios.`,
    });
  };

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="max-w-5xl mx-auto">
          <CoachTopicsGrid 
            topics={topics}
            onTopicClick={onTopicClick}
            onHideTopic={handleHideTopic}
            onTogglePin={handleTogglePin}
            onAddTopicClick={handleAddScenarioClick}
          />
        </div>
      </div>
      
      <AddScenarioDialog 
        isOpen={isAddScenarioOpen}
        onOpenChange={setIsAddScenarioOpen}
        newScenario={newScenario}
        setNewScenario={setNewScenario}
        onSubmit={handleAddScenarioSubmit}
        emojiOptions={DEFAULT_EMOJI_OPTIONS}
      />
    </>
  );
};

export default CoachTopicsManager;
