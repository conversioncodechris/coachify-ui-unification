
import React from 'react';
import CoachTopicCard from './CoachTopicCard';
import { CoachTopic } from './CoachTypes';

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
  // Filter out hidden topics and sort by pinned status
  const visibleTopics = topics
    .filter(topic => !topic.hidden)
    .sort((a, b) => {
      // Sort pinned topics first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Sort new topics next
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0;
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {visibleTopics.map((topic, index) => (
        <CoachTopicCard
          key={index}
          topic={topic}
          index={index}
          onTopicClick={onTopicClick}
          onHideTopic={onHideTopic}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
};

export default CoachTopicsGrid;
