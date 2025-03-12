
import React from 'react';
import { Plus } from 'lucide-react';

interface AddContentTopicCardProps {
  onClick: () => void;
}

const AddContentTopicCard: React.FC<AddContentTopicCardProps> = ({ onClick }) => {
  return (
    <div 
      className="insta-card cursor-pointer hover:border-insta-blue transition-colors relative group border-dashed border-2 h-[102px] bg-white" 
      onClick={onClick}
    >
      <div className="flex items-center justify-center h-full">
        <div className="flex flex-col items-center text-insta-lightText">
          <Plus size={24} className="mb-2" />
          <span className="font-medium">Add New Topic</span>
        </div>
      </div>
    </div>
  );
};

export default AddContentTopicCard;
