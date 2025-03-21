import React from 'react';
import { EnhancedPrompt } from "@/utils/promptEnhancer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Sparkles, Check, X, Lightbulb } from "lucide-react";
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

  const handleAccept = () => {
    if (enhancedPrompt && enhancedPrompt.enhanced) {
      onAccept(enhancedPrompt.enhanced);
    }
  };

  if (!enhancedPrompt) {
    return (
      <Card className="mt-0 border-2 border-gray-100 bg-gray-50 h-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-gray-500" />
            AI Enhancement Tips
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-4 text-sm text-muted-foreground">
            <p>Enter your prompt content to see AI-powered enhancements appear here.</p>
            
            <div className="bg-white p-4 rounded-md border border-gray-100">
              <h3 className="font-medium text-gray-700 mb-2">Tips for effective prompts:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>Be specific about your desired output</li>
                <li>Include context about the audience or purpose</li>
                <li>Mention tone, style, or format preferences</li>
                <li>Add at least 15 characters to see enhancement suggestions</li>
              </ul>
            </div>
            
            <p className="italic">
              Write your prompt content in the left panel, and our AI will suggest 
              improvements based on the purpose and content.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-0 border-2 border-yellow-200 bg-yellow-50 h-full">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-500" />
            AI-Enhanced Prompt
          </CardTitle>
          <Badge variant="outline" className={`${categoryColors[enhancedPrompt.category]} whitespace-nowrap`}>
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
          className="min-h-[180px] text-sm bg-white w-full resize-none"
          readOnly
        />
      </CardContent>
      <CardFooter className="flex justify-between gap-2 flex-wrap">
        <Button variant="outline" size="sm" onClick={onReject}>
          <X className="h-4 w-4 mr-2" />
          Keep Original
        </Button>
        <Button 
          size="sm" 
          className="bg-yellow-600 hover:bg-yellow-700"
          onClick={handleAccept}
        >
          <Check className="h-4 w-4 mr-2" />
          Use Enhanced Version
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptEnhancementSuggestion;
