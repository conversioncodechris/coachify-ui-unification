
import React from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Source } from './ContentTypes';

interface SourcesPanelProps {
  isOpen: boolean;
  togglePanel: () => void;
  sources: Source[];
  activeSourceIndex: number | null;
  setActiveSourceIndex: (index: number) => void;
}

const SourcesPanel: React.FC<SourcesPanelProps> = ({
  isOpen,
  togglePanel,
  sources,
  activeSourceIndex,
  setActiveSourceIndex
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-16 bottom-0 w-72 bg-white border-l border-border overflow-hidden flex flex-col z-30">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h3 className="font-medium">Sources & References</h3>
        <button 
          onClick={togglePanel}
          className="text-insta-lightText hover:text-insta-text"
        >
          <X size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-auto">
        <div className="p-2">
          {sources.map((source, i) => (
            <div 
              key={i}
              className={`rounded-md p-3 mb-2 cursor-pointer transition-colors ${
                activeSourceIndex === i ? 'bg-insta-blue/10 border border-insta-blue/30' : 'hover:bg-gray-100'
              }`}
              onClick={() => setActiveSourceIndex(i)}
            >
              <div className="font-medium text-sm mb-1 truncate">{source.title}</div>
              <div className="text-xs text-insta-lightText line-clamp-2">{source.content}</div>
            </div>
          ))}
        </div>
      </div>
      
      {activeSourceIndex !== null && sources[activeSourceIndex] && (
        <div className="border-t border-border p-4 bg-gray-50">
          <div className="font-medium mb-2">{sources[activeSourceIndex].title}</div>
          <div className="text-sm mb-3">{sources[activeSourceIndex].content}</div>
          
          {sources[activeSourceIndex].url && (
            <a 
              href={sources[activeSourceIndex].url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-insta-blue text-sm flex items-center hover:underline"
            >
              Visit source <ExternalLink size={14} className="ml-1" />
            </a>
          )}
        </div>
      )}
    </div>
  );
};

export default SourcesPanel;
