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
  coverImgUrl: z.string().url().nullable().optional(),
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
  coverImgUrl: z.string().url().nullable().optional(),
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

export const GetPostByUserIdRes = z.object({
  data: z.array(PostByIdSchema),
  message: z.string(),
});

export type GetPostByUserIdResType = z.TypeOf<typeof GetPostByUserIdRes>;

export const CreateCommentBody = z.object({
  postId: z.string(),
  parentId: z.string().nullable(),
  content: z.string(),
  coverImgUrl: z.string().url().nullable().optional(),
});

export type CreateCommentBodyType = z.TypeOf<typeof CreateCommentBody>;

export const CreateCommentResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.string(),
  errors: z.array(z.any()),
  timestamp: z.string(),
});

export type CreateCommentResponseType = z.TypeOf<
  typeof CreateCommentResponseSchema
>;

export const AddUserReferenceBody = z.object({
  categoryId: z.string(),
});

export type AddUserReferenceBodyType = z.TypeOf<typeof AddUserReferenceBody>;

export const GetHomePageSchemaLazyLoad = z.object({
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

export type GetHomePageSchemaLazyLoadType = z.TypeOf<
  typeof GetHomePageSchemaLazyLoad
>;

export const GetHomePageListLazyLoad = z.object({
  data: z.array(GetHomePageSchemaLazyLoad),
  message: z.string(),
});

export type GetHomePageListLazyLoadType = z.TypeOf<
  typeof GetHomePageListLazyLoad
>;

//trang Home phần xem nhanh (quickPost)
export const QuickPostSchema = z.object({
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

export type QuickPostType = z.TypeOf<typeof QuickPostSchema>;

export const GetQuickPostList = z.object({
  data: z.array(QuickPostSchema),
  message: z.string(),
});

export type GetQuickPostListType = z.TypeOf<typeof GetQuickPostList>;

export const UpdatePersonalPostBody = z.object({
  categoryId: z.string(),
  title: z.string(),
  coverImgUrl: z.string().url(),
  description: z.string(),
  status: z.number(),
});

export type UpdatePersonalPostBodyType = z.TypeOf<
  typeof UpdatePersonalPostBody
>;

export const AddReactionBody = z.object({
  postId: z.string(),
  reactionTypeId: z.string(),
});

export type AddReactionBodyType = z.TypeOf<typeof AddReactionBody>;

export const GetReactionCountSchema = z.object({
  postId: z.string(),
  like: z.number(),
  love: z.number(),
  haha: z.number(),
  wow: z.number(),
  sad: z.number(),
  angry: z.number(),
  total: z.number(),
});

export type GetReactionCountSchema = z.TypeOf<typeof GetReactionCountSchema>;

export const GetReactionCountRes = z.object({
  data: GetReactionCountSchema,
  message: z.string(),
});

export type GetReactionCountResType = z.TypeOf<typeof GetReactionCountRes>;

export const GetCommentCountSchema = z.object({
  countTotalComment: z.number(),
});

export type GetCommentCountSchema = z.TypeOf<typeof GetCommentCountSchema>;

export const GetCommentCountRes = z.object({
  data: GetCommentCountSchema,
  message: z.string(),
});

export type GetCommentCountResType = z.TypeOf<typeof GetCommentCountRes>;
