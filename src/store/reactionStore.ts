import { create } from "zustand";

type ReactionState = {
  selectedReactions: Record<string, string>;
  setReaction: (postId: string, emoji: string) => void;
};

export const useReactionStore = create<ReactionState>((set) => ({
  selectedReactions: {},
  setReaction: (postId, emoji) =>
    set((state) => ({
      selectedReactions: {
        ...state.selectedReactions,
        [postId]: emoji,
      },
    })),
}));
