
import React from 'react';
import { EnhancedPrompt } from "@/utils/promptEnhancer";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ChatEnhancementSuggestionProps {
  enhancedPrompt: EnhancedPrompt;
  onAccept: (enhancedText: string) => void;
  onReject: () => void;
}

const ChatEnhancementSuggestion: React.FC<ChatEnhancementSuggestionProps> = ({
  enhancedPrompt,
  onAccept,
  onReject
}) => {
  const categoryLabels: Record<string, string> = {
    'social-media': 'Social Media',
    'email': 'Email',
    'sales': 'Sales',
    'content': 'Content',
    'seo': 'SEO',
    'general': 'General'
  };
  
  const categoryColors: Record<string, string> = {
    'social-media': 'bg-blue-100 text-blue-800',
    'email': 'bg-purple-100 text-purple-800',
    'sales': 'bg-green-100 text-green-800',
    'content': 'bg-amber-100 text-amber-800',
    'seo': 'bg-red-100 text-red-800',
    'general': 'bg-gray-100 text-gray-800'
  };

  return (
    <Card className="mb-4 border-2 border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-yellow-500" />
            We can enhance your prompt
          </CardTitle>
          <Badge variant="outline" className={`text-xs ${categoryColors[enhancedPrompt.category]}`}>
            {categoryLabels[enhancedPrompt.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2">
        <p className="text-xs text-muted-foreground">
          Our AI can improve your prompt for better results
        </p>
      </CardContent>
      <CardFooter className="flex justify-end gap-2 py-2">
        <Button variant="outline" size="sm" onClick={onReject} className="h-8 text-xs">
          No thanks
        </Button>
        <Button 
          size="sm" 
          className="bg-yellow-600 hover:bg-yellow-700 h-8 text-xs"
          onClick={() => onAccept(enhancedPrompt.enhanced)}
        >
          Use enhanced prompt
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatEnhancementSuggestion;
