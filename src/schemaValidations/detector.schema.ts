import { z } from "zod";

export const GetDetectorRes = z.object({
  is_safe: z.boolean(),
  message: z.string(),
});

export type GetDetectorResType = z.TypeOf<typeof GetDetectorRes>;
