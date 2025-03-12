
import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, ThumbsDown, FileText, Edit, Trash, Check, X } from 'lucide-react';
import { Source } from './ContentTypes';

interface ChatMessageProps {
  id?: string;
  content: string;
  sender: 'user' | 'ai';
  sources?: Source[];
  timestamp: Date;
  toggleSourcesPanel: () => void;
  onDelete?: (id: string) => void;
  onEdit?: (id: string, newContent: string) => void;
}

const ChatMessage: React.FC<ChatMessageProps> = ({
  id = '',
  content,
  sender,
  sources,
  timestamp,
  toggleSourcesPanel,
  onDelete,
  onEdit
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);

  const handleEdit = () => {
    if (onEdit && id) {
      onEdit(id, editedContent);
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (onDelete && id) {
      onDelete(id);
    }
  };

  const cancelEdit = () => {
    setEditedContent(content);
    setIsEditing(false);
  };

  return (
    <div className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div 
        className={`max-w-[80%] rounded-lg p-4 ${
          sender === 'user' 
            ? 'bg-gray-800 text-white dark:bg-gray-700' 
            : 'bg-white border border-border dark:bg-gray-800 dark:border-gray-700 dark:text-white'
        }`}
      >
        <div className="flex items-center mb-2">
          {sender === 'ai' && (
            <div className="mr-2 bg-gray-100 p-1 rounded-full dark:bg-gray-700">
              <MessageSquare size={16} className="text-gray-600 dark:text-gray-300" />
            </div>
          )}
          <span className="font-medium">
            {sender === 'user' ? 'You' : 'Content AI'}
          </span>
        </div>
        
        {isEditing ? (
          <div className="mt-2">
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full p-2 border rounded bg-white text-black dark:bg-gray-700 dark:text-white dark:border-gray-600"
              rows={3}
            />
            <div className="flex justify-end mt-2 space-x-2">
              <button 
                onClick={cancelEdit}
                className="p-1 rounded text-red-500 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <X size={16} />
              </button>
              <button 
                onClick={handleEdit}
                className="p-1 rounded text-green-500 hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Check size={16} />
              </button>
            </div>
          </div>
        ) : (
          <p>{content}</p>
        )}
        
        <div className="flex items-center mt-2 space-x-2 text-gray-500 dark:text-gray-400">
          {sender === 'user' && !isEditing && (
            <>
              <button 
                className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
                onClick={() => setIsEditing(true)}
              >
                <Edit size={16} />
              </button>
              <button 
                className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700"
                onClick={handleDelete}
              >
                <Trash size={16} />
              </button>
            </>
          )}
          
          {sender === 'ai' && (
            <>
              <button className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                <ThumbsUp size={16} />
              </button>
              <button className="p-1 hover:bg-gray-100 rounded dark:hover:bg-gray-700">
                <ThumbsDown size={16} />
              </button>
              {sources && sources.length > 0 && (
                <div className="ml-auto flex items-center">
                  <button 
                    onClick={toggleSourcesPanel}
                    className="flex items-center text-gray-600 hover:underline dark:text-gray-300"
                  >
                    <FileText size={14} className="mr-1" />
                    <span className="text-xs">{sources.length} sources</span>
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
