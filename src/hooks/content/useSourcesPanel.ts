
import { useState } from 'react';

export const useSourcesPanel = () => {
  const [isSourcesPanelOpen, setIsSourcesPanelOpen] = useState(false);
  const [activeSourceIndex, setActiveSourceIndex] = useState<number | null>(0);

  const toggleSourcesPanel = () => {
    setIsSourcesPanelOpen(!isSourcesPanelOpen);
    if (!isSourcesPanelOpen) {
      setActiveSourceIndex(0);
    }
  };

  return {
    isSourcesPanelOpen,
    activeSourceIndex,
    setActiveSourceIndex,
    toggleSourcesPanel
  };
};
