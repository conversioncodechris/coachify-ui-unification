
import React from 'react';
import { ContentAsset } from '@/types/contentAssets';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Edit, Pin, PinOff, EyeOff, Trash2, MessageSquare } from 'lucide-react';

interface PromptCardProps {
  prompt: ContentAsset;
  onEditPrompt: (prompt: ContentAsset) => void;
  onTogglePin: (prompt: ContentAsset) => void;
  onToggleHide: (prompt: ContentAsset) => void;
  onDeletePrompt: (id: string) => void;
  onOpenInChat?: (prompt: ContentAsset) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({
  prompt,
  onEditPrompt,
  onTogglePin,
  onToggleHide,
  onDeletePrompt,
  onOpenInChat
}) => {
  const formatDate = (date: Date | string) => {
    if (!date) return 'Unknown date';
    const d = new Date(date);
    return isNaN(d.getTime()) ? 'Invalid date' : d.toLocaleDateString();
  };
  
  const isConversational = prompt.conversational || prompt.content?.includes("Let's turn your expertise");

  return (
    <Card className={`relative overflow-hidden ${prompt.pinned ? 'border-accent' : ''}`}>
      {prompt.pinned && (
        <div className="absolute top-0 right-0 bg-accent text-accent-foreground px-2 py-1 text-xs">
          Pinned
        </div>
      )}
      
      <CardContent className="pt-6">
        <div className="flex items-start mb-4">
          <div className="text-4xl mr-3">{prompt.icon || '📄'}</div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{prompt.title}</h3>
            <p className="text-sm text-muted-foreground">{prompt.subtitle || prompt.description || 'No description available'}</p>
          </div>
        </div>
        
        <div className="text-sm mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            <Badge variant="outline">{prompt.aiType || 'content'}</Badge>
            {prompt.isNew && <Badge variant="secondary">New</Badge>}
            {isConversational && <Badge variant="secondary" className="bg-purple-100 text-purple-800 border-purple-200">Conversational</Badge>}
          </div>
          
          <div className="text-muted-foreground text-xs">
            Added: {formatDate(prompt.dateAdded)}
          </div>
        </div>
        
        {prompt.content && (
          <div className="border-t pt-2 mt-2">
            <p className="text-sm line-clamp-2 text-muted-foreground">
              {prompt.content.substring(0, 100)}{prompt.content.length > 100 ? '...' : ''}
            </p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between pt-2 pb-4 gap-2">
        <div className="flex gap-1">
          <Button variant="outline" size="sm" onClick={() => onEditPrompt(prompt)}>
            <Edit className="h-4 w-4 mr-1" />
            Edit
          </Button>
          
          {onOpenInChat && isConversational && (
            <Button variant="secondary" size="sm" className="bg-purple-100 text-purple-800 hover:bg-purple-200" onClick={() => onOpenInChat(prompt)}>
              <MessageSquare className="h-4 w-4 mr-1" />
              Open in Chat
            </Button>
          )}
        </div>
        
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={() => onTogglePin(prompt)}>
            {prompt.pinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </Button>
          
          <Button variant="ghost" size="icon" onClick={() => onToggleHide(prompt)}>
            <EyeOff className="h-4 w-4" />
          </Button>
          
          <Button variant="ghost" size="icon" className="text-destructive" onClick={() => onDeletePrompt(prompt.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PromptCard;
