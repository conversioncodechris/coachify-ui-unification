
import React from 'react';
import { EyeOff, Pin, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface ComplianceTopic {
  icon: string;
  title: string;
  description: string;
  hidden?: boolean;
  pinned?: boolean;
}

interface TopicCardProps {
  topic: ComplianceTopic;
  index: number;
  onTopicClick: (title: string) => void;
  onHideTopic: (index: number, event: React.MouseEvent) => void;
  onTogglePin: (index: number, event: React.MouseEvent) => void;
}

const TopicCard: React.FC<TopicCardProps> = ({
  topic,
  index,
  onTopicClick,
  onHideTopic,
  onTogglePin
}) => {
  return (
    <div 
      className={`insta-card cursor-pointer transition-colors relative group ${
        topic.pinned ? 'border-[#BBBCBF] border-2' : 'hover:border-insta-blue border'
      }`}
      onClick={() => onTopicClick(topic.title)}
    >
      <div className="flex items-start">
        <span className="text-xl mr-2">{topic.icon}</span>
        <div>
          <div className="font-medium">{topic.title}</div>
          <div className="text-sm text-insta-lightText line-clamp-1">{topic.description}</div>
        </div>
      </div>
      
      {/* Action buttons on hover */}
      <div className="absolute top-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className="text-insta-lightText hover:text-insta-text bg-white rounded-full p-1 shadow-sm"
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
                className={`text-insta-lightText hover:text-insta-text bg-white rounded-full p-1 shadow-sm ${topic.pinned ? 'text-insta-blue' : ''}`}
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
        <div className="absolute top-0 left-0 bg-insta-blue text-white p-1 text-xs rounded-tl-md rounded-br-md">
          <Pin size={12} />
        </div>
      )}
    </div>
  );
};

export default TopicCard;
