
import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Source } from './ContentTypes';

interface SourcesPanelProps {
  isOpen: boolean;
  togglePanel: () => void;
  sources: Source[];
  activeSourceIndex: number | null;
  setActiveSourceIndex: (index: number | null) => void;
}

const SourcesPanel: React.FC<SourcesPanelProps> = ({
  isOpen,
  togglePanel,
  sources,
  activeSourceIndex,
  setActiveSourceIndex
}) => {
  const showSourceDetails = (index: number) => {
    setActiveSourceIndex(index === activeSourceIndex ? null : index);
  };

  return (
    <div className={cn(
      "fixed right-0 top-16 bottom-0 w-72 bg-white border-l border-border transition-transform duration-300 z-10 flex flex-col shadow-lg",
      isOpen ? "translate-x-0" : "translate-x-full"
    )}>
      <div className="p-4 border-b border-border flex items-center justify-between bg-insta-gray/30">
        <div className="flex items-center">
          <FileText size={18} className="text-insta-blue mr-2" />
          <h3 className="font-medium">Sources</h3>
          {sources.length > 0 && (
            <span className="ml-2 text-xs bg-insta-blue text-white rounded-full px-2 py-0.5">
              {sources.length}
            </span>
          )}
        </div>
        <button 
          className="p-1 hover:bg-insta-gray rounded-full text-insta-blue"
          onClick={togglePanel}
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-3">
        {sources.length > 0 ? (
          <div className="space-y-3">
            {sources.map((source, index) => (
              <div 
                key={index}
                className="border border-border rounded-md overflow-hidden transition-all duration-200 hover:border-insta-blue/50 hover:shadow-md"
              >
                <div 
                  className={cn(
                    "p-3 cursor-pointer flex items-center justify-between",
                    activeSourceIndex === index ? "bg-insta-lightBlue" : "bg-insta-gray/30"
                  )}
                  onClick={() => showSourceDetails(index)}
                >
                  <div className="font-medium text-sm">{source.title}</div>
                  <ChevronRight 
                    size={16} 
                    className={cn(
                      "text-insta-blue transition-transform duration-200",
                      activeSourceIndex === index ? "transform rotate-90" : ""
                    )} 
                  />
                </div>
                
                {activeSourceIndex === index && (
                  <div className="p-3 border-t border-border bg-white">
                    <p className="text-sm text-insta-darkText mb-2">{source.content}</p>
                    {source.url && (
                      <a 
                        href={source.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs text-insta-blue hover:underline flex items-center"
                      >
                        View source
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-insta-lightText">
            <FileText size={24} className="mb-2 opacity-50" />
            <p className="text-sm">No sources available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SourcesPanel;
