import http from "@/lib/http";
import {
  AddBookmarkListDetailsBodyType,
  AddReactionBodyType,
  AddUserReferenceBodyType,
  CategoryListSchemaType,
  CreateBookmarkListBodyType,
  CreateCategoryBodyType,
  CreateCommentBodyType,
  CreateCommentResponseType,
  CreatePostBodyType,
  CreateSharedCommentBodyType,
  CreateSharedCommentResponseType,
  CreatePostInGroupBodyType,
  DeleteBookmarkListDetailsBodyType,
  GetAllReactionTypeResponseType,
  GetAuthorOtherPostBodyType,
  GetAuthorOtherPostListResType,
  GetBookmarkListDetailsResponseType,
  GetBookmarkListResponseType,
  GetCommentCountResType,
  GetCommentsByPostIdResponseType,
  GetCommentsByShareIdResponseType,
  GetDetailsCategoryResponseType,
  GetHighlightPostListResType,
  GetHomePageListLazyLoadType,
  GetOtherPostWithSameCategoryBodyType,
  GetPostByGroupIdListResType,
  GetPostByUserIdResType,
  GetQuickPostListType,
  GetReactionCountResType,
  GetUserReactionByPostIdResType,
  PostByIdType,
  SharedPostResponseType,
  SharePostRequestType,
  SharePostResponseType,
  UpdatePersonalPostBodyType,
  UpdateSharedPostBodyType,
  UploadImageCoverResponseType,
  GetSharedCommentCountResType,
  GetPersonalPostGroupListResType,
  AddReactionSharedBodyType,
  GetReactionSharedCountResType,
  GetUserReactionByShareIdResType,
  GetShareCountResponseType,
  GetTopPostInGroupListResType,
  ReportCommentBodyType,
  GetReportCommentResponseType,
  ApproveOrRejectReportCommentBodyType,
} from "@/schemaValidations/post.schema";

