
import React from 'react';
import { ContentAsset } from '@/types/contentAssets';
import PromptCard from './PromptCard';

interface PromptsGridProps {
  prompts: ContentAsset[];
  onEditPrompt: (prompt: ContentAsset) => void;
  onTogglePin: (prompt: ContentAsset) => void;
  onToggleHide: (prompt: ContentAsset) => void;
  onDeletePrompt: (id: string) => void;
}

const PromptsGrid: React.FC<PromptsGridProps> = ({
  prompts,
  onEditPrompt,
  onTogglePin,
  onToggleHide,
  onDeletePrompt
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {prompts.map((prompt) => (
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
  );
};

export default PromptsGrid;
