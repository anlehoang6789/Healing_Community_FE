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

export const PostByIdSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  categoryId: z.string(),
  title: z.string(),
  coverImgUrl: z.string().url(),
  description: z.string(),
  status: z.number(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type PostByIdSchemaType = z.TypeOf<typeof PostByIdSchema>;

export const PostByIdSchemaWrapper = z.object({
  data: PostByIdSchema,
  message: z.string(),
});

export type PostByIdType = z.TypeOf<typeof PostByIdSchemaWrapper>;

export const ReplyCommentSchema = z.object({
  commentId: z.string(),
  postId: z.string(),
  parentId: z.string(),
  userId: z.string(),
  content: z.string(),
  coverImgUrl: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  replies: z.array(z.any()).nullable().optional(),
});

export type ReplyCommentType = z.TypeOf<typeof ReplyCommentSchema>;

export const CommentSchema = z.object({
  commentId: z.string(),
  postId: z.string(),
  parentId: z.string().nullable(), // parentId có thể là null
  userId: z.string(),
  content: z.string(),
  coverImgUrl: z.string().nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string().nullable(),
  replies: z.array(ReplyCommentSchema).nullable().optional(), // replies có thể là null hoặc undefined
});

export type CommentType = z.TypeOf<typeof CommentSchema>;

export const GetCommentsByPostIdResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(CommentSchema),
  errors: z.array(z.any()),
  timestamp: z.string(),
});

export type GetCommentsByPostIdResponseType = z.TypeOf<
  typeof GetCommentsByPostIdResponseSchema
>;
