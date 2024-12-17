import http from "@/lib/http";
import {
  AddBookmarkListDetailsBodyType,
  AddReactionBodyType,
  AddUserReferenceBodyType,
  CategoryListSchemaType,
  CreateBookmarkListBodyType,
  CreateCommentBodyType,
  CreateCommentResponseType,
  CreatePostBodyType,
  DeleteBookmarkListDetailsBodyType,
  GetBookmarkListDetailsResponseType,
  GetBookmarkListResponseType,
  GetCommentCountResType,
  GetCommentsByPostIdResponseType,
  GetHomePageListLazyLoadType,
  GetPostByUserIdResType,
  GetQuickPostListType,
  GetReactionCountResType,
  GetUserReactionByPostIdResType,
  PostByIdType,
  UpdatePersonalPostBodyType,
  UploadImageCoverResponseType,
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
    http.get<GetPostByUserIdResType>(
      `post/api/post/get-user-post?userId=${userId}`
    ),
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
      `post/api/comment/count-by-post-id/${postId}`
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
};

export default postApiRequest;
