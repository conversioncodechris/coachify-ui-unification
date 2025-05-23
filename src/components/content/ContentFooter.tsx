
import React from 'react';
import { Send } from 'lucide-react';

interface ContentFooterProps {
  placeholder: string;
}

const ContentFooter: React.FC<ContentFooterProps> = ({ placeholder }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 p-4 border-t border-border bg-white">
      <div className="max-w-3xl mx-auto relative">
        <input 
          type="text" 
          placeholder={placeholder} 
          className="insta-input pr-12"
        />
        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-insta-blue">
          <Send size={20} />
        </button>
      </div>
      <div className="max-w-3xl mx-auto mt-2 text-center text-xs text-insta-lightText">
        Our AI will help you create engaging content tailored to your specific needs.
      </div>
    </div>
  );
};

export default ContentFooter;
