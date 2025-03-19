
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare, Bot } from 'lucide-react';
import { ContentAsset } from '@/types/contentAssets';
import AddPromptDialog from './AddPromptDialog';
import EditPromptDialog from './EditPromptDialog';
import { useToast } from '@/hooks/use-toast';

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
          <div className="flex justify-end mb-4">
            <Button onClick={() => setAddPromptOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add New Prompt
            </Button>
          </div>
          
          {prompts.length === 0 ? (
            <div className="text-center py-10 border rounded-lg bg-gray-50">
              <MessageSquare className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-lg font-medium">No prompts created yet</p>
              <p className="mt-1 text-sm text-gray-500">Add prompts that will appear as topic cards in the AI interfaces</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {prompts.map((prompt) => (
                <Card key={prompt.id} className={`cursor-pointer hover:shadow-md transition-shadow ${
                  prompt.aiType === 'content' ? 'border-blue-100' : 
                  prompt.aiType === 'compliance' ? 'border-green-100' : 
                  'border-purple-100'
                }`} onClick={() => openEditPrompt(prompt)}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{prompt.icon}</div>
                      <div className="flex-1">
                        <div className="font-medium">{prompt.title}</div>
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
                  </CardContent>
                </Card>
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
