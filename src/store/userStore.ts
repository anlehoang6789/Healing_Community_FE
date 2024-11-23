import { create } from "zustand";

interface UserStore {
  userId: string | null; // ID của user đang được xem
  setUserId: (id: string) => void; // Hàm để cập nhật userId
}
export const useUserStore = create<UserStore>((set) => ({
  userId: null,
  setUserId: (id: string) => set(() => ({ userId: id })),
}));
