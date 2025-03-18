
import React from "react";
import { Label } from "@/components/ui/label";
import { AssetType } from "@/types/contentAssets";

interface EmojiPickerProps {
  assetType: AssetType;
  selectedEmoji: string;
  onSelectEmoji: (emoji: string) => void;
  label?: string;
}

const emojiOptions: Record<AssetType, string[]> = {
  prompt: ["💬", "📝", "🗣️", "💭", "📢", "🔤", "📋"],
  pdf: ["📄", "📑", "📰", "📚", "📂", "🗂️", "📕"],
  guidelines: ["📘", "🎨", "🖌️", "📐", "🔍", "📏", "🎭"],
  roleplay: ["👥", "🎭", "🎬", "👨‍💼", "👩‍💼", "🤝", "🗣️"],
  video: ["🎥", "📹", "🎬", "📽️", "🎞️", "📀", "🖥️"],
  other: ["📎", "🔗", "📦", "🗃️", "📮", "🔖", "📌"],
};

const EmojiPicker: React.FC<EmojiPickerProps> = ({
  assetType,
  selectedEmoji,
  onSelectEmoji,
  label = "Icon"
}) => {
  return (
    <div className="space-y-2">
      <Label htmlFor="emoji-picker">{label}</Label>
      <div className="flex flex-wrap gap-2 max-h-[100px] overflow-y-auto p-2 border rounded-md">
        {emojiOptions[assetType].map((emoji, i) => (
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

export { emojiOptions };
export default EmojiPicker;
