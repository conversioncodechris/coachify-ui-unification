
import React, { useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Plus, MessageSquare } from 'lucide-react';
import { AddPromptDialog } from '@/components/settings/add-prompt';
import { EditPromptDialog } from '@/components/settings/edit-prompt';
import { usePrompts } from './usePrompts';
import PromptsList from './PromptsList';
import PromptsInfo from './PromptsInfo';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
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
  const navigate = useNavigate();
  const { toast } = useToast();
  const {
    visiblePrompts,
    hiddenPrompts,
    addPromptOpen,
    setAddPromptOpen,
    editPromptOpen,
    setEditPromptOpen,
    selectedPrompt,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    promptIdToDelete,
    setPromptIdToDelete,
    handleAddPrompt,
    handleEditPrompt,
    handleDeletePrompt,
    isDeleting,
    openEditPrompt,
    openDeleteConfirm,
    togglePinPrompt,
    toggleHidePrompt
  } = usePrompts();

  // Effect to listen for delete requests from the EditPromptDialog
  useEffect(() => {
    const handleDeleteRequest = (e: CustomEvent<{ promptId: string }>) => {
      console.log(`Delete request received for prompt ID: ${e.detail.promptId}`);
      // Ensure we have a valid ID before proceeding
      if (e.detail.promptId) {
        openDeleteConfirm(e.detail.promptId);
      } else {
        console.error('Received delete request with no promptId');
      }
    };

    // Add event listener for custom delete event
    window.addEventListener('promptDeleteRequested', handleDeleteRequest as EventListener);
    
    // Cleanup function
    return () => {
      window.removeEventListener('promptDeleteRequested', handleDeleteRequest as EventListener);
    };
  }, [openDeleteConfirm]);

  // Handle confirmed deletion
  const confirmDelete = () => {
    if (promptIdToDelete) {
      console.log('Confirming deletion of prompt ID:', promptIdToDelete);
      // Store ID in local variable to ensure it's available even if state changes
      const idToDelete = promptIdToDelete;
      
      // Close the dialog first
      setDeleteConfirmOpen(false);
      
      // Execute the deletion immediately
      handleDeletePrompt(idToDelete);
      
      // Clear the ID after deletion is complete
      setPromptIdToDelete(null);
    } else {
      console.error('No prompt ID to delete');
      setDeleteConfirmOpen(false);
    }
  };

  // Function to handle opening a conversational prompt
  const openInChat = (prompt: any) => {
    if (!prompt.content) {
      toast({
        title: "Error",
        description: "This prompt doesn't have content to use in a chat.",
        variant: "destructive"
      });
      return;
    }

    try {
      // Create a new chat topic with this prompt
      const newTopic = {
        id: `prompt-${prompt.id}`,
        icon: prompt.icon || "💬",
        title: prompt.title,
        description: prompt.subtitle || "Conversational prompt",
        content: prompt.content,
        isNew: true,
        purpose: "content",
        source: "prompt"
      };

      // Store the new topic in localStorage for content topics
      const topicsKey = "contentTopics";
      let existingTopics = [];
      const storedTopics = localStorage.getItem(topicsKey);
      if (storedTopics) {
        try {
          existingTopics = JSON.parse(storedTopics);
        } catch (error) {
          console.error(`Error parsing ${topicsKey}:`, error);
        }
      }
      
      // Add the new topic or update if it exists
      const topicIndex = existingTopics.findIndex((t: any) => t.id === newTopic.id);
      if (topicIndex >= 0) {
        existingTopics[topicIndex] = newTopic;
      } else {
        existingTopics.push(newTopic);
      }
      
      localStorage.setItem(topicsKey, JSON.stringify(existingTopics));
      
      // Trigger a content assets updated event to refresh the UI
      const customEvent = new Event('contentAssetsUpdated');
      window.dispatchEvent(customEvent);
      
      // Navigate to content page
      navigate('/content');
      
      toast({
        title: "Prompt Ready",
        description: `"${prompt.title}" is now available in your Content AI topics.`,
      });
    } catch (error) {
      console.error("Error creating chat from prompt:", error);
      toast({
        title: "Error",
        description: "Failed to create chat from this prompt.",
        variant: "destructive"
      });
    }
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
            onOpenInChat={openInChat}
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
      <AlertDialog 
        open={deleteConfirmOpen} 
        onOpenChange={(open) => {
          if (!open && !isDeleting) {
            setPromptIdToDelete(null);
          }
          setDeleteConfirmOpen(open);
        }}
      >
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
            <AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PromptsTab;
