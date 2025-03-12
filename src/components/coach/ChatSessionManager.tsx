
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface ChatSessionManagerProps {
  topic: string | null;
  chatId: string | null;
}

const ChatSessionManager: React.FC<ChatSessionManagerProps> = ({ topic, chatId }) => {
  const location = useLocation();
  const [initialized, setInitialized] = useState(false);
  
  useEffect(() => {
    if (!initialized && chatId && topic) {
      // Initialize the session
      setInitialized(true);
      
      // This is where you would add logic to load previous messages
      // For now we just ensure the chat exists in localStorage
      const savedChats = localStorage.getItem('coachActiveChats');
      if (savedChats) {
        try {
          const activeChats = JSON.parse(savedChats);
          const currentChat = activeChats.find((chat: any) => 
            chat.path === `/coach/chat/${chatId}`
          );
          
          if (!currentChat) {
            // Chat not found, add it
            activeChats.push({
              title: topic,
              path: `/coach/chat/${chatId}`
            });
            
            localStorage.setItem('coachActiveChats', JSON.stringify(activeChats));
          }
        } catch (error) {
          console.error('Error initializing chat session:', error);
          
          // Reset localStorage if corrupt
          const newSession = [{
            title: topic,
            path: `/coach/chat/${chatId}`
          }];
          
          localStorage.setItem('coachActiveChats', JSON.stringify(newSession));
        }
      } else {
        // No existing chats, create first one
        const newSession = [{
          title: topic,
          path: `/coach/chat/${chatId}`
        }];
        
        localStorage.setItem('coachActiveChats', JSON.stringify(newSession));
      }
    }
  }, [topic, chatId, initialized, location.pathname]);
  
  // This component doesn't render anything, it just manages the chat session
  return null;
};

export default ChatSessionManager;
