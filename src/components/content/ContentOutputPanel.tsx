
import React, { useState } from 'react';
import { ContentOutput } from './ContentTypes';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Copy, ExternalLink, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ContentOutputPanelProps {
  content: ContentOutput;
  onClose: () => void;
  onReset: () => void;
}

const ContentOutputPanel: React.FC<ContentOutputPanelProps> = ({ 
  content, 
  onClose,
  onReset
}) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<string>('facebook');
  const [editing, setEditing] = useState<boolean>(false);
  const [editedContent, setEditedContent] = useState<ContentOutput>(content);

  // Map platform keys to display names
  const platformNames: Record<string, string> = {
    facebook: 'Facebook',
    instagram: 'Instagram',
    twitter: 'Twitter/X',
    linkedin: 'LinkedIn',
    email: 'Email',
    videoScript: 'Video Script',
    smsMessage: 'SMS Message',
    pressRelease: 'Press Release',
    blogPost: 'Blog Post'
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The content has been copied to your clipboard.",
    });
  };

  const handleOpenInGoogle = () => {
    const textContent = editedContent[activeTab as keyof ContentOutput] || '';
    const encodedContent = encodeURIComponent(textContent);
    const url = `https://docs.new/?text=${encodedContent}`;
    window.open(url, '_blank');
  };

  const handleEditToggle = () => {
    if (editing) {
      // Save changes
      toast({
        title: "Changes saved",
        description: "Your content edits have been saved.",
      });
    }
    setEditing(!editing);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const updatedContent = {
      ...editedContent,
      [activeTab]: e.target.value
    };
    setEditedContent(updatedContent);
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Generated Content</span>
            <Button variant="outline" size="sm" onClick={onClose}>Close</Button>
          </CardTitle>
          <CardDescription>
            Review and edit your content for different platforms
          </CardDescription>
        </CardHeader>
        
        <Tabs defaultValue="facebook" className="flex-1 overflow-hidden flex flex-col" onValueChange={setActiveTab}>
          <div className="px-6 overflow-auto">
            <TabsList className="inline-flex flex-wrap h-auto p-1 mb-2">
              {Object.entries(content).map(([platform, text]) => {
                if (!text) return null;
                return (
                  <TabsTrigger key={platform} value={platform} className="capitalize whitespace-nowrap my-1">
                    {platformNames[platform] || platform}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>
          
          <div className="flex-1 overflow-auto p-6">
            {Object.entries(content).map(([platform, text]) => {
              if (!text) return null;
              return (
                <TabsContent key={platform} value={platform} className="h-full flex flex-col">
                  {editing ? (
                    <textarea
                      className="w-full h-full min-h-[300px] p-4 rounded-md border resize-none"
                      value={editedContent[platform as keyof ContentOutput]}
                      onChange={handleContentChange}
                    />
                  ) : (
                    <div className="bg-muted p-4 rounded-md whitespace-pre-wrap h-full overflow-auto">
                      {editedContent[platform as keyof ContentOutput]}
                    </div>
                  )}
                </TabsContent>
              );
            })}
          </div>
        </Tabs>
        
        <CardFooter className="flex justify-between border-t p-4">
          <div>
            <Button variant="secondary" onClick={onReset} className="mr-2">
              <RefreshCw className="mr-2 h-4 w-4" />
              New Conversation
            </Button>
            <Button variant="outline" onClick={handleEditToggle}>
              {editing ? "Save Edits" : "Edit Content"}
            </Button>
          </div>
          
          <div>
            <Button 
              variant="outline" 
              onClick={() => handleCopy(editedContent[activeTab as keyof ContentOutput] || '')}
              className="mr-2"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy
            </Button>
            <Button onClick={handleOpenInGoogle}>
              <ExternalLink className="mr-2 h-4 w-4" />
              Open in Google Docs
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ContentOutputPanel;
