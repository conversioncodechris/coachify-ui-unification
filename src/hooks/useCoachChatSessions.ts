
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChatSession {
  title: string;
  path: string;
  hidden?: boolean;
}

export const useCoachChatSessions = (
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

    const chatPath = `/coach/chat/${chatId}`;
    const savedChats = localStorage.getItem('coachActiveChats');
    
    if (!savedChats) {
      localStorage.removeItem('coachActiveChats');
      navigate('/coach', { replace: true });
      return;
    }

    try {
      const activeChats = JSON.parse(savedChats);
      
      if (!Array.isArray(activeChats) || activeChats.length === 0) {
        localStorage.removeItem('coachActiveChats');
        navigate('/coach', { replace: true });
        return;
      }

      const currentChat = activeChats.find(
        (chat: ChatSession) => chat.path === chatPath && !chat.hidden
      );
      
      if (currentChat) {
        setCurrentTopic(currentChat.title);
      } else {
        localStorage.removeItem('coachActiveChats');
        navigate('/coach', { replace: true });
      }
    } catch (error) {
      console.error('Error parsing active chats:', error);
      localStorage.removeItem('coachActiveChats');
      navigate('/coach', { replace: true });
    }
  }, [chatId, navigate]);

  const createNewChatSession = (topicTitle: string) => {
    if (!topicTitle) return;

    try {
      let activeChats: ChatSession[] = [];
      const savedChats = localStorage.getItem('coachActiveChats');
      
      if (savedChats) {
        try {
          const parsed = JSON.parse(savedChats);
          activeChats = Array.isArray(parsed) ? parsed : [];
        } catch (e) {
          activeChats = [];
        }
      }
      
      const existingChat = activeChats.find(
        (chat: ChatSession) => chat.title === topicTitle && !chat.hidden
      );
      
      if (existingChat) {
        navigate(existingChat.path, { replace: true });
        return;
      }
      
      const hiddenChat = activeChats.find(
        (chat: ChatSession) => chat.title === topicTitle && chat.hidden
      );
      
      if (hiddenChat) {
        const updatedChats = activeChats.map((chat: ChatSession) => 
          chat.title === topicTitle ? { ...chat, hidden: false } : chat
        );
        localStorage.setItem('coachActiveChats', JSON.stringify(updatedChats));
        navigate(hiddenChat.path, { replace: true });
      } else {
        const newChatId = Date.now().toString();
        const chatPath = `/coach/chat/${newChatId}`;
        
        const newChats = [
          ...activeChats,
          {
            title: topicTitle,
            path: chatPath
          }
        ];
        
        localStorage.setItem('coachActiveChats', JSON.stringify(newChats));
        navigate(chatPath, { replace: true });
      }
    } catch (error) {
      console.error('Error creating chat session:', error);
      localStorage.removeItem('coachActiveChats');
      const newChatId = Date.now().toString();
      const chatPath = `/coach/chat/${newChatId}`;
      
      const newChats = [{
        title: topicTitle,
        path: chatPath
      }];
      
      localStorage.setItem('coachActiveChats', JSON.stringify(newChats));
      navigate(chatPath, { replace: true });
    }
  };

  return {
    currentTopic,
    createNewChatSession
  };
};
