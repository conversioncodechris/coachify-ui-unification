
import React from 'react';

interface ChatSourceIndicatorProps {
  isVisible: boolean;
  onClick: () => void;
}

const ChatSourceIndicator: React.FC<ChatSourceIndicatorProps> = ({ 
  isVisible, 
  onClick 
}) => {
  if (!isVisible) return null;
  
  return (
    <div 
      className="absolute right-0 top-[64px] bottom-0 w-1 bg-gray-300 cursor-pointer animate-pulse"
      onClick={onClick}
    />
  );
};

export default ChatSourceIndicator;
