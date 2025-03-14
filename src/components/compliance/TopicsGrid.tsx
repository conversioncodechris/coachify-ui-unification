
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
    // First sort by pin status
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    
    // Then sort by new status
    if (a.isNew && !b.isNew) return -1;
    if (!a.isNew && b.isNew) return 1;
    
    // Finally sort alphabetically by title
    return a.title.localeCompare(b.title);
  }).filter(topic => !topic.hidden);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedTopics.map((topic, index) => (
        <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 50}ms` }}>
          <TopicCard
            topic={topic}
            index={topics.findIndex(t => t.title === topic.title)}
            onTopicClick={onTopicClick}
            onHideTopic={onHideTopic}
            onTogglePin={onTogglePin}
          />
        </div>
      ))}
      
      <div className="animate-fade-in" style={{ animationDelay: `${sortedTopics.length * 50}ms` }}>
        <AddTopicCard onClick={onAddTopicClick} />
      </div>
    </div>
  );
};

export default TopicsGrid;
