
import { useState } from 'react';
import { useToast } from './use-toast';

export interface ChatItem {
  title: string;
  path: string;
  hidden?: boolean;
  pinned?: boolean;
}

export const useContentSidebar = () => {
  const { toast } = useToast();
  const [activeChats, setActiveChats] = useState<ChatItem[]>(() => {
    const savedChats = localStorage.getItem('contentActiveChats');
    return savedChats ? JSON.parse(savedChats) : [];
  });

  const saveChats = (chats: ChatItem[]) => {
    localStorage.setItem('contentActiveChats', JSON.stringify(chats));
    setActiveChats(chats);
  };

  const handlePinChat = (path: string) => {
    const updatedChats = activeChats.map(chat => 
      chat.path === path ? { ...chat, pinned: !chat.pinned } : chat
    );
    
    const sortedChats = [
      ...updatedChats.filter(chat => chat.pinned),
      ...updatedChats.filter(chat => !chat.pinned)
    ];
    
    saveChats(sortedChats);
    
    toast({
      title: updatedChats.find(c => c.path === path)?.pinned 
        ? "Chat pinned" 
        : "Chat unpinned",
      description: "Your chats have been updated.",
    });
  };

  const handleHideChat = (path: string) => {
    const updatedChats = activeChats.map(chat => 
      chat.path === path ? { ...chat, hidden: !chat.hidden } : chat
    );
    
    saveChats(updatedChats);
    
    toast({
      title: updatedChats.find(c => c.path === path)?.hidden 
        ? "Chat hidden" 
        : "Chat visible",
      description: "Your chats have been updated.",
    });
  };

  const handleRenameChat = (path: string, newTitle: string) => {
    if (newTitle.trim()) {
      const updatedChats = activeChats.map(chat => 
        chat.path === path ? { ...chat, title: newTitle.trim() } : chat
      );
      
      saveChats(updatedChats);
      
      toast({
        title: "Chat renamed",
        description: "Your chat has been updated.",
      });
    }
  };

  return {
    activeChats,
    setActiveChats,
    handlePinChat,
    handleHideChat,
    handleRenameChat
  };
};
