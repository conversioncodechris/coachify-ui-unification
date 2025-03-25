
import { v4 as uuidv4 } from 'uuid';
import { ContentAsset } from '@/types/contentAssets';

// Create a function to add a conversational prompt to localStorage
export const addConversationalPrompt = () => {
  const conversationalPrompt = {
    id: uuidv4(),
    type: 'prompt',
    title: 'Conversational Interview → Multi-Platform Output',
    subtitle: 'Turn a casual conversation into content for multiple platforms',
    icon: '🎙️',
    source: 'created',
    dateAdded: new Date(),
    content: "Hey! Let's turn your expertise into 🔥 content. Pretend I'm a friend asking this:\n'My sister wants to buy a house but needs to sell hers first—what should I tell her?'\nJust answer like you would in real life, and I'll turn it into magic for Facebook, Instagram, and an email follow-up. Ready?",
    aiType: 'content',
    conversational: true
  };
  
  // Save to localStorage
  const storageKey = 'contentAssets';
  let existingAssets = [];
  
  const storedAssets = localStorage.getItem(storageKey);
  if (storedAssets) {
    try {
      existingAssets = JSON.parse(storedAssets);
    } catch (error) {
      console.error(`Error parsing ${storageKey}:`, error);
      // Continue with empty array if parse fails
    }
  }
  
  // Check if a prompt with this title already exists
  const existingPromptIndex = existingAssets.findIndex(
    (asset: ContentAsset) => 
      asset.type === 'prompt' && 
      asset.title === conversationalPrompt.title
  );
  
  if (existingPromptIndex >= 0) {
    // Already exists, don't add it again
    return null;
  }
  
  existingAssets.push(conversationalPrompt);
  localStorage.setItem(storageKey, JSON.stringify(existingAssets));
  
  // Dispatch custom event to update UI
  const customEvent = new Event('contentAssetsUpdated');
  window.dispatchEvent(customEvent);
  
  return conversationalPrompt as ContentAsset;
};
