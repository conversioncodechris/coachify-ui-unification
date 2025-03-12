
import React from 'react';

interface ChatSessionManagerProps {
  topic: string | null;
  chatId: string | null;
}

const ChatSessionManager: React.FC<ChatSessionManagerProps> = () => {
  // This component no longer needs to handle session management
  // as it's now managed in useContentChatSessions and ContentChatInterface
  return null;
};

export default ChatSessionManager;
