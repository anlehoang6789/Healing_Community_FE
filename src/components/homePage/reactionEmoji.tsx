import React from "react";

type EmojiSelectorProps = {
  onSelect: (reaction: string, emoji: string, e: React.MouseEvent) => void;
};

export default function ReactionEmoji({ onSelect }: EmojiSelectorProps) {
  const reactions = [
    { emoji: "👍", id: "1" }, // Thích
    { emoji: "😂", id: "2" }, // Haha
    { emoji: "😢", id: "3" }, // Buồn
    { emoji: "😡", id: "4" }, // Phẫn nộ
    { emoji: "❤️", id: "5" }, // Yêu
    { emoji: "😮", id: "6" }, // Wow
  ];
  const handleEmojiClick = (
    reactionId: string,
    emoji: string,
    e: React.MouseEvent
  ) => {
    e.stopPropagation(); // Ngừng sự kiện click để tránh chuyển trang
    onSelect(reactionId, emoji, e); // Truyền sự kiện e vào onSelect
  };
  return (
    <div className="absolute bottom-full left-0 flex gap-2 p-2 bg-card border shadow-md rounded-md z-10">
      {reactions.map((reaction) => (
        <div
          key={reaction.id}
          onClick={(e) => handleEmojiClick(reaction.id, reaction.emoji, e)}
          className="cursor-pointer text-2xl hover:scale-150 transition-transform"
          title={reaction.emoji}
        >
          {reaction.emoji}
        </div>
      ))}
    </div>
  );
}
