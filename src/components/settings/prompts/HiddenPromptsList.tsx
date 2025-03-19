
import React from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { Button } from '@/components/ui/button';
import { EyeOff, Eye } from 'lucide-react';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface HiddenPromptsListProps {
  hiddenPrompts: ContentAsset[];
  onToggleHide: (prompt: ContentAsset) => void;
}

const HiddenPromptsList: React.FC<HiddenPromptsListProps> = ({
  hiddenPrompts,
  onToggleHide
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="outline">
          <EyeOff className="mr-2 h-4 w-4" />
          {hiddenPrompts.length} Hidden
        </Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <h4 className="mb-2 font-medium">Hidden Prompts</h4>
        <div className="space-y-2">
          {hiddenPrompts.map(prompt => (
            <div key={prompt.id} className="flex items-center justify-between">
              <span className="text-sm truncate">{prompt.title}</span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onToggleHide(prompt)}
              >
                <Eye className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};

export default HiddenPromptsList;
