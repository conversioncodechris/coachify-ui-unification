
import React from 'react';
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles, Check, X } from "lucide-react";
import { EnhancedPrompt } from './types';

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
  if (!enhancedPrompt) return null;

  return (
    <Card className="h-full border-blue-200 bg-blue-50">
      <CardContent className="pt-6">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium text-blue-800">Enhanced Prompt Suggestion</h3>
        </div>
        
        <p className="text-sm text-blue-900 mb-2">
          We've created an enhanced version of your prompt that may help improve results.
        </p>
        
        <div className="bg-white border border-blue-100 rounded-md p-3 text-sm max-h-[250px] overflow-y-auto">
          {enhancedPrompt.enhanced}
        </div>
        
        <div className="mt-3 text-xs text-blue-700">
          <p>Category: {enhancedPrompt.category}</p>
        </div>
      </CardContent>
      
      <CardFooter className="border-t border-blue-100 bg-blue-50/50 gap-2 justify-end">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onReject}
          className="text-gray-600"
        >
          <X className="h-4 w-4 mr-1" />
          Ignore
        </Button>
        <Button 
          size="sm" 
          onClick={() => onAccept(enhancedPrompt.enhanced)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Check className="h-4 w-4 mr-1" />
          Use Enhanced
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PromptEnhancementSuggestion;
