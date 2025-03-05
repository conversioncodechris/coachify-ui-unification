
import React from 'react';
import TopicCard, { ComplianceTopic } from './TopicCard';
import AddTopicCard from './AddTopicCard';

interface TopicsGridProps {
  topics: ComplianceTopic[];
  onTopicClick: (title: string) => void;
  onHideTopic: (index: number, event: React.MouseEvent) => void;
  onTogglePin: (index: number, event: React.MouseEvent) => void;
  onAddTopicClick: () => void;
}

const TopicsGrid: React.FC<TopicsGridProps> = ({
  topics,
  onTopicClick,
  onHideTopic,
  onTogglePin,
  onAddTopicClick
}) => {
  // Sort and filter topics
  const sortedTopics = [...topics].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  }).filter(topic => !topic.hidden);

  return (
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
  );
};

export default TopicsGrid;
