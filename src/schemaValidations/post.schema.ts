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
  like: z.object({
    likeCount: z.number(),
    icon: z.string(),
  }),
  love: z.object({
    loveCount: z.number(),
    icon: z.string(),
  }),
  haha: z.object({
    hahaCount: z.number(),
    icon: z.string(),
  }),
  wow: z.object({
    wowCount: z.number(),
    icon: z.string(),
  }),
  sad: z.object({
    sadCount: z.number(),
    icon: z.string(),
  }),
  angry: z.object({
    angryCount: z.number(),
    icon: z.string(),
  }),
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

export const GetUserReactionByPostIdSchema = z.object({
  reactionId: z.string(),
  userId: z.string(),
  postId: z.string(),
  reactionTypeId: z.string(),
  reactionType: z.object({
    reactionTypeId: z.string(),
    name: z.string(),
    icon: z.string(),
  }),
});

export type GetUserReactionByPostIdSchemaType = z.TypeOf<
  typeof GetUserReactionByPostIdSchema
>;

export const GetUserReactionByPostIdRes = z.object({
  data: GetUserReactionByPostIdSchema,
  message: z.string(),
});

export type GetUserReactionByPostIdResType = z.TypeOf<
  typeof GetUserReactionByPostIdRes
>;

export const GetBookmarkListSchema = z.object({
  bookmarkId: z.string(),
  userId: z.string(),
  name: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetBookmarkListSchemaType = z.TypeOf<typeof GetBookmarkListSchema>;

export const GetBookmarkListResponse = z.object({
  data: z.array(GetBookmarkListSchema),
  message: z.string(),
});

export type GetBookmarkListResponseType = z.TypeOf<
  typeof GetBookmarkListResponse
>;

export const GetBookmarkListDetailsSchema = z.object({
  postId: z.string(),
  userId: z.string(),
  groupId: z.string().optional(),
  categoryId: z.string(),
  title: z.string(),
  coverImgUrl: z.string().url(),
  description: z.string(),
  status: z.number(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type GetBookmarkListDetailsSchemaType = z.TypeOf<
  typeof GetBookmarkListDetailsSchema
>;

export const GetBookmarkListDetailsResponse = z.object({
  total: z.number(),
  data: z.array(GetBookmarkListDetailsSchema),
  message: z.string(),
});

export type GetBookmarkListDetailsResponseType = z.TypeOf<
  typeof GetBookmarkListDetailsResponse
>;

export const DeleteBookmarkListDetailsBody = z.object({
  postId: z.string(),
  bookmarkId: z.string(),
});

export type DeleteBookmarkListDetailsBodyType = z.TypeOf<
  typeof DeleteBookmarkListDetailsBody
>;

export const CreateBookmarkListBody = z.object({
  name: z.string(),
});

export type CreateBookmarkListBodyType = z.TypeOf<
  typeof CreateBookmarkListBody
>;

export const AddBookmarkListDetailsBody = z.object({
  postId: z.string(),
  bookmarkId: z.string(),
});

export type AddBookmarkListDetailsBodyType = z.TypeOf<
  typeof AddBookmarkListDetailsBody
>;

export const GetAllReactionTypeSchema = z.object({
  reactionTypeId: z.string(),
  name: z.string(),
  icon: z.string(),
});

export type GetAllReactionTypeSchemaType = z.TypeOf<
  typeof GetAllReactionTypeSchema
>;

export const GetAllReactionTypeResponse = z.object({
  data: z.array(GetAllReactionTypeSchema),
  message: z.string(),
});

export type GetAllReactionTypeResponseType = z.TypeOf<
  typeof GetAllReactionTypeResponse
>;

export const SharePostRequestSchema = z.object({
  postId: z.string(),
  description: z.string().optional(),
  platform: z.string(),
});

export type SharePostRequestType = z.TypeOf<typeof SharePostRequestSchema>;

export const SharePostResponseSchema = z.object({
  message: z.string(),
});

export type SharePostResponseType = z.TypeOf<typeof SharePostResponseSchema>;

export const GetHighlightPostListRes = z.object({
  data: z.array(PostByIdSchema),
  message: z.string(),
});

export type GetHighlightPostListResType = z.TypeOf<
  typeof GetHighlightPostListRes
>;

export const GetDetailsCategorySchema = z.object({
  categoryId: z.string(),
  name: z.string(),
  createAt: z.string(),
  updateAt: z.string(),
});

export type GetDetailsCategorySchemaType = z.TypeOf<
  typeof GetDetailsCategorySchema
>;

export const GetDetailsCategoryResponse = z.object({
  data: GetDetailsCategorySchema,
  message: z.string(),
});

export type GetDetailsCategoryResponseType = z.TypeOf<
  typeof GetDetailsCategoryResponse
>;

export const CreateCategoryBody = z.object({
  name: z.string(),
});

export type CreateCategoryBodyType = z.TypeOf<typeof CreateCategoryBody>;

export const GetAuthorOtherPostBody = z.object({
  authorId: z.string(),
  top: z.number(),
});

export type GetAuthorOtherPostBodyType = z.TypeOf<
  typeof GetAuthorOtherPostBody
>;

export const GetAuthorOtherPostListRes = z.object({
  data: z.array(PostByIdSchema),
  message: z.string(),
});

export type GetAuthorOtherPostListResType = z.TypeOf<
  typeof GetAuthorOtherPostListRes
>;
