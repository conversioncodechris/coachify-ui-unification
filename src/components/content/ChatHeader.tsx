
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
    // Use navigate with replace:true to prevent adding to history stack
    navigate('/content', { replace: true });
  };

  return (
    <div className="bg-white border-b border-border p-4 flex items-center">
      <button 
        onClick={handleBack}
        className="mr-3 text-gray-600 hover:text-gray-800 flex items-center"
        type="button"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back
      </button>
      <div className="bg-gray-100 p-2 rounded-md">
        <MessageSquare size={20} className="text-gray-600" />
      </div>
      <h2 className="text-lg font-medium ml-4 text-gray-800">{topic}</h2>
      
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <button 
              className={cn(
                "ml-auto p-2 rounded-full hover:bg-gray-100 transition-colors",
                isSourcesPanelOpen ? "text-gray-800 bg-gray-200" : "text-gray-500"
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
