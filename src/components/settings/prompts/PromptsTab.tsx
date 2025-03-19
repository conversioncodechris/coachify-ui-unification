
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { AddPromptDialog } from '@/components/settings/add-prompt';
import { EditPromptDialog } from '@/components/settings/edit-prompt';
import { usePrompts } from './usePrompts';
import PromptsList from './PromptsList';
import PromptsInfo from './PromptsInfo';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Trash2 } from 'lucide-react';

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

  // State for delete confirmation dialog
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [promptIdToDelete, setPromptIdToDelete] = useState<string | null>(null);

  // Effect to listen for delete requests from the EditPromptDialog
  useEffect(() => {
    const handleDeleteRequest = (e: CustomEvent<{ promptId: string }>) => {
      openDeleteConfirm(e.detail.promptId);
    };

    // Add event listener for custom delete event
    window.addEventListener('promptDeleteRequested', handleDeleteRequest as EventListener);
    
    // Cleanup function
    return () => {
      window.removeEventListener('promptDeleteRequested', handleDeleteRequest as EventListener);
    };
  }, []);

  // Open delete confirmation dialog
  const openDeleteConfirm = (id: string) => {
    console.log('Opening delete confirmation for prompt ID:', id);
    setPromptIdToDelete(id);
    setDeleteConfirmOpen(true);
  };

  // Handle confirmed deletion
  const confirmDelete = () => {
    if (promptIdToDelete) {
      console.log('Confirming deletion of prompt ID:', promptIdToDelete);
      handleDeletePrompt(promptIdToDelete);
      setPromptIdToDelete(null);
    }
    setDeleteConfirmOpen(false);
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
            onDeletePrompt={openDeleteConfirm}
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteConfirmOpen} onOpenChange={setDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <Trash2 className="mr-2 h-5 w-5 text-destructive" />
              Confirm Deletion
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this prompt? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PromptsTab;
