
import React from 'react';
import { MessageSquare } from 'lucide-react';

const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-10 border rounded-lg bg-gray-50">
      <MessageSquare className="mx-auto h-10 w-10 text-gray-400" />
      <p className="mt-2 text-lg font-medium">No prompts created yet</p>
      <p className="mt-1 text-sm text-gray-500">Add prompts that will appear as topic cards in the AI interfaces</p>
    </div>
  );
};

export default EmptyState;
