
import React, { useState } from 'react';
import { useToast } from "../../hooks/use-toast";
import { ComplianceTopic } from './TopicCard';
import TopicsGrid from './TopicsGrid';
import AddTopicDialog from './AddTopicDialog';
import ComplianceFooter from './ComplianceFooter';

interface TopicsManagerProps {
  topics: ComplianceTopic[];
  setTopics: React.Dispatch<React.SetStateAction<ComplianceTopic[]>>;
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
  const [newTopic, setNewTopic] = useState<ComplianceTopic>({
    icon: '📝',
    title: '',
    description: ''
  });
  const [isAddTopicOpen, setIsAddTopicOpen] = useState(false);

  const handleHideTopic = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index].hidden = true;
      return updatedTopics;
    });
    
    toast({
      title: "Topic hidden",
      description: `"${topics[index].title}" has been hidden from your topics.`,
    });
  };

  const handleTogglePin = (index: number, event: React.MouseEvent) => {
    event.stopPropagation();
    setTopics(prevTopics => {
      const updatedTopics = [...prevTopics];
      updatedTopics[index].pinned = !updatedTopics[index].pinned;
      
      toast({
        title: updatedTopics[index].pinned ? "Topic pinned" : "Topic unpinned",
        description: `"${updatedTopics[index].title}" has been ${updatedTopics[index].pinned ? 'pinned to' : 'unpinned from'} the top of your topics.`,
      });
      
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
        variant: "destructive"
      });
      return;
    }
    
    if (newTopic.title.includes('\n') || newTopic.description.includes('\n')) {
      toast({
        title: "Invalid format",
        description: "Title and description must be single line text.",
        variant: "destructive"
      });
      return;
    }

    setTopics(prevTopics => [...prevTopics, { 
      ...newTopic,
      title: newTopic.title.trim(),
      description: newTopic.description.trim(),
      isNew: true
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
        <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-sm border border-border p-6">
          <h2 className="text-2xl font-semibold text-insta-text mb-2">Real Estate Compliance Topics</h2>
          <p className="text-insta-lightText mb-6">Select a topic to start exploring compliance regulations and requirements.</p>
          
          <TopicsGrid 
            topics={topics}
            onTopicClick={onTopicClick}
            onHideTopic={handleHideTopic}
            onTogglePin={handleTogglePin}
            onAddTopicClick={handleAddTopicClick}
          />
        </div>
      </div>
      
      <ComplianceFooter placeholder="Ask about real estate compliance topics..." />
      
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
