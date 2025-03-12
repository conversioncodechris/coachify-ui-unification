
import React from 'react';
import CoachTopicCard, { CoachTopic } from './CoachTopicCard';
import AddTopicCard from '../compliance/AddTopicCard';

interface CoachTopicsGridProps {
  topics: CoachTopic[];
  onTopicClick: (title: string) => void;
  onHideTopic: (index: number, event: React.MouseEvent) => void;
  onTogglePin: (index: number, event: React.MouseEvent) => void;
  onAddTopicClick: () => void;
}

const CoachTopicsGrid: React.FC<CoachTopicsGridProps> = ({
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
        <CoachTopicCard
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

export default CoachTopicsGrid;
