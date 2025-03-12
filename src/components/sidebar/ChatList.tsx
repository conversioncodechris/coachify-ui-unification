
import React from 'react';
import ChatItem from './ChatItem';
import { ChatItem as ChatItemType } from '../../hooks/useCoachSidebar';

interface ChatListProps {
  chats: ChatItemType[];
  onPinChat: (path: string) => void;
  onHideChat: (path: string) => void;
  onRenameChat: (path: string, newTitle: string) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chats,
  onPinChat,
  onHideChat,
  onRenameChat
}) => {
  const visibleChats = chats.filter(chat => !chat.hidden);

  if (visibleChats.length === 0) {
    return null;
  }

  return (
    <div className="ml-8 mt-1 space-y-1">
      {visibleChats.map((chat, index) => (
        <ChatItem
          key={index}
          chat={chat}
          onPin={onPinChat}
          onHide={onHideChat}
          onRename={onRenameChat}
        />
      ))}
    </div>
  );
};

export default ChatList;
