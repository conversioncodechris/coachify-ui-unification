
import { useLoadPrompts } from './hooks/useLoadPrompts';
import { useAddPrompt } from './hooks/useAddPrompt';
import { useEditPrompt } from './hooks/useEditPrompt';
import { useDeletePrompt } from './hooks/useDeletePrompt';
import { usePromptDialog } from './hooks/usePromptDialog';

export const usePrompts = () => {
  // Load prompts
  const { prompts, setPrompts, visiblePrompts, hiddenPrompts } = useLoadPrompts();
  
  // Dialog state management
  const {
    addPromptOpen,
    setAddPromptOpen,
    editPromptOpen,
    setEditPromptOpen,
    selectedPrompt,
    setSelectedPrompt,
    deleteConfirmOpen,
    setDeleteConfirmOpen,
    promptIdToDelete,
    setPromptIdToDelete,
    openEditPrompt,
    openDeleteConfirm
  } = usePromptDialog();
  
  // CRUD operations
  const { handleAddPrompt } = useAddPrompt(prompts, setPrompts);
  const { handleEditPrompt, togglePinPrompt, toggleHidePrompt } = useEditPrompt(prompts, setPrompts);
  const { handleDeletePrompt, isDeleting } = useDeletePrompt(
    prompts, 
    setPrompts, 
    selectedPrompt, 
    setSelectedPrompt, 
    setEditPromptOpen
  );

  return {
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
  };
};
