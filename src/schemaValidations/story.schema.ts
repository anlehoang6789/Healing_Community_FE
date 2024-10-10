import { Category } from "@/constants/category.type";
import { z } from "zod";

export const PostStoryBody = z
  .object({
    title: z.string().min(6).max(100),
    description: z.string().min(6),
    imageUrl: z.string().url(),
    videoUrl: z.string().url(),
    status: z.enum(["public", "private"]),
    category: z.enum([
      Category.Travel,
      Category.Food,
      Category.Film,
      Category.Health,
      Category.Other,
    ]),
  })
  .strict();

export type PostStoryBodyType = z.TypeOf<typeof PostStoryBody>;
