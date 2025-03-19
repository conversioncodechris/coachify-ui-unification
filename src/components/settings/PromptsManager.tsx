
import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, MessageSquare } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { ContentAsset } from "@/types/contentAssets";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import EditPromptDialog from './EditPromptDialog';

const PromptsManager: React.FC = () => {
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<ContentAsset | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    loadPrompts();
  }, []);

  const loadPrompts = () => {
    const storedAssets = localStorage.getItem('contentAssets');
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        const filteredPrompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
        setPrompts(filteredPrompts);
      } catch (error) {
        console.error('Error parsing content assets:', error);
      }
    }
  };

  const handleEditPrompt = (prompt: ContentAsset) => {
    setSelectedPrompt(prompt);
    setIsEditDialogOpen(true);
  };

  const handleDeletePrompt = (promptId: string) => {
    try {
      // Get existing assets
      const storedAssets = localStorage.getItem('contentAssets');
      if (storedAssets) {
        const assets = JSON.parse(storedAssets);
        // Filter out the prompt to delete
        const updatedAssets = assets.filter((asset: ContentAsset) => asset.id !== promptId);
        
        // Save back to localStorage
        localStorage.setItem('contentAssets', JSON.stringify(updatedAssets));
        
        // Update state
        setPrompts(prompts.filter(prompt => prompt.id !== promptId));
        
        // Notify content updates
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Deleted",
          description: "The prompt has been successfully deleted.",
        });
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Error",
        description: "Failed to delete the prompt.",
        variant: "destructive",
      });
    }
  };

  const handlePromptUpdated = (updatedPrompt: ContentAsset) => {
    try {
      // Get existing assets
      const storedAssets = localStorage.getItem('contentAssets');
      if (storedAssets) {
        const assets = JSON.parse(storedAssets);
        
        // Replace the updated prompt
        const updatedAssets = assets.map((asset: ContentAsset) => 
          asset.id === updatedPrompt.id ? updatedPrompt : asset
        );
        
        // Save back to localStorage
        localStorage.setItem('contentAssets', JSON.stringify(updatedAssets));
        
        // Update state
        setPrompts(prevPrompts => prevPrompts.map(prompt => 
          prompt.id === updatedPrompt.id ? updatedPrompt : prompt
        ));
        
        // Notify content updates
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Updated",
          description: "The prompt has been successfully updated.",
        });
      }
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Error",
        description: "Failed to update the prompt.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Prompts Manager</CardTitle>
        <CardDescription>
          View, edit, and delete prompts created for Content AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        {prompts.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No prompts have been created yet. Add prompts using the Content AI asset manager.
          </div>
        ) : (
          <Table>
            <TableCaption>A list of all prompts created for Content AI.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Icon</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prompts.map((prompt) => (
                <TableRow key={prompt.id}>
                  <TableCell className="font-medium text-xl">{prompt.icon}</TableCell>
                  <TableCell className="font-medium">{prompt.title}</TableCell>
                  <TableCell className="max-w-xs truncate">{prompt.subtitle}</TableCell>
                  <TableCell>
                    {formatDistanceToNow(new Date(prompt.dateAdded), { addSuffix: true })}
                  </TableCell>
                  <TableCell>
                    {prompt.isNew ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        New
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="bg-gray-50">
                        Active
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0"
                        onClick={() => handleEditPrompt(prompt)}
                      >
                        <Pencil className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="h-8 w-8 p-0 text-red-500 hover:text-red-600 hover:bg-red-50"
                        onClick={() => handleDeletePrompt(prompt.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>

      {selectedPrompt && (
        <EditPromptDialog
          isOpen={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          prompt={selectedPrompt}
          onPromptUpdated={handlePromptUpdated}
        />
      )}
    </Card>
  );
};

export default PromptsManager;
