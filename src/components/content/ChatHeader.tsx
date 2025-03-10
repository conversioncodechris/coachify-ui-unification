
import React from 'react';
import { ArrowLeft, BookOpen, X } from 'lucide-react';
import { Button } from '../ui/button';

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
    <div className="fixed top-16 left-0 right-0 z-40 bg-white border-b border-border">
      <div className="flex items-center justify-between p-4 max-w-3xl mx-auto">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onBackToTopics}
          className="flex items-center gap-1"
        >
          <ArrowLeft size={16} />
          <span>Back</span>
        </Button>
        
        <h2 className="font-medium text-lg">{topic}</h2>
        
        {allSourcesLength > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={toggleSourcesPanel}
            className="flex items-center gap-1"
          >
            {isSourcesPanelOpen ? (
              <>
                <X size={16} />
                <span>Close</span>
              </>
            ) : (
              <>
                <BookOpen size={16} />
                <span>Sources ({allSourcesLength})</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatHeader;
