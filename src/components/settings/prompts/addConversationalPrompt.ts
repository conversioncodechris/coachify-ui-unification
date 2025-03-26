
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
    content: "I'll guide you through a structured conversation about a recent real estate transaction. We'll cover the property details, challenges you faced, client specifics, and key learnings. Your responses will automatically be transformed into ready-to-use content for Facebook, Instagram, LinkedIn, and email marketing. Just answer each question naturally, and I'll handle the content creation!",
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
