
import React, { useState } from 'react';
import { EnhancedPrompt } from "@/utils/promptEnhancer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface PromptEnhancementSuggestionProps {
  enhancedPrompt: EnhancedPrompt | null;
  onAccept: (enhancedText: string) => void;
  onReject: () => void;
}

const PromptEnhancementSuggestion: React.FC<PromptEnhancementSuggestionProps> = ({
  enhancedPrompt,
  onAccept,
  onReject
}) => {
  const [showDiff, setShowDiff] = useState(false);
  
  if (!enhancedPrompt) return null;

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
    <Card className="mt-6 border-2 border-yellow-200 bg-yellow-50">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI-Enhanced Prompt Suggestion
          </CardTitle>
          <Badge variant="outline" className={categoryColors[enhancedPrompt.category]}>
            {categoryLabels[enhancedPrompt.category]}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-2">
          We've analyzed your prompt and created an enhanced version that may be more effective.
        </p>
        <Textarea 
          value={enhancedPrompt.enhanced} 
          className="min-h-[200px] text-sm bg-white"
          readOnly
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-2">
        <Button variant="outline" size="sm" onClick={onReject}>
          <X className="h-4 w-4 mr-2" />
          Keep Original
        </Button>
        <Button 
          size="sm" 
          className="bg-yellow-600 hover:bg-yellow-700"
          onClick={() => onAccept(enhancedPrompt.enhanced)}
        >
          <Check className="h-4 w-4 mr-2" />
          Use Enhanced Version
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptEnhancementSuggestion;
