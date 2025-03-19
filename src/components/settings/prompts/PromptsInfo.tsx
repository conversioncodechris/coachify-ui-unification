
import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

const PromptsInfo: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>About Prompts</CardTitle>
        <CardDescription>
          Learn how prompts enhance the AI experience for users
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border border-blue-100 bg-blue-50">
            <div className="flex gap-3">
              <div className="text-2xl">💬</div>
              <div>
                <h3 className="font-medium mb-1">Content AI Prompts</h3>
                <p className="text-sm text-muted-foreground">Create topic cards for generating content in various formats</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-green-100 bg-green-50">
            <div className="flex gap-3">
              <div className="text-2xl">📋</div>
              <div>
                <h3 className="font-medium mb-1">Compliance AI Prompts</h3>
                <p className="text-sm text-muted-foreground">Add compliance-related topics for users to quickly get answers</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-purple-100 bg-purple-50">
            <div className="flex gap-3">
              <div className="text-2xl">🎭</div>
              <div>
                <h3 className="font-medium mb-1">Coach AI Prompts</h3>
                <p className="text-sm text-muted-foreground">Create coaching scenarios for training and practice</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border border-amber-100 bg-amber-50">
            <div className="flex gap-3">
              <div className="text-2xl">🧠</div>
              <div>
                <h3 className="font-medium mb-1">Best Practices</h3>
                <p className="text-sm text-muted-foreground">Keep prompts clear, specific, and relevant to the AI's purpose</p>
              </div>
            </div>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default PromptsInfo;
