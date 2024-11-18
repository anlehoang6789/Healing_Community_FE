import { z } from "zod";

export const CategorySchema = z.object({
  categoryId: z.string(),
  name: z.string(),
});

export type CategorySchemaType = z.TypeOf<typeof CategorySchema>;

export const CategoryListSchema = z.object({
  data: z.array(CategorySchema),
  message: z.string(),
});

export type CategoryListSchemaType = z.TypeOf<typeof CategoryListSchema>;

export const UploadImageCoverResponse = z.object({
  url: z.string().url(),
});

export type UploadImageCoverResponseType = z.TypeOf<
  typeof UploadImageCoverResponse
>;

export const CreatePostBody = z.object({
  categoryId: z.string(),
  title: z.string(),
  coverImgUrl: z.string().url(),
  description: z.string(),
  status: z.number(),
});

export type CreatePostBodyType = z.TypeOf<typeof CreatePostBody>;
