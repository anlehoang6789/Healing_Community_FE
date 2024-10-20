import { z } from "zod";

export const CreatePlaylistBody = z
  .object({
    playlistName: z.string().min(1).max(20),
  })
  .strict();

export type CreatePlaylistBodyType = z.TypeOf<typeof CreatePlaylistBody>;
