
import React from "react";
import { Button } from "@/components/ui/button";
import { Youtube } from "lucide-react";

interface YouTubeLinksQueueProps {
  links: string[];
  onRemoveLink: (index: number) => void;
  onClearAll: () => void;
  onProcessLinks: () => void;
  isProcessing: boolean;
}

const YouTubeLinksQueue: React.FC<YouTubeLinksQueueProps> = ({
  links,
  onRemoveLink,
  onClearAll,
  onProcessLinks,
  isProcessing
}) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="text-sm font-medium">Queue ({links.length})</h4>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
        >
          Clear All
        </Button>
      </div>
      
      <div className="max-h-[200px] overflow-y-auto space-y-2">
        {links.map((link, index) => (
          <div key={index} className="flex items-center justify-between bg-white p-2 rounded border">
            <div className="flex items-center gap-2 overflow-hidden">
              <Youtube className="h-4 w-4 shrink-0 text-red-600" />
              <span className="text-sm truncate">{link}</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemoveLink(index)}
              className="h-6 w-6 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
            >
              <span className="sr-only">Remove</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
            </Button>
          </div>
        ))}
      </div>
      
      <Button
        onClick={onProcessLinks}
        disabled={isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : `Process ${links.length} YouTube Link${links.length > 1 ? 's' : ''}`}
      </Button>
    </div>
  );
};

export default YouTubeLinksQueue;
