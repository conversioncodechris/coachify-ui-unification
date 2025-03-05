
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Plus, FileText, Pin, Eye, Edit2, EyeOff, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

interface SidebarProps {
  type: 'compliance' | 'content' | 'coach';
}

interface ChatItem {
  title: string;
  path: string;
  hidden?: boolean;
  pinned?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ type }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const currentPath = location.pathname;
  const [activeChats, setActiveChats] = useState<ChatItem[]>([]);
  const [editingChat, setEditingChat] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  useEffect(() => {
    if (type === 'compliance') {
      const savedChats = localStorage.getItem('complianceActiveChats');
      if (savedChats) {
        setActiveChats(JSON.parse(savedChats));
      }
    }
  }, [type, location.pathname]); // Add location.pathname to dependencies to refresh when route changes

  const saveChats = (chats: ChatItem[]) => {
    localStorage.setItem('complianceActiveChats', JSON.stringify(chats));
    setActiveChats(chats);
  };

  const handlePinChat = (path: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    const updatedChats = activeChats.map(chat => 
      chat.path === path ? { ...chat, pinned: !chat.pinned } : chat
    );
    
    // Sort to put pinned chats first
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

  const handleHideChat = (path: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
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

  const handleRenameClick = (path: string, currentTitle: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setEditingChat(path);
    setEditValue(currentTitle);
  };

  const handleRenameSubmit = (path: string, event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    if (editValue.trim()) {
      const updatedChats = activeChats.map(chat => 
        chat.path === path ? { ...chat, title: editValue.trim() } : chat
      );
      
      saveChats(updatedChats);
      setEditingChat(null);
      
      toast({
        title: "Chat renamed",
        description: "Your chat has been updated.",
      });
    }
  };

  const getComplianceItems = () => [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/compliance' },
    { icon: <MessageSquare size={20} />, label: 'Chats', path: '/compliance/chats', 
      subItems: activeChats
        .filter(chat => !chat.hidden)
        .map(chat => ({
          label: chat.title,
          path: chat.path,
          pinned: chat.pinned,
          originalChat: chat
        }))
    },
    { 
      icon: <Plus size={20} />, 
      label: 'New Chat', 
      path: '/compliance/new-chat',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/compliance');
        // Clear selected topic if we're starting a new chat
        if (currentPath.includes('/compliance/chat/')) {
          console.log('Starting new chat - navigating to compliance page');
        }
      }
    },
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
    compliance: getComplianceItems(),
    content: getContentItems(),
    coach: getCoachItems(),
  };

  const items = sidebarItems[type];

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-insta-gray border-r border-border overflow-auto">
      <div className="p-4 text-sm font-medium text-insta-darkGray uppercase">
        {type === 'compliance' && ''}
        {type === 'content' && 'Type'}
        {type === 'coach' && ''}
      </div>
      
      <nav className="flex flex-col space-y-1 px-2">
        {items.map((item, index) => (
          <div key={index}>
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={`insta-sidebar-item w-full text-left ${currentPath === item.path ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <Link
                to={item.path}
                className={`insta-sidebar-item ${currentPath === item.path ? 'active' : ''}`}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )}
            
            {'subItems' in item && item.subItems && item.subItems.length > 0 && (
              <div className="ml-8 mt-1 space-y-1">
                {item.subItems.map((subItem, subIndex) => (
                  <div 
                    key={subIndex} 
                    className="relative group"
                  >
                    {editingChat === subItem.path ? (
                      <form 
                        onSubmit={(e) => handleRenameSubmit(subItem.path, e)}
                        onClick={(e) => e.stopPropagation()}
                        className="px-2"
                      >
                        <input
                          type="text"
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          autoFocus
                          className="w-full text-sm border border-insta-lightBlue rounded p-1"
                          onBlur={() => setEditingChat(null)}
                        />
                      </form>
                    ) : (
                      <Link
                        to={subItem.path}
                        className={cn(
                          "insta-sidebar-item text-sm flex items-center justify-between pr-2",
                          currentPath === subItem.path ? 'active' : '',
                          'group'
                        )}
                      >
                        <div className="flex items-center max-w-[55%]">
                          {subItem.pinned && <Pin size={12} className="mr-1 flex-shrink-0 text-insta-blue" />}
                          <span className="truncate" title={subItem.label}>
                            {subItem.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => handlePinChat(subItem.path, e)}
                                  className="p-1 hover:bg-background rounded"
                                >
                                  {subItem.pinned ? 
                                    <PinOff size={14} className="text-insta-lightText" /> : 
                                    <Pin size={14} className="text-insta-lightText" />
                                  }
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>{subItem.pinned ? 'Unpin chat' : 'Pin chat'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => handleRenameClick(subItem.path, subItem.label, e)}
                                  className="p-1 hover:bg-background rounded"
                                >
                                  <Edit2 size={14} className="text-insta-lightText" />
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>Rename chat</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => handleHideChat(subItem.path, e)}
                                  className="p-1 hover:bg-background rounded"
                                >
                                  {('originalChat' in subItem && subItem.originalChat?.hidden) ? 
                                    <Eye size={14} className="text-insta-lightText" /> : 
                                    <EyeOff size={14} className="text-insta-lightText" />
                                  }
                                </button>
                              </TooltipTrigger>
                              <TooltipContent side="right">
                                <p>{('originalChat' in subItem && subItem.originalChat?.hidden) ? 'Show chat' : 'Hide chat'}</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </Link>
                    )}
                  </div>
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
