
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
    if (!chatId) {
      setCurrentTopic(null);
      return;
    }

    const chatPath = `/content/chat/${chatId}`;
    const savedChats = localStorage.getItem('contentActiveChats');
    
    if (!savedChats) {
      // No active chats found, redirect to content page
      localStorage.removeItem('contentActiveChats');
      navigate('/content', { replace: true });
      return;
    }

    try {
      const activeChats = JSON.parse(savedChats);
      
      if (!Array.isArray(activeChats) || activeChats.length === 0) {
        // Invalid data structure, redirect to content page
        localStorage.removeItem('contentActiveChats');
        navigate('/content', { replace: true });
        return;
      }

      const currentChat = activeChats.find(
        (chat: ChatSession) => chat.path === chatPath && !chat.hidden
      );
      
      if (currentChat) {
        setCurrentTopic(currentChat.title);
      } else {
        // Chat not found or hidden, redirect to content page
        localStorage.removeItem('contentActiveChats');
        navigate('/content', { replace: true });
      }
    } catch (error) {
      // JSON parse error, redirect to content page
      console.error('Error parsing active chats:', error);
      localStorage.removeItem('contentActiveChats');
      navigate('/content', { replace: true });
    }
  }, [chatId, navigate]);

  const createNewChatSession = (topicTitle: string) => {
    if (!topicTitle) return;

    try {
      let activeChats: ChatSession[] = [];
      const savedChats = localStorage.getItem('contentActiveChats');
      
      if (savedChats) {
        try {
          const parsed = JSON.parse(savedChats);
          activeChats = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          // If parsing fails, start with empty array
          activeChats = [];
        }
      }
      
      const existingChat = activeChats.find(
        (chat: ChatSession) => chat.title === topicTitle && !chat.hidden
      );
      
      if (existingChat) {
        // Navigate to existing chat
        navigate(existingChat.path, { replace: true });
        return;
      }
      
      // Check for hidden chat with this topic
      const hiddenChat = activeChats.find(
        (chat: ChatSession) => chat.title === topicTitle && chat.hidden
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
        
        const newChats = [
          ...activeChats,
          {
            title: topicTitle,
            path: chatPath
          }
        ];
        
        localStorage.setItem('contentActiveChats', JSON.stringify(newChats));
        navigate(chatPath, { replace: true });
      }
    } catch (error) {
      console.error('Error creating chat session:', error);
      // Create a fallback chat and clear localStorage
      localStorage.removeItem('contentActiveChats');
      const newChatId = Date.now().toString();
      const chatPath = `/content/chat/${newChatId}`;
      
      const newChats = [{
        title: topicTitle,
        path: chatPath
      }];
      
      localStorage.setItem('contentActiveChats', JSON.stringify(newChats));
      navigate(chatPath, { replace: true });
    }
  };

  return {
    currentTopic,
    createNewChatSession
  };
};
