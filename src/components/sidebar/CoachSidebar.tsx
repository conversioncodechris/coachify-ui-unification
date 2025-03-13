
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Plus } from 'lucide-react';
import { useCoachSidebar } from '../../hooks/useCoachSidebar';
import SidebarItem from './SidebarItem';
import ChatList from './ChatList';

const CoachSidebar = () => {
  const navigate = useNavigate();
  const {
    activeChats,
    handlePinChat,
    handleHideChat,
    handleRenameChat
  } = useCoachSidebar();

  const handleNewChat = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/coach');
  };

  const navigationItems = [
    { 
      icon: <Home size={20} />, 
      label: 'Dashboard', 
      path: '/coach' 
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Chats', 
      path: '/coach/chats',
      subItems: activeChats
    },
    { 
      icon: <Plus size={20} />, 
      label: 'New Chat', 
      path: '/coach/new-chat',
      onClick: handleNewChat
    },
  ];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-sidebar border-r border-border overflow-auto">
      <div className="p-4 text-sm font-medium text-sidebar-foreground uppercase">
        Coach
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

export default CoachSidebar;
