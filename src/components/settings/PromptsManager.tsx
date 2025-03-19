
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ContentAsset } from '@/types/contentAssets';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bot, MessageSquare, Users, Plus, FileText, Database } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import EditPromptDialog from './EditPromptDialog';
import { useAssetManagement } from '@/hooks/useAssetManagement';
import AddPromptDialog from './AddPromptDialog';
import { Badge } from "@/components/ui/badge";

const PromptsManager = () => {
  const [contentPrompts, setContentPrompts] = useState<ContentAsset[]>([]);
  const [compliancePrompts, setCompliancePrompts] = useState<ContentAsset[]>([]);
  const [coachPrompts, setCoachPrompts] = useState<ContentAsset[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<ContentAsset | null>(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"content" | "compliance" | "coach">("content");
  const { toast } = useToast();
  const { loadAssetCounts, assetCounts, handleOpenAssetDialog } = useAssetManagement();

  // Load prompts from localStorage
  const loadPrompts = useCallback(() => {
    try {
      // Load Content prompts
      const storedContentAssets = localStorage.getItem('contentAssets');
      if (storedContentAssets) {
        const allAssets = JSON.parse(storedContentAssets);
        const promptAssets = allAssets.filter((asset: ContentAsset) => asset.type === 'prompt');
        setContentPrompts(promptAssets);
      }

      // Load Compliance prompts
      const storedComplianceAssets = localStorage.getItem('complianceAssets');
      if (storedComplianceAssets) {
        const allAssets = JSON.parse(storedComplianceAssets);
        const promptAssets = allAssets.filter((asset: ContentAsset) => asset.type === 'prompt');
        setCompliancePrompts(promptAssets);
      }

      // Load Coach prompts
      const storedCoachAssets = localStorage.getItem('coachAssets');
      if (storedCoachAssets) {
        const allAssets = JSON.parse(storedCoachAssets);
        const promptAssets = allAssets.filter((asset: ContentAsset) => asset.type === 'prompt');
        setCoachPrompts(promptAssets);
      }
    } catch (error) {
      console.error('Error loading prompts:', error);
    }
  }, []);

  useEffect(() => {
    loadPrompts();

    // Listen for updates to prompts
    const handleCustomEvent = () => {
      console.log("contentAssetsUpdated event detected in PromptsManager, reloading prompts");
      loadPrompts();
    };

    window.addEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    
    return () => {
      window.removeEventListener('contentAssetsUpdated', handleCustomEvent as EventListener);
    };
  }, [loadPrompts]);

  const handleEditPrompt = (prompt: ContentAsset) => {
    setSelectedPrompt(prompt);
    setEditDialogOpen(true);
  };

  const handleDeletePrompt = (promptId: string) => {
    const currentTab = activeTab;
    const storageKey = `${currentTab}Assets`;
    
    try {
      const storedAssets = localStorage.getItem(storageKey);
      if (storedAssets) {
        const allAssets = JSON.parse(storedAssets);
        const updatedAssets = allAssets.filter((asset: ContentAsset) => asset.id !== promptId);
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        // Update the state based on the current tab
        if (currentTab === 'content') {
          setContentPrompts(prev => prev.filter(p => p.id !== promptId));
        } else if (currentTab === 'compliance') {
          setCompliancePrompts(prev => prev.filter(p => p.id !== promptId));
        } else if (currentTab === 'coach') {
          setCoachPrompts(prev => prev.filter(p => p.id !== promptId));
        }
        
        // Trigger asset update event
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        loadAssetCounts();
        
        toast({
          title: "Prompt Deleted",
          description: "The prompt has been deleted successfully.",
        });
      }
    } catch (error) {
      console.error('Error deleting prompt:', error);
      toast({
        title: "Error",
        description: "There was an error deleting the prompt.",
        variant: "destructive",
      });
    }
  };

  const handlePromptUpdated = (updatedPrompt: ContentAsset) => {
    const currentTab = activeTab;
    const storageKey = `${currentTab}Assets`;
    
    try {
      const storedAssets = localStorage.getItem(storageKey);
      if (storedAssets) {
        const allAssets = JSON.parse(storedAssets);
        const updatedAssets = allAssets.map((asset: ContentAsset) => 
          asset.id === updatedPrompt.id ? updatedPrompt : asset
        );
        localStorage.setItem(storageKey, JSON.stringify(updatedAssets));
        
        // Update the state based on the current tab
        if (currentTab === 'content') {
          setContentPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
        } else if (currentTab === 'compliance') {
          setCompliancePrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
        } else if (currentTab === 'coach') {
          setCoachPrompts(prev => prev.map(p => p.id === updatedPrompt.id ? updatedPrompt : p));
        }
        
        toast({
          title: "Prompt Updated",
          description: "The prompt has been updated successfully.",
        });
        
        // Trigger asset update event
        const customEvent = new Event('contentAssetsUpdated');
        window.dispatchEvent(customEvent);
        loadAssetCounts();
      }
    } catch (error) {
      console.error('Error updating prompt:', error);
      toast({
        title: "Error",
        description: "There was an error updating the prompt.",
        variant: "destructive",
      });
    }
  };

  const handleAddPrompt = (newPrompt: ContentAsset) => {
    const currentTab = activeTab;
    const storageKey = `${currentTab}Assets`;
    
    try {
      // Get existing assets
      const storedAssets = localStorage.getItem(storageKey);
      let allAssets = [];
      
      if (storedAssets) {
        allAssets = JSON.parse(storedAssets);
      }
      
      // Add new prompt
      allAssets.push(newPrompt);
      localStorage.setItem(storageKey, JSON.stringify(allAssets));
      
      // Update the state based on the current tab
      if (currentTab === 'content') {
        setContentPrompts(prev => [...prev, newPrompt]);
      } else if (currentTab === 'compliance') {
        setCompliancePrompts(prev => [...prev, newPrompt]);
      } else if (currentTab === 'coach') {
        setCoachPrompts(prev => [...prev, newPrompt]);
      }
      
      // Trigger asset update event
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
      loadAssetCounts();
      
      toast({
        title: "Prompt Added",
        description: "The prompt has been added successfully.",
      });
      
      setAddDialogOpen(false);
    } catch (error) {
      console.error('Error adding prompt:', error);
      toast({
        title: "Error",
        description: "There was an error adding the prompt.",
        variant: "destructive",
      });
    }
  };

  const getPromptsByTab = () => {
    switch(activeTab) {
      case "content":
        return contentPrompts;
      case "compliance":
        return compliancePrompts;
      case "coach":
        return coachPrompts;
      default:
        return [];
    }
  };

  const currentPrompts = getPromptsByTab();
  
  console.log(`Current prompts for ${activeTab} tab:`, currentPrompts);

  return (
    <div className="space-y-8">
      {/* Content Management Section */}
      <Card>
        <CardHeader>
          <CardTitle>Content Management</CardTitle>
          <CardDescription>
            Create and manage content for Compliance AI, Coach AI, and Content AI
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="justify-start relative"
              onClick={() => handleOpenAssetDialog("compliance")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Compliance AI Assets
              {assetCounts.compliance > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                  <Database className="h-3 w-3 mr-0.5" />
                  {assetCounts.compliance}
                </Badge>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="justify-start relative"
              onClick={() => handleOpenAssetDialog("coach")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Coach AI Assets
              {assetCounts.coach > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                  <Database className="h-3 w-3 mr-0.5" />
                  {assetCounts.coach}
                </Badge>
              )}
            </Button>
            <Button 
              variant="outline" 
              className="justify-start relative"
              onClick={() => handleOpenAssetDialog("content")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Content AI Assets
              {assetCounts.content > 0 && (
                <Badge variant="secondary" className="absolute -top-2 -right-2 px-1 py-0 min-w-5 h-5 flex items-center justify-center">
                  <Database className="h-3 w-3 mr-0.5" />
                  {assetCounts.content}
                </Badge>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Prompts Management Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Manage Prompts</CardTitle>
            <CardDescription>
              View, edit, and delete prompts for your AI assistants
            </CardDescription>
          </div>
          <Button 
            onClick={() => setAddDialogOpen(true)} 
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Prompt
          </Button>
        </CardHeader>
        <CardContent>
          <Tabs 
            defaultValue="content" 
            onValueChange={(value) => setActiveTab(value as "content" | "compliance" | "coach")}
          >
            <TabsList className="mb-4">
              <TabsTrigger value="content" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>Content AI</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-2">
                <Bot className="h-4 w-4" />
                <span>Compliance AI</span>
              </TabsTrigger>
              <TabsTrigger value="coach" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Coach AI</span>
              </TabsTrigger>
            </TabsList>

            {["content", "compliance", "coach"].map((tab) => (
              <TabsContent key={tab} value={tab}>
                {currentPrompts.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No prompts found. Click the "Add Prompt" button to create a new prompt.
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentPrompts.map((prompt) => (
                        <Card key={prompt.id} className="overflow-hidden">
                          <CardContent className="p-0">
                            <div className="flex items-start p-4">
                              <div className="text-3xl mr-3">{prompt.icon}</div>
                              <div className="flex-1 min-w-0">
                                <div className="font-medium truncate">{prompt.title}</div>
                                <div className="text-sm text-muted-foreground truncate">{prompt.subtitle}</div>
                              </div>
                              <div className="flex space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  onClick={() => handleEditPrompt(prompt)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => handleDeletePrompt(prompt.id)}
                                >
                                  Delete
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>

          {selectedPrompt && (
            <EditPromptDialog
              isOpen={editDialogOpen}
              onOpenChange={setEditDialogOpen}
              prompt={selectedPrompt}
              onPromptUpdated={handlePromptUpdated}
            />
          )}

          <AddPromptDialog
            isOpen={addDialogOpen}
            onOpenChange={setAddDialogOpen}
            aiType={activeTab}
            onPromptAdded={handleAddPrompt}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PromptsManager;
