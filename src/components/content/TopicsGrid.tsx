
import React from 'react';
import ContentTopicCard, { ContentTopic } from './ContentTopicCard';

interface TopicsGridProps {
  topics: ContentTopic[];
  onTopicClick: (title: string) => void;
  onHideTopic: (topicId: string, event: React.MouseEvent) => void;
  onTogglePin: (topicId: string, event: React.MouseEvent) => void;
  onAddTopicClick: () => void;
}

const TopicsGrid: React.FC<TopicsGridProps> = ({
  topics,
  onTopicClick,
  onHideTopic,
  onTogglePin,
  onAddTopicClick
}) => {
  // Sort and filter topics - first make sure hidden topics are properly filtered out
  const sortedTopics = [...topics]
    .filter(topic => topic.hidden !== true) // Filter out any hidden topics
    .sort((a, b) => {
      // Sort pinned topics first
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      // Then sort by new topics
      if (a.isNew && !b.isNew) return -1;
      if (!a.isNew && b.isNew) return 1;
      return 0;
    });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {sortedTopics.map((topic) => (
        <ContentTopicCard
          key={topic.id}
          topic={topic}
          onTopicClick={onTopicClick}
          onHideTopic={onHideTopic}
          onTogglePin={onTogglePin}
        />
      ))}
    </div>
  );
};

export default TopicsGrid;
