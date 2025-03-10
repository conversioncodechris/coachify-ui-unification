
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatSessionManagerProps {
  topic: string | null;
  chatId: string | null;
}

const ChatSessionManager: React.FC<ChatSessionManagerProps> = ({ 
  topic, 
  chatId 
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (topic && !chatId) {
      const savedChats = localStorage.getItem('complianceActiveChats');
      let activeChats = savedChats ? JSON.parse(savedChats) : [];
      
      const chatExists = activeChats.some((chat: {title: string, path: string}) => 
        chat.title === topic
      );
      
      if (!chatExists) {
        const newChatId = Date.now().toString();
        const chatPath = `/compliance/chat/${newChatId}`;
        
        activeChats.push({
          title: topic,
          path: chatPath
        });
        
        localStorage.setItem('complianceActiveChats', JSON.stringify(activeChats));
        
        navigate(chatPath, { replace: true });
      }
    }
  }, [topic, chatId, navigate]);

  return null; // This is a utility component with no UI
};

export default ChatSessionManager;
