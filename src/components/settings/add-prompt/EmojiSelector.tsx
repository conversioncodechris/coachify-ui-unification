
import React from 'react';
import { Label } from "@/components/ui/label";

interface EmojiSelectorProps {
  selectedEmoji: string;
  emojiOptions: string[];
  onSelectEmoji: (emoji: string) => void;
}

const EmojiSelector: React.FC<EmojiSelectorProps> = ({
  selectedEmoji,
  emojiOptions,
  onSelectEmoji
}) => {
  return (
    <div className="grid gap-2">
      <Label htmlFor="icon">Icon</Label>
      <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
        {emojiOptions.map((emoji, i) => (
          <button
            key={i}
            type="button"
            className={`p-2 text-xl rounded hover:bg-gray-100 ${selectedEmoji === emoji ? 'bg-gray-200' : ''}`}
            onClick={() => onSelectEmoji(emoji)}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmojiSelector;
