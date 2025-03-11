
import React from 'react';
import { MessageSquare, ChevronRight, ChevronLeft, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from '@/lib/utils';

interface ChatHeaderProps {
  topic: string;
  isSourcesPanelOpen: boolean;
  toggleSourcesPanel: () => void;
  allSourcesLength: number;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  topic,
  isSourcesPanelOpen,
  toggleSourcesPanel,
  allSourcesLength
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    // Use direct window.location navigation to force a complete navigation
    window.location.href = '/content';
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex p-4 bg-white border-b border-border items-center">
      <button 
        onClick={handleBack}
        className="mr-3 text-insta-blue hover:text-insta-blue/80 flex items-center"
        type="button"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
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
              type="button"
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
