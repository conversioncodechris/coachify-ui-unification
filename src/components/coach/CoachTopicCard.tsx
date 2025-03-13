
import React from 'react';
import { EyeOff, Pin, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface CoachTopic {
  icon: string;
  title: string;
  description: string;
  hidden?: boolean;
  pinned?: boolean;
  isNew?: boolean;
}

interface CoachTopicCardProps {
  topic: CoachTopic;
  index: number;
  onTopicClick: (title: string) => void;
  onHideTopic: (index: number, event: React.MouseEvent) => void;
  onTogglePin: (index: number, event: React.MouseEvent) => void;
}

const CoachTopicCard: React.FC<CoachTopicCardProps> = ({
  topic,
  index,
  onTopicClick,
  onHideTopic,
  onTogglePin
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div 
            className={`insta-card cursor-pointer transition-colors relative group ${
              topic.pinned ? 'border-[#BBBCBF] border-2' : topic.isNew ? 'border-2 border-insta-blue/20' : 'hover:border-insta-blue border'
            } ${
              topic.isNew ? 'bg-[#F6F9FF]' : ''
            }`}
            onClick={() => onTopicClick(topic.title)}
          >
            <div className="flex items-start">
              <span className="text-xl mr-2 inline-flex whitespace-nowrap">{topic.icon}</span>
              <div>
                <div className="font-medium flex items-center">
                  {topic.title}
                  {topic.isNew && (
                    <span className="ml-2 text-xs font-medium bg-insta-blue/10 text-insta-blue px-2 py-0.5 rounded-full">New</span>
                  )}
                </div>
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
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-[250px]">
          <p>{topic.description}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default CoachTopicCard;
