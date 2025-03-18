
import React from 'react';
import ContentTopicCard, { ContentTopic } from './ContentTopicCard';
import AddContentTopicCard from './AddContentTopicCard';

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
    .filter(topic => topic.hidden !== true) // Explicitly check for !true to handle undefined
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
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
      
      <AddContentTopicCard onClick={onAddTopicClick} />
    </div>
  );
};

export default TopicsGrid;
