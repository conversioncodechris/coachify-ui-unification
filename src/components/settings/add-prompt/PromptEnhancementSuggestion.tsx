
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { EnhancedPrompt } from './types';

interface PromptEnhancementSuggestionProps {
  enhancedPrompt: EnhancedPrompt | null;
  onAccept: (enhancedPrompt: string) => void;
  onReject: () => void;
}

const PromptEnhancementSuggestion: React.FC<PromptEnhancementSuggestionProps> = ({
  enhancedPrompt,
  onAccept,
  onReject
}) => {
  if (!enhancedPrompt) return null;

  return (
    <div className="space-y-4">
      <Card className="border-2 border-yellow-200 bg-yellow-50 dark:bg-yellow-950 dark:border-yellow-800">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-yellow-600" />
            Enhanced Prompt Suggestion
          </CardTitle>
          <CardDescription>
            Our AI suggests this enhanced version for better results
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="max-h-[300px] overflow-y-auto bg-white dark:bg-gray-900 rounded-md p-4 text-sm">
            {enhancedPrompt.enhanced.split('\n').map((line, i) => (
              <p key={i} className={i === 0 ? "font-semibold" : ""}>
                {line}
              </p>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onReject}>
            Keep Original
          </Button>
          <Button 
            onClick={() => onAccept(enhancedPrompt.enhanced)}
            className="bg-yellow-600 hover:bg-yellow-700 text-white"
          >
            Use Enhanced Prompt
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PromptEnhancementSuggestion;
