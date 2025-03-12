
import React from 'react';
import { Plus } from 'lucide-react';

interface AddContentTopicCardProps {
  onClick: () => void;
}

const AddContentTopicCard: React.FC<AddContentTopicCardProps> = ({ onClick }) => {
  return (
    <div 
      className="insta-card cursor-pointer hover:border-insta-blue transition-colors relative group border-dashed border-2 h-[102px] dark:bg-gray-900 dark:border-gray-700 dark:hover:border-blue-500" 
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-insta-lightText dark:text-gray-400">
          <Plus size={24} className="mb-2" />
          <span className="font-medium">Add New Topic</span>
        </div>
      </div>
    </div>
  );
};

export default AddContentTopicCard;
