
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Edit2, Eye, EyeOff, Pin, PinOff } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { ChatItem as ChatItemType } from '../../hooks/useCoachSidebar';

interface ChatItemProps {
  chat: ChatItemType;
  onPin: (path: string) => void;
  onHide: (path: string) => void;
  onRename: (path: string, newTitle: string) => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  chat,
  onPin,
  onHide,
  onRename
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editValue, setEditValue] = useState(chat.title);
  const location = useLocation();
  const currentPath = location.pathname;
  const isActive = currentPath === chat.path;

  const handleRenameClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsEditing(true);
    setEditValue(chat.title);
  };

  const handleRenameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onRename(chat.path, editValue);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <form 
        onSubmit={handleRenameSubmit}
        onClick={(e) => e.stopPropagation()}
        className="px-2"
      >
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          autoFocus
          className="w-full text-sm border border-insta-lightBlue rounded p-1"
          onBlur={() => setIsEditing(false)}
        />
      </form>
    );
  }

  return (
    <div className="relative group">
      <a
        href={chat.path}
        className={cn(
          "insta-sidebar-item text-sm flex items-center justify-between pr-2",
          isActive && "active",
          chat.pinned && "border border-[#BBBCBF]",
          "group"
        )}
      >
        <div className="flex items-center max-w-[65%]">
          <span className="truncate pl-1" title={chat.title}>
            {chat.title}
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
                    onPin(chat.path);
                  }}
                  className="p-1 hover:bg-background rounded"
                >
                  {chat.pinned ? 
                    <PinOff size={14} className="text-insta-lightText" /> : 
                    <Pin size={14} className="text-insta-lightText" />
                  }
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{chat.pinned ? 'Unpin chat' : 'Pin chat'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <button 
                  onClick={handleRenameClick}
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
                    onHide(chat.path);
                  }}
                  className="p-1 hover:bg-background rounded"
                >
                  {chat.hidden ? 
                    <Eye size={14} className="text-insta-lightText" /> : 
                    <EyeOff size={14} className="text-insta-lightText" />
                  }
                </button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{chat.hidden ? 'Show chat' : 'Hide chat'}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {chat.pinned && (
          <div className="absolute top-0 left-0 bg-insta-blue text-white p-0.5 text-xs rounded-tl-md rounded-br-md w-4 h-4 flex items-center justify-center">
            <Pin size={14} />
          </div>
        )}
      </a>
    </div>
  );
};

export default ChatItem;
