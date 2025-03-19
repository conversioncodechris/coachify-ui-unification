
import { useState } from 'react';
import { ContentAsset } from '@/types/contentAssets';

export const usePromptDialog = () => {
  const [addPromptOpen, setAddPromptOpen] = useState(false);
  const [editPromptOpen, setEditPromptOpen] = useState(false);
  const [selectedPrompt, setSelectedPrompt] = useState<ContentAsset | null>(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [promptIdToDelete, setPromptIdToDelete] = useState<string | null>(null);

  const openEditPrompt = (prompt: ContentAsset) => {
    setSelectedPrompt(prompt);
    setEditPromptOpen(true);
  };

  const openDeleteConfirm = (id: string) => {
    console.log('Opening delete confirmation for prompt ID:', id);
    setPromptIdToDelete(id);
    setDeleteConfirmOpen(true);
  };

  return {
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
  };
};
