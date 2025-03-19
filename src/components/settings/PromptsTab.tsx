
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Bot, Pin, PinOff, Eye, EyeOff } from 'lucide-react';
import { ContentAsset } from '@/types/contentAssets';
import AddPromptDialog from './AddPromptDialog';
import EditPromptDialog from './EditPromptDialog';
import { useToast } from '@/hooks/use-toast';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
  ContextMenuSeparator,
} from "@/components/ui/context-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

const PromptsTab: React.FC = () => {
  const [prompts, setPrompts] = useState<ContentAsset[]>([]);
  const [addPromptOpen, setAddPromptOpen] = useState(false);
  const [editPromptOpen, setEditPromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<ContentAsset | null>(null);
  const { toast } = useToast();
  
  // Load prompts from localStorage on component mount
  useEffect(() => {
    const loadPrompts = () => {
      const allPrompts: ContentAsset[] = [];
      
      // Load prompts from all three AI types
      ["content", "compliance", "coach"].forEach(aiType => {
        const storageKey = `${aiType}Assets`;
        const storedAssets = localStorage.getItem(storageKey);
        
        if (storedAssets) {
          try {
            const assets = JSON.parse(storedAssets);
            const typePrompts = assets.filter((asset: ContentAsset) => asset.type === 'prompt');
            allPrompts.push(...typePrompts);
          } catch (error) {
            console.error(`Error parsing ${storageKey}:`, error);
          }
        }
      });
      
      setPrompts(allPrompts);
    };
    
    loadPrompts();
    
    // Listen for asset updates
    const handleAssetsUpdated = () => {
      loadPrompts();
    };
    
    window.addEventListener('contentAssetsUpdated', handleAssetsUpdated);
    
    return () => {
      window.removeEventListener('contentAssetsUpdated', handleAssetsUpdated);
    };
  }, []);

  const handleAddPrompt = (newPrompt: ContentAsset) => {
    // Add to local state
    setPrompts(prev => [...prev, newPrompt]);
    
    // Add to storage
    const aiType = newPrompt.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    const storedAssets = localStorage.getItem(storageKey);
    let assets = [];
    
    if (storedAssets) {
      try {
        assets = JSON.parse(storedAssets);
      } catch (error) {
        console.error(`Error parsing ${storageKey}:`, error);
      }
    }
    
    assets.push(newPrompt);
    localStorage.setItem(storageKey, JSON.stringify(assets));
    
    // Trigger update event
    const customEvent = new Event('contentAssetsUpdated');
    window.dispatchEvent(customEvent);
    
    toast({
      title: "Prompt Created",
      description: `This prompt will appear as a topic card in the ${aiType} AI.`,
    });
    
    setAddPromptOpen(false);
  };

  const handleEditPrompt = (updatedPrompt: ContentAsset) => {
    // Update in local state
    setPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
    
    // Update in storage
    const aiType = updatedPrompt.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        const updatedAssets = assets.map((asset: ContentAsset) => 
          asset.id === updatedPrompt.id ? updatedPrompt : asset
        );
        
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        // Trigger update event
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Updated",
          description: "The prompt was successfully updated.",
        });
      } catch (error) {
        console.error(`Error updating prompt in ${storageKey}:`, error);
      }
    }
  };

  const handleDeletePrompt = (id: string) => {
    // Find the prompt to determine its AI type
    const promptToDelete = prompts.find(p => p.id === id);
    if (!promptToDelete) return;
    
    const aiType = promptToDelete.aiType || "content";
    const storageKey = `${aiType}Assets`;
    
    // Remove from local state
    setPrompts(prev => prev.filter(p => p.id !== id));
    
    // Remove from storage
    const storedAssets = localStorage.getItem(storageKey);
    if (storedAssets) {
      try {
        const assets = JSON.parse(storedAssets);
        const updatedAssets = assets.filter((asset: ContentAsset) => asset.id !== id);
        
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        // Trigger update event
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        
        toast({
          title: "Prompt Deleted",
          description: "The prompt was successfully removed.",
        });
      } catch (error) {
        console.error(`Error deleting prompt from ${storageKey}:`, error);
      }
    }
  };

  const openEditPrompt = (prompt: ContentAsset) => {
    setSelectedPrompt(prompt);
    setEditPromptOpen(true);
  };

  const togglePinPrompt = (prompt: ContentAsset) => {
    const updatedPrompt = { 
      ...prompt, 
      pinned: !prompt.pinned 
    };
    handleEditPrompt(updatedPrompt);
    
    toast({
      title: updatedPrompt.pinned ? "Prompt Pinned" : "Prompt Unpinned",
      description: updatedPrompt.pinned 
        ? "This prompt will appear at the top of the list." 
        : "This prompt has been unpinned.",
    });
  };

  const toggleHidePrompt = (prompt: ContentAsset) => {
    const updatedPrompt = { 
      ...prompt, 
      hidden: !prompt.hidden 
    };
    handleEditPrompt(updatedPrompt);
    
    toast({
      title: updatedPrompt.hidden ? "Prompt Hidden" : "Prompt Visible",
      description: updatedPrompt.hidden 
        ? "This prompt will not be shown to users." 
        : "This prompt is now visible to users.",
    });
  };

  // Sort prompts - pinned first, then by date added (newest first)
  const sortedPrompts = [...prompts]
    .filter(p => !p.hidden) // Filter out hidden prompts
    .sort((a, b) => {
      // First sort by pinned status
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      
      // Then sort by date (newest first)
      const dateA = new Date(a.dateAdded).getTime();
      const dateB = new Date(b.dateAdded).getTime();
      return dateB - dateA;
    });
    
  // Get hidden prompts
  const hiddenPrompts = prompts.filter(p => p.hidden);

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Prompt Management</CardTitle>
          <CardDescription>
            Create and manage prompts for Content AI, Compliance AI, and Coach AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Button onClick={() => setAddPromptOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Prompt
            </Button>
            
            {hiddenPrompts.length > 0 && (
              <HoverCard>
                <HoverCardTrigger asChild>
                  <Button variant="outline">
                    <EyeOff className="mr-2 h-4 w-4" />
                    {hiddenPrompts.length} Hidden
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <h4 className="mb-2 font-medium">Hidden Prompts</h4>
                  <div className="space-y-2">
                    {hiddenPrompts.map(prompt => (
                      <div key={prompt.id} className="flex items-center justify-between">
                        <span className="text-sm truncate">{prompt.title}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => toggleHidePrompt(prompt)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </HoverCardContent>
              </HoverCard>
            )}
          </div>
          
          {sortedPrompts.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <MessageSquare className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-lg font-medium">No prompts created yet</p>
              <p className="mt-1 text-sm text-gray-500">Add prompts that will appear as topic cards in the AI interfaces</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sortedPrompts.map((prompt) => (
                <ContextMenu key={prompt.id}>
                  <ContextMenuTrigger>
                    <Card 
                      className={`cursor-pointer hover:shadow-md transition-shadow group relative ${
                        prompt.aiType === 'content' ? 'border-blue-100' : 
                        prompt.aiType === 'compliance' ? 'border-green-100' : 
                        'border-purple-100'
                      } ${prompt.pinned ? 'ring-2 ring-primary/20' : ''}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                          <div className="text-2xl">{prompt.icon}</div>
                          <div className="flex-1">
                            <div className="font-medium flex items-center">
                              {prompt.title}
                              {prompt.pinned && (
                                <Pin className="ml-2 h-3 w-3 text-primary" />
                              )}
                            </div>
                            <div className="text-sm text-muted-foreground">{prompt.subtitle}</div>
                            <div className="mt-2 flex items-center gap-1 text-xs">
                              <Bot className="h-3 w-3" />
                              <span className={`px-2 py-0.5 rounded-full ${
                                prompt.aiType === 'content' ? 'bg-blue-100 text-blue-800' : 
                                prompt.aiType === 'compliance' ? 'bg-green-100 text-green-800' : 
                                'bg-purple-100 text-purple-800'
                              }`}>
                                {prompt.aiType?.charAt(0).toUpperCase() + prompt.aiType?.slice(1)} AI
                              </span>
                            </div>
                          </div>
                        </div>
                        
                        {/* Action buttons that show on hover */}
                        <div className="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePinPrompt(prompt);
                            }}
                          >
                            {prompt.pinned ? (
                              <PinOff className="h-4 w-4" />
                            ) : (
                              <Pin className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-full bg-background/90 backdrop-blur-sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleHidePrompt(prompt);
                            }}
                          >
                            <EyeOff className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </ContextMenuTrigger>
                  <ContextMenuContent>
                    <ContextMenuItem onClick={() => openEditPrompt(prompt)}>
                      Edit Prompt
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => togglePinPrompt(prompt)}>
                      {prompt.pinned ? (
                        <>
                          <PinOff className="mr-2 h-4 w-4" />
                          Unpin Prompt
                        </>
                      ) : (
                        <>
                          <Pin className="mr-2 h-4 w-4" />
                          Pin Prompt
                        </>
                      )}
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => toggleHidePrompt(prompt)}>
                      <EyeOff className="mr-2 h-4 w-4" />
                      Hide Prompt
                    </ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem 
                      className="text-red-600 focus:text-red-600"
                      onClick={() => handleDeletePrompt(prompt.id)}
                    >
                      Delete Prompt
                    </ContextMenuItem>
                  </ContextMenuContent>
                </ContextMenu>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* How-to Guide Card */}
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
      
      <AddPromptDialog 
        isOpen={addPromptOpen} 
        onOpenChange={setAddPromptOpen} 
        aiType="content"
        onPromptAdded={handleAddPrompt}
      />
      
      {selectedPrompt && (
        <EditPromptDialog 
          isOpen={editPromptOpen} 
          onOpenChange={setEditPromptOpen} 
          prompt={selectedPrompt}
          onPromptUpdated={handleEditPrompt}
        />
      )}
    </div>
  );
};

export default PromptsTab;
