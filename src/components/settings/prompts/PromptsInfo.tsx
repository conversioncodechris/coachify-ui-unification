
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import ConversationalPromptButton from './ConversationalPromptButton';

const PromptsInfo: React.FC = () => {
  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <h3 className="text-lg font-medium">Special Prompts</h3>
        
        <ConversationalPromptButton />
        
        <div className="p-4 border rounded bg-muted/50">
          <h4 className="font-medium mb-2">About Prompts</h4>
          <p className="text-sm text-muted-foreground">
            Prompts help you interact with AI assistants more effectively. 
            They can be pinned for quick access and can be conversational to enable 
            natural language interactions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptsInfo;
