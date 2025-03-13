
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Plus } from 'lucide-react';
import { useContentSidebar } from '../../hooks/useContentSidebar';
import SidebarItem from './SidebarItem';
import ChatList from './ChatList';

const ContentSidebar = () => {
  const navigate = useNavigate();
  const {
    activeChats,
    handlePinChat,
    handleHideChat,
    handleRenameChat,
    createEmptyChat
  } = useContentSidebar();

  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();
    createEmptyChat();
  };

  const navigationItems = [
    { 
      icon: <Home size={20} />, 
      label: 'Dashboard', 
      path: '/content' 
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Chats', 
      path: '/content/chats',
      subItems: activeChats
    },
    { 
      icon: <Plus size={20} />, 
      label: 'New Chat', 
      path: '/content/new-chat',
      onClick: handleNewChat
    },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-insta-gray border-r border-border overflow-auto">
      <div className="p-4 text-sm font-medium text-insta-darkGray uppercase">
        Type
      </div>
      
      <nav className="flex flex-col space-y-1 px-2">
        {navigationItems.map((item, index) => (
          <div key={index}>
            <SidebarItem
              icon={item.icon}
              label={item.label}
              path={item.path}
              onClick={item.onClick}
            />
            
            {'subItems' in item && item.subItems && (
              <ChatList
                chats={item.subItems}
                onPinChat={handlePinChat}
                onHideChat={handleHideChat}
                onRenameChat={handleRenameChat}
              />
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default ContentSidebar;
