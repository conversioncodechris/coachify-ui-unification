
import React from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { MessageSquare } from 'lucide-react';
import PromptCard from './PromptCard';
import HiddenPromptsList from './HiddenPromptsList';

interface PromptsListProps {
  visiblePrompts: ContentAsset[];
  hiddenPrompts: ContentAsset[];
  onEditPrompt: (prompt: ContentAsset) => void;
  onTogglePin: (prompt: ContentAsset) => void;
  onToggleHide: (prompt: ContentAsset) => void;
  onDeletePrompt: (id: string) => void;
}

const PromptsList: React.FC<PromptsListProps> = ({
  visiblePrompts,
  hiddenPrompts,
  onEditPrompt,
  onTogglePin,
  onToggleHide,
  onDeletePrompt
}) => {
  if (visiblePrompts.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-gray-50">
        <MessageSquare className="mx-auto h-10 w-10 text-gray-400" />
        <p className="mt-2 text-lg font-medium">No prompts created yet</p>
        <p className="mt-1 text-sm text-gray-500">Add prompts that will appear as topic cards in the AI interfaces</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {visiblePrompts.map((prompt) => (
          <PromptCard
            key={prompt.id}
            prompt={prompt}
            onEditPrompt={onEditPrompt}
            onTogglePin={onTogglePin}
            onToggleHide={onToggleHide}
            onDeletePrompt={onDeletePrompt}
          />
        ))}
      </div>
      
      {hiddenPrompts.length > 0 && (
        <HiddenPromptsList 
          hiddenPrompts={hiddenPrompts} 
          onToggleHide={onToggleHide} 
        />
      )}
    </div>
  );
};

export default PromptsList;
