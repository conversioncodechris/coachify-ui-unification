
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatSession {
  title: string;
  path: string;
  hidden?: boolean;
}

export const useContentChatSessions = (
  initialTopic: string | null,
  chatId: string | null
) => {
  const navigate = useNavigate();
  const [currentTopic, setCurrentTopic] = useState<string | null>(initialTopic);

  useEffect(() => {
    if (chatId) {
      const savedChats = localStorage.getItem('contentActiveChats');
      if (savedChats) {
        const activeChats = JSON.parse(savedChats);
        const currentChat = activeChats.find((chat: ChatSession) => 
          chat.path.includes(chatId) && !chat.hidden
        );
        
        if (currentChat) {
          setCurrentTopic(currentChat.title);
        }
      }
    } else {
      setCurrentTopic(null);
    }
  }, [chatId]);

  const createNewChatSession = (topicTitle: string) => {
    if (!topicTitle) return;

    const savedChats = localStorage.getItem('contentActiveChats');
    let activeChats = savedChats ? JSON.parse(savedChats) : [];
    
    const chatExists = activeChats.some((chat: ChatSession) => 
      chat.title === topicTitle && !chat.hidden
    );
    
    if (!chatExists) {
      // Check if there's a hidden chat with this topic
      const hiddenChat = activeChats.find((chat: ChatSession) => 
        chat.title === topicTitle && chat.hidden
      );
      
      if (hiddenChat) {
        // Unhide the existing chat
        const updatedChats = activeChats.map((chat: ChatSession) => 
          chat.title === topicTitle ? { ...chat, hidden: false } : chat
        );
        localStorage.setItem('contentActiveChats', JSON.stringify(updatedChats));
        navigate(hiddenChat.path, { replace: true });
      } else {
        // Create a new chat
        const newChatId = Date.now().toString();
        const chatPath = `/content/chat/${newChatId}`;
        
        activeChats.push({
          title: topicTitle,
          path: chatPath
        });
        
        localStorage.setItem('contentActiveChats', JSON.stringify(activeChats));
        navigate(chatPath, { replace: true });
      }
    } else {
      // Find the existing chat and navigate to it
      const existingChat = activeChats.find((chat: ChatSession) => 
        chat.title === topicTitle && !chat.hidden
      );
      if (existingChat) {
        navigate(existingChat.path, { replace: true });
      }
    }
  };

  return {
    currentTopic,
    createNewChatSession
  };
};