const postApiRequest = {
  getAllCategory: () =>
    http.get<CategoryListSchemaType>("post/api/category/get-all"),
  uploadAvatarCoverFromFile: (formData: FormData) =>
    http.post<UploadImageCoverResponseType>(
      "post/api/fileupload/upload",
      formData
    ),
  createPost: (body: CreatePostBodyType) =>
    http.post<{ message: string }>("post/api/post/create-post", body),
  getPostByPostId: (postId: string) =>
    http.get<PostByIdType>(`post/api/post/get-by-post-id/${postId}`),
  getCommentsByPostId: (postId: string) =>
    http.get<GetCommentsByPostIdResponseType>(
      `post/api/comment/get-by-post-id/${postId}`
    ),

  createComment: (body: CreateCommentBodyType) =>
    http.post<CreateCommentResponseType>("post/api/comment/create", body),

  getPostByUserId: (userId: string) =>
    http.get<GetPostByUserIdResType>(`post/api/post/get-user-post/${userId}`),
  deletePostByPostId: (postId: string) =>
    http.delete<{ message: string }>(`post/api/post/delete/${postId}`),
  addUserReference: (body: AddUserReferenceBodyType) =>
    http.post<{ message: string }>("post/api/post/add-user-reference", body),
  getHomePageLazyLoad: (pageNumber: number, pageSize: number) =>
    http.get<GetHomePageListLazyLoadType>(
      `post/api/post/get-homepage?pageNumber=${pageNumber}&pageSize=${pageSize}`
    ),
  getQuickPostHomePage: () =>
    http.get<GetQuickPostListType>("post/api/post/get-side-recommendation"),
  updatePersonalPost: (id: string, body: UpdatePersonalPostBodyType) =>
    http.put<{ message: string }>(`post/api/post/update-post/${id}`, body),

  deleteCommentByCommentId: (commentId: string) =>
    http.delete<{ message: string }>(`post/api/comment/delete/${commentId}`),
  addReaction: (body: AddReactionBodyType) =>
    http.post<{ message: string }>("post/api/reaction/add-reaction", body),
  getReactionCount: (postId: string) =>
    http.get<GetReactionCountResType>(
      `post/api/reaction/get-reaction-count/${postId}`
    ),

  getCommentCount: (postId: string) =>
    http.get<GetCommentCountResType>(
      `post/api/comment/count-total-comment-by-post-id/${postId}`
    ),
  getUserReactionByPostId: (postId: string) =>
    http.get<GetUserReactionByPostIdResType>(
      `post/api/reaction/get-user-reaction-by-post-id/${postId}`
    ),

  getBookmarkList: () =>
    http.get<GetBookmarkListResponseType>("post/api/bookmark/get-bookmark"),
  getBookmarkListDetails: (bookmarkId: string) =>
    http.get<GetBookmarkListDetailsResponseType>(
      `post/api/bookmark/get-post-bookmark?bookmarkId=${bookmarkId}`
    ),
  deleteBookmarkListDetails: (body: DeleteBookmarkListDetailsBodyType) =>
    http.delete<{ message: string }>("post/api/bookmark/delete-bookmark-post", {
      body,
    }),
  createBookmarkList: (body: CreateBookmarkListBodyType) =>
    http.post<{ message: string }>("post/api/bookmark/create-bookmark", body),
  deleteBookmarkList: (bookmarkId: string) =>
    http.delete<{ message: string }>(`post/api/bookmark/delete-bookmark`, {
      body: { bookmarkId },
    }),
  addBookmarkListDetails: (body: AddBookmarkListDetailsBodyType) =>
    http.post<{ message: string }>("post/api/bookmark/add-bookmark-post", body),
  getAllReactionType: () =>
    http.get<GetAllReactionTypeResponseType>("post/api/reactiontype/get-all"),
  removeReaction: (postId: string) =>
    http.delete<{ message: string }>(`post/api/reaction/remove-reaction`, {
      body: { postId },
    }),
  sharePost: (body: SharePostRequestType) =>
    http.post<SharePostResponseType>("post/api/share/share-story", body),
  getHighlightPost: (top: number) =>
    http.get<GetHighlightPostListResType>(`post/api/post/get-top-post/${top}`),
  getDetailsCategory: (categoryId: string) =>
    http.get<GetDetailsCategoryResponseType>(
      `post/api/category/get-by-id/${categoryId}`
    ),

  getSharedPosts: (userId: string) =>
    http.get<SharedPostResponseType>(
      `post/api/share/get-share-posts/${userId}`
    ),
  addCategory: (body: CreateCategoryBodyType) =>
    http.post<{ message: string }>("post/api/category/create", body),
  deleteCategory: (categoryId: string) =>
    http.delete<{ message: string }>(`post/api/category/delete/${categoryId}`),
  updateCategory: (categoryId: string, body: CreateCategoryBodyType) =>
    http.put<{ message: string }>(
      `post/api/category/update/${categoryId}`,
      body
    ),
  getAuthorOtherPost: (body: GetAuthorOtherPostBodyType) =>
    http.get<GetAuthorOtherPostListResType>(
      `post/api/post/get-other-authour-post/${body.authorId}/top?top=${body.top}`
    ),
  getOtherPostWithSameCategory: (body: GetOtherPostWithSameCategoryBodyType) =>
    http.get<GetAuthorOtherPostListResType>(
      `post/api/post/get-other-relative-post/${body.postId}/${body.top}`
    ),

  updateSharedPost: (body: UpdateSharedPostBodyType) =>
    http.put<{ message: string }>("post/api/share/update-share", body),

  deleteSharedPost: (shareId: string) =>
    http.delete<{ message: string }>(`post/api/share/delete-share/${shareId}`),

  getCommentsByShareId: (shareId: string) =>
    http.get<GetCommentsByShareIdResponseType>(
      `post/api/comment/get-by-share-id/${shareId}`
    ),

  createSharedComment: (body: CreateSharedCommentBodyType) =>
    http.post<CreateSharedCommentResponseType>(
      "post/api/comment/create-for-share",
      body
    ),
  createPostInGroup: (body: CreatePostInGroupBodyType) =>
    http.post<{ message: string }>("post/api/post/create-post-group", body),
  viewPostInGroupByGroupId: (groupId: string) =>
    http.get<GetPostByGroupIdListResType>(
      `post/api/post/get-posts-in-group-by-id/${groupId}`
    ),

  getSharedCommentCount: (shareId: string) =>
    http.get<GetSharedCommentCountResType>(
      `post/api/comment/count-total-comment-by-share-id/${shareId}`
    ),
  getPersonalPostGroup: (userId: string, groupId: string) =>
    http.get<GetPersonalPostGroupListResType>(
      `post/api/post/get-posts-in-group-by-user-and-group?groupId=${groupId}&userId=${userId}`
    ),
  updatePersonalPostInGroup: (
    postId: string,
    body: UpdatePersonalPostBodyType
  ) =>
    http.put<{ message: string }>(
      `post/api/post/update-post-in-group/${postId}`,
      body
    ),

  addReactionShared: (body: AddReactionSharedBodyType) =>
    http.post<{ message: string }>(
      "post/api/reaction/add-reaction-share",
      body
    ),
  getReactionSharedCount: (shareId: string) =>
    http.get<GetReactionSharedCountResType>(
      `post/api/reaction/get-reaction-count-by-share/${shareId}`
    ),

  removeReactionShared: (shareId: string) =>
    http.delete<{ message: string }>(
      `post/api/reaction/remove-reaction-by-share`,
      {
        body: { shareId },
      }
    ),

  getUserReactionByShareId: (shareId: string) =>
    http.get<GetUserReactionByShareIdResType>(
      `post/api/reaction/get-user-reaction-by-share-id/${shareId}`
    ),

  getShareCount: (postId: string) =>
    http.get<GetShareCountResponseType>(`post/api/share/count-share/${postId}`),
  getTopPostInGroup: (groupId: string) =>
    http.get<GetTopPostInGroupListResType>(
      `post/api/post/get-posts-by-reaction-in-group/${groupId}`
    ),

  getReportComment: () =>
    http.get<GetReportCommentResponseType>(
      "report/api/report/get-comment-report"
    ),

  reportComment: (body: ReportCommentBodyType) =>
    http.post<{ message: string }>("post/api/report/report-comment", body),

  approveOrRejectReportComment: (body: ApproveOrRejectReportCommentBodyType) =>
    http.post<{ message: string }>("post/api/ban/ban-comment", body),
};

export default postApiRequest;
