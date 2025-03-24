
import { useState, useEffect } from 'react';
import { PromptPlatform } from './types';
import { PROMPT_PLATFORMS } from './constants';

export const usePlatformSelection = () => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<PromptPlatform[]>([]);
  const [selectAllPlatforms, setSelectAllPlatforms] = useState(false);

  // Update selectAllPlatforms state when individual platforms change
  useEffect(() => {
    setSelectAllPlatforms(selectedPlatforms.length === PROMPT_PLATFORMS.length);
  }, [selectedPlatforms]);

  const togglePlatform = (platform: PromptPlatform) => {
    setSelectedPlatforms(prev => {
      if (prev.includes(platform)) {
        return prev.filter(p => p !== platform);
      } else {
        return [...prev, platform];
      }
    });
  };

  const handleSelectAllPlatforms = (checked: boolean) => {
    if (checked) {
      setSelectedPlatforms([...PROMPT_PLATFORMS]);
    } else {
      setSelectedPlatforms([]);
    }
    setSelectAllPlatforms(checked);
  };

  return {
    selectedPlatforms,
    selectAllPlatforms,
    togglePlatform,
    handleSelectAllPlatforms,
    setSelectedPlatforms,
    setSelectAllPlatforms
  };
};
