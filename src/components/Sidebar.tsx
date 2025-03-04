
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Plus, FileText } from 'lucide-react';

interface SidebarProps {
  type: 'mortgage' | 'content' | 'coach';
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  // Define sidebar items based on type
  const getMortgageItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/mortgage' },
    { icon: <MessageSquare size={20} />, label: 'Chats', path: '/mortgage/chats' },
    { icon: <Plus size={20} />, label: 'New Chat', path: '/mortgage/new-chat' },
  ];

  const getContentItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/content' },
    { icon: <FileText size={20} />, label: 'Blog Post', path: '/content/blog' },
    { icon: <FileText size={20} />, label: 'Email', path: '/content/email' },
    { icon: <FileText size={20} />, label: 'Video', path: '/content/video' },
    { icon: <FileText size={20} />, label: 'LinkedIn', path: '/content/linkedin' },
    { icon: <FileText size={20} />, label: 'Instagram', path: '/content/instagram' },
    { icon: <FileText size={20} />, label: 'Twitter', path: '/content/twitter' },
    { icon: <FileText size={20} />, label: 'Facebook', path: '/content/facebook' },
  ];

  const getCoachItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/coach' },
    { icon: <MessageSquare size={20} />, label: 'Coach AI chatting', path: '/coach/chatting', 
      subItems: [
        { label: 'Zig, the Loan Officer Coach', path: '/coach/chatting/zig' },
        { label: 'Drive & motivation', path: '/coach/chatting/drive' },
        { label: 'Sales skills & techniques', path: '/coach/chatting/sales' },
        { label: 'Personality & behavioral', path: '/coach/chatting/personality' },
        { label: 'Relationship building', path: '/coach/chatting/relationship' },
        { label: 'Systematic process', path: '/coach/chatting/process' },
        { label: 'Teamwork & culture', path: '/coach/chatting/teamwork' },
      ]
    },
    { icon: <MessageSquare size={20} />, label: 'Roleplay chatting', path: '/coach/roleplay',
      subItems: [
        { label: 'John and Sarah, the Expectant Couple', path: '/coach/roleplay/john-sarah' },
        { label: 'Michael, Balanced Commercial Specialist', path: '/coach/roleplay/michael' },
        { label: 'Sophia, Conservative Commercial Pro', path: '/coach/roleplay/sophia' },
        { label: 'David and Emma, the Busy Parents', path: '/coach/roleplay/david-emma' },
        { label: 'Kevin, Innovative Luxury Specialist', path: '/coach/roleplay/kevin' },
      ]
    },
  ];

  const sidebarItems = {
    mortgage: getMortgageItems(),
    content: getContentItems(),
    coach: getCoachItems(),
  };

  const items = sidebarItems[type];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-insta-gray border-r border-border overflow-auto">
      <div className="p-4 text-sm font-medium text-insta-darkGray uppercase">
        {type === 'mortgage' && 'Navigation'}
        {type === 'content' && 'Type'}
        {type === 'coach' && 'Navigation'}
      </div>
      
      <nav className="flex flex-col space-y-1 px-2">
        {items.map((item, index) => (
          <div key={index}>
            <Link
              to={item.path}
              className={`insta-sidebar-item ${currentPath === item.path ? 'active' : ''}`}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
            
            {'subItems' in item && item.subItems && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    to={subItem.path}
                    className={`insta-sidebar-item text-sm ${currentPath === subItem.path ? 'active' : ''}`}
                  >
                    <span>{subItem.label}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
