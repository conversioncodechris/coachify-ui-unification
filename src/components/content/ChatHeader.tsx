
import React from 'react';
import { MessageSquare, ChevronRight, ChevronLeft } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  topic: string;
  onBackToTopics: () => void;
  isSourcesPanelOpen: boolean;
  toggleSourcesPanel: () => void;
  allSourcesLength: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  topic,
  onBackToTopics,
  isSourcesPanelOpen,
  toggleSourcesPanel,
  allSourcesLength
}) => {
  return (
    <div className="flex p-4 bg-white border-b border-border items-center">
      <button 
        onClick={onBackToTopics}
        className="mr-3 text-insta-blue hover:text-insta-blue/80"
      >
        ← Back
      </button>
      <div className="bg-insta-gray p-2 rounded-md">
        <MessageSquare size={20} className="text-insta-blue" />
      </div>
      <h2 className="text-lg font-medium ml-4">{topic}</h2>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={cn(
                "ml-auto p-2 rounded-full hover:bg-insta-gray transition-colors",
                isSourcesPanelOpen ? "text-insta-blue bg-insta-lightBlue" : "text-insta-lightText"
              )}
              onClick={toggleSourcesPanel}
            >
              <div className="relative">
                {isSourcesPanelOpen ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
                {!isSourcesPanelOpen && allSourcesLength > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
                )}
              </div>
            </button>
          </TooltipTrigger>
          <TooltipContent>
            {isSourcesPanelOpen ? "Hide sources" : "Show sources"}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default ChatHeader;
