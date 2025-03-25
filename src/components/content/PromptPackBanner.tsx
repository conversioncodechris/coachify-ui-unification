
import React from 'react';
import { contentPromptPacks } from '@/data/promptPacks';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PromptPackBanner: React.FC = () => {
  const navigate = useNavigate();
  // Just show the first pack for now
  const pack = contentPromptPacks[0];

  if (!pack) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-4 py-2 border-b flex items-center justify-between">
      <div className="flex items-center gap-2 overflow-hidden">
        <Sparkles className="h-4 w-4 text-purple-500 flex-shrink-0" />
        <span className="text-sm font-medium whitespace-nowrap">{pack.name} Pack:</span>
        <div className="flex gap-1 overflow-x-auto hide-scrollbar">
          {pack.prompts.slice(0, 3).map((prompt) => (
            <Badge 
              key={prompt.id} 
              variant="outline" 
              className="whitespace-nowrap flex items-center gap-1 bg-white/70"
            >
              <span>{prompt.icon}</span>
              <span className="max-w-28 truncate">{prompt.title}</span>
            </Badge>
          ))}
          {pack.prompts.length > 3 && (
            <Badge variant="outline" className="whitespace-nowrap bg-white/70">
              +{pack.prompts.length - 3} more
            </Badge>
          )}
        </div>
      </div>
      <Button 
        variant="ghost" 
        size="sm" 
        onClick={() => navigate('/customize-aire')}
        className="text-xs font-medium text-purple-600 hover:text-purple-800 flex-shrink-0"
      >
        Import
      </Button>
    </div>
  );
};

export default PromptPackBanner;
