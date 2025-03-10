
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Home, MessageSquare, Plus, Edit2, Eye, EyeOff, Pin, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChatItem, useContentSidebar } from '../hooks/useContentSidebar';

const ContentSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  const [editingChat, setEditingChat] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  
  const {
    activeChats,
    handlePinChat,
    handleHideChat,
    handleRenameChat
  } = useContentSidebar();

  const items = [
    { icon: <Home size={20} />, label: 'Dashboard', path: '/content' },
    { 
      icon: <MessageSquare size={20} />, 
      label: 'Chats', 
      path: '/content/chats',
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
      path: '/content/new-chat',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        navigate('/content');
      }
    },
  ];

  const handleRenameClick = (path: string, currentTitle: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setEditingChat(path);
    setEditValue(currentTitle);
  };

  const handleRenameSubmit = (path: string, event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();
    handleRenameChat(path, editValue);
    setEditingChat(null);
  };

  return (
    <aside className="w-64 h-[calc(100vh-4rem)] bg-insta-gray border-r border-border overflow-auto">
      <div className="p-4 text-sm font-medium text-insta-darkGray uppercase">
        Type
      </div>
      
      <nav className="flex flex-col space-y-1 px-2">
        {items.map((item, index) => (
          <div key={index}>
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className={cn("insta-sidebar-item w-full text-left", currentPath === item.path && "active")}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <a
                href={item.path}
                className={cn("insta-sidebar-item", currentPath === item.path && "active")}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
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
                      <a
                        href={subItem.path}
                        className={cn(
                          "insta-sidebar-item text-sm flex items-center justify-between pr-2",
                          currentPath === subItem.path && "active",
                          subItem.pinned && "border border-[#BBBCBF]",
                          "group"
                        )}
                      >
                        <div className="flex items-center max-w-[65%]">
                          <span className="truncate pl-1" title={subItem.label}>
                            {subItem.label}
                          </span>
                        </div>
                        
                        <div className="flex items-center -ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <button 
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handlePinChat(subItem.path);
                                  }}
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
                                  onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleHideChat(subItem.path);
                                  }}
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
                        
                        {subItem.pinned && (
                          <div className="absolute top-0 left-0 bg-insta-blue text-white p-0.5 text-xs rounded-tl-md rounded-br-md w-4 h-4 flex items-center justify-center">
                            <Pin size={14} />
                          </div>
                        )}
                      </a>
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

export default ContentSidebar;
