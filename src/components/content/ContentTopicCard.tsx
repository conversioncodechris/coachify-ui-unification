
import React from 'react';
import { EyeOff, Pin, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ContentTopic {
  icon: string;
  title: string;
  description: string;
  hidden?: boolean;
  pinned?: boolean;
}

interface ContentTopicCardProps {
  topic: ContentTopic;
  index: number;
  onTopicClick: (title: string) => void;
  onHideTopic: (index: number, event: React.MouseEvent) => void;
  onTogglePin: (index: number, event: React.MouseEvent) => void;
}

const ContentTopicCard: React.FC<ContentTopicCardProps> = ({
  topic,
  index,
  onTopicClick,
  onHideTopic,
  onTogglePin
}) => {
  return (
    <div 
      className={`insta-card cursor-pointer transition-colors relative group dark:bg-gray-900 dark:border-gray-700 dark:text-white ${
        topic.pinned ? 'border-[#BBBCBF] border-2 dark:border-gray-600' : 'hover:border-insta-blue border dark:hover:border-blue-500'
      }`}
      onClick={() => onTopicClick(topic.title)}
    >
      <div className="flex items-start">
        <span className="text-xl mr-2">{topic.icon}</span>
        <div>
          <div className="font-medium">{topic.title}</div>
          <div className="text-sm text-insta-lightText line-clamp-1 dark:text-gray-300">{topic.description}</div>
        </div>
      </div>
      
      {/* Action buttons on hover */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="text-insta-lightText hover:text-insta-text bg-white rounded-full p-1 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white"
                onClick={(e) => onHideTopic(index, e)}
              >
                <EyeOff size={16} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>Hide this topic</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={`text-insta-lightText hover:text-insta-text bg-white rounded-full p-1 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:hover:text-white ${topic.pinned ? 'text-insta-blue dark:text-blue-400' : ''}`}
                onClick={(e) => onTogglePin(index, e)}
              >
                {topic.pinned ? <PinOff size={16} /> : <Pin size={16} />}
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">
              <p>{topic.pinned ? 'Unpin this topic' : 'Pin this topic'}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      
      {/* Pin indicator */}
      {topic.pinned && (
        <div className="absolute top-0 left-0 bg-insta-blue text-white p-1 text-xs rounded-tl-md rounded-br-md dark:bg-blue-600">
          <Pin size={12} />
        </div>
      )}
    </div>
  );
};

export default ContentTopicCard;
