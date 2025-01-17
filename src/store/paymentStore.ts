import { create } from "zustand";

interface StatusTimestampState {
  timestamps: Record<string, string>; // Lưu trữ { rowId: timestamp }
  setTimestamp: (id: string, timestamp: string) => void;
  getTimestamp: (id: string) => string | undefined;
}

//Store này lưu trữ timestamp của các row trong payment history cua moderator
export const useStatusTimestampStore = create<StatusTimestampState>(
  (set, get) => ({
    timestamps: {},
    setTimestamp: (id, timestamp) =>
      set((state) => ({
        timestamps: { ...state.timestamps, [id]: timestamp },
      })),
    getTimestamp: (id) => {
      return get().timestamps[id];
    },
  })
);
