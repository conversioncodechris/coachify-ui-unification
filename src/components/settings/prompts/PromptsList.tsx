
import React from 'react';
import { ContentAsset } from '@/types/contentAssets';
import EmptyState from './EmptyState';
import PromptsGrid from './PromptsGrid';
import HiddenPromptsList from './HiddenPromptsList';

interface PromptsListProps {
  visiblePrompts: ContentAsset[];
  hiddenPrompts: ContentAsset[];
  onEditPrompt: (prompt: ContentAsset) => void;
  onTogglePin: (prompt: ContentAsset) => void;
  onToggleHide: (prompt: ContentAsset) => void;
  onDeletePrompt: (id: string) => void;
  onOpenInChat?: (prompt: ContentAsset) => void;
}

const PromptsList: React.FC<PromptsListProps> = ({
  visiblePrompts,
  hiddenPrompts,
  onEditPrompt,
  onTogglePin,
  onToggleHide,
  onDeletePrompt,
  onOpenInChat
}) => {
  if (visiblePrompts.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="space-y-4">
      <PromptsGrid
        prompts={visiblePrompts}
        onEditPrompt={onEditPrompt}
        onTogglePin={onTogglePin}
        onToggleHide={onToggleHide}
        onDeletePrompt={onDeletePrompt}
        onOpenInChat={onOpenInChat}
      />
      
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
