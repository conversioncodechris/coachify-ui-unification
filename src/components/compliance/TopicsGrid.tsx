
import React from 'react';
import TopicCard, { ComplianceTopic } from './TopicCard';
import AddTopicCard from './AddTopicCard';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TopicsGridProps {
  topics: ComplianceTopic[];
  onTopicClick: (title: string) => void;
  onHideTopic: (index: number, event: React.MouseEvent) => void;
  onTogglePin: (index: number, event: React.MouseEvent) => void;
  onAddTopicClick: () => void;
  onOpenAdminSettings?: () => void;
  isAdmin?: boolean;
}

const TopicsGrid: React.FC<TopicsGridProps> = ({
  topics,
  onTopicClick,
  onHideTopic,
  onTogglePin,
  onAddTopicClick,
  onOpenAdminSettings,
  isAdmin = false
}) => {
  // Sort and filter topics
  const sortedTopics = [...topics].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  }).filter(topic => !topic.hidden);

  return (
    <div className="space-y-6">
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onOpenAdminSettings}
            className="flex items-center gap-1"
          >
            <Settings size={16} />
            Admin Settings
          </Button>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedTopics.map((topic, index) => (
          <TopicCard
            key={index}
            topic={topic}
            index={topics.findIndex(t => t.title === topic.title)}
            onTopicClick={onTopicClick}
            onHideTopic={onHideTopic}
            onTogglePin={onTogglePin}
          />
        ))}
        
        <AddTopicCard onClick={onAddTopicClick} />
      </div>
    </div>
  );
};

export default TopicsGrid;
