
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useToast } from "@/hooks/use-toast";

export interface ChatItem {
  title: string;
  path: string;
  hidden?: boolean;
  pinned?: boolean;
}

export const useCoachSidebar = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [activeChats, setActiveChats] = useState<ChatItem[]>(() => {
    const savedChats = localStorage.getItem('coachActiveChats');
    if (savedChats) {
      try {
        const chats = JSON.parse(savedChats);
        if (Array.isArray(chats)) {
          return chats;
        }
      } catch (error) {
        console.error('Failed to parse chats:', error);
      }
    }
    return [];
  });

  useEffect(() => {
    // Refresh active chats when location changes
    const savedChats = localStorage.getItem('coachActiveChats');
    if (savedChats) {
      try {
        const chats = JSON.parse(savedChats);
        if (Array.isArray(chats)) {
          setActiveChats(chats);
        }
      } catch (error) {
        console.error('Failed to parse chats:', error);
      }
    }
  }, [location.pathname]);

  const handlePinChat = (path: string) => {
    const updatedChats = activeChats.map(chat => 
      chat.path === path ? { ...chat, pinned: !chat.pinned } : chat
    );
    
    const sortedChats = [
      ...updatedChats.filter(chat => chat.pinned),
      ...updatedChats.filter(chat => !chat.pinned)
    ];
    
    localStorage.setItem('coachActiveChats', JSON.stringify(sortedChats));
    setActiveChats(sortedChats);
    
    toast({
      title: updatedChats.find(c => c.path === path)?.pinned 
        ? "Chat pinned" 
        : "Chat unpinned",
      description: "Your chats have been updated.",
    });
  };

  const handleHideChat = (path: string) => {
    const updatedChats = activeChats.map(chat => 
      chat.path === path ? { ...chat, hidden: true } : chat
    );
    
    localStorage.setItem('coachActiveChats', JSON.stringify(updatedChats));
    setActiveChats(updatedChats);
    
    toast({
      title: "Chat hidden",
      description: "Your chat has been removed from the sidebar.",
    });
  };

  const handleRenameChat = (path: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    
    const updatedChats = activeChats.map(chat => 
      chat.path === path ? { ...chat, title: newTitle.trim() } : chat
    );
    
    localStorage.setItem('coachActiveChats', JSON.stringify(updatedChats));
    setActiveChats(updatedChats);
    
    toast({
      title: "Chat renamed",
      description: "Your chat has been updated.",
    });
  };

  return {
    activeChats,
    setActiveChats,
    handlePinChat,
    handleHideChat,
    handleRenameChat
  };
};
