
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Bot, Pin, PinOff, Eye, EyeOff } from 'lucide-react';
import { ContentAsset } from '@/types/contentAssets';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";

interface PromptCardProps {
  prompt: ContentAsset;
  onEditPrompt: (prompt: ContentAsset) => void;
  onTogglePin: (prompt: ContentAsset) => void;
  onToggleHide: (prompt: ContentAsset) => void;
  onDeletePrompt: (id: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onEditPrompt,
  onTogglePin,
  onToggleHide,
  onDeletePrompt
}) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <Card 
          className={`cursor-pointer hover:shadow-md transition-shadow group relative ${
            prompt.aiType === 'content' ? 'border-blue-100' : 
            prompt.aiType === 'compliance' ? 'border-green-100' : 
            'border-purple-100'
          } ${prompt.pinned ? 'ring-2 ring-primary/20' : ''}`}
          onClick={() => onEditPrompt(prompt)}
        >
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="text-2xl">{prompt.icon}</div>
              <div className="flex-1">
                <div className="font-medium flex items-center">
                  {prompt.title}
                  {prompt.pinned && (
                    <Pin className="ml-2 h-3 w-3 text-primary" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">{prompt.subtitle}</div>
                <div className="mt-2 flex items-center gap-1 text-xs">
                  <Bot className="h-3 w-3" />
                  <span className={`px-2 py-0.5 rounded-full ${
                    prompt.aiType === 'content' ? 'bg-blue-100 text-blue-800' : 
                    prompt.aiType === 'compliance' ? 'bg-green-100 text-green-800' : 
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {prompt.aiType?.charAt(0).toUpperCase() + prompt.aiType?.slice(1)} AI
                  </span>
                </div>
              </div>
            </div>
            
            <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onTogglePin(prompt);
                }}
              >
                {prompt.pinned ? (
                  <PinOff className="h-4 w-4" />
                ) : (
                  <Pin className="h-4 w-4" />
                )}
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleHide(prompt);
                }}
              >
                <EyeOff className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => onEditPrompt(prompt)}>
          Edit Prompt
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onTogglePin(prompt)}>
          {prompt.pinned ? (
            <>
              <PinOff className="mr-2 h-4 w-4" />
              Unpin Prompt
            </>
          ) : (
            <>
              <Pin className="mr-2 h-4 w-4" />
              Pin Prompt
            </>
          )}
        </ContextMenuItem>
        <ContextMenuItem onClick={() => onToggleHide(prompt)}>
          <EyeOff className="mr-2 h-4 w-4" />
          Hide Prompt
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem 
          className="text-red-600 focus:text-red-600"
          onClick={() => onDeletePrompt(prompt.id)}
        >
          Delete Prompt
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default PromptCard;
