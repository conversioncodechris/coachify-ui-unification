
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddPromptDialog } from '@/components/settings/add-prompt';
import EditPromptDialog from '@/components/settings/EditPromptDialog';
import { usePrompts } from './usePrompts';
import PromptsList from './PromptsList';
import PromptsInfo from './PromptsInfo';

const PromptsTab: React.FC = () => {
  const {
    visiblePrompts,
    hiddenPrompts,
    addPromptOpen,
    setAddPromptOpen,
    editPromptOpen,
    setEditPromptOpen,
    selectedPrompt,
    handleAddPrompt,
    handleEditPrompt,
    handleDeletePrompt,
    openEditPrompt,
    togglePinPrompt,
    toggleHidePrompt
  } = usePrompts();

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
          </div>
          
          <PromptsList
            visiblePrompts={visiblePrompts}
            hiddenPrompts={hiddenPrompts}
            onEditPrompt={openEditPrompt}
            onTogglePin={togglePinPrompt}
            onToggleHide={toggleHidePrompt}
            onDeletePrompt={handleDeletePrompt}
          />
        </CardContent>
      </Card>
      
      <PromptsInfo />
      
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
