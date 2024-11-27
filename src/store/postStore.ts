import { create } from "zustand";

interface PostStore {
  selectedPostId: string | null;
  setSelectedPostId: (id: string | null) => void;
  selectedPostTitle: string | null;
  setSelectedPostTitle: (title: string | null) => void;
}

// cái store này dùng để lưu trữ id của post đang được chọn
export const usePostStore = create<PostStore>((set) => ({
  selectedPostId: null,
  setSelectedPostId: (id) => set({ selectedPostId: id }),
  selectedPostTitle: null,
  setSelectedPostTitle: (title) => set({ selectedPostTitle: title }),
}));

interface QuickPost {
  postId: string | null;
  userId: string | null;
  setPostData: (postId: string, userId: string) => void;
}

export const useQuickPostStore = create<QuickPost>((set) => ({
  postId: null,
  userId: null,
  setPostData: (postId, userId) =>
    set({
      postId,
      userId,
    }),
}));
