
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BookUser, GraduationCap, Home, MessageSquare, Plus, Target, Users } from 'lucide-react';
import { useCoachSidebar } from '../../hooks/useCoachSidebar';
import SidebarItem from './SidebarItem';
import ChatList from './ChatList';
import { ChatItem } from '../../hooks/useCoachSidebar';

interface SubItem {
  label: string;
  path: string;
}

interface NavigationItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  subItems?: SubItem[];
  chats?: ChatItem[];
  onClick?: (e: React.MouseEvent) => void;
}

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

  const navigationItems: NavigationItem[] = [
    { 
      icon: <Home size={20} />, 
      label: 'Dashboard', 
      path: '/coach' 
    },
    { 
      icon: <BookUser size={20} />, 
      label: 'Coaching', 
      path: '/coach/coaching',
      subItems: [
        { label: 'Drive & Motivation', path: '/coach/coaching/drive' },
        { label: 'Sales Skills', path: '/coach/coaching/sales' },
        { label: 'Relationship Building', path: '/coach/coaching/relationship' },
      ]
    },
    { 
      icon: <Users size={20} />, 
      label: 'Roleplay', 
      path: '/coach/roleplay',
      subItems: [
        { label: 'Home Buyers', path: '/coach/roleplay/buyers' },
        { label: 'Home Sellers', path: '/coach/roleplay/sellers' },
        { label: 'Investors', path: '/coach/roleplay/investors' },
      ] 
    },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Chats', 
      path: '/coach/chats',
      chats: activeChats
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
            
            {item.subItems && item.subItems.length > 0 && (
              <ChatList
                chats={item.subItems.map(subItem => ({
                  title: subItem.label,
                  path: subItem.path,
                  hidden: false,
                  pinned: false
                }))}
                onPinChat={handlePinChat}
                onHideChat={handleHideChat}
                onRenameChat={handleRenameChat}
              />
            )}
            
            {item.chats && item.chats.length > 0 && (
              <ChatList
                chats={item.chats}
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
