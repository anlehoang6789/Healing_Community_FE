import http from "@/lib/http";
import {
  AddUserReferenceBodyType,
  CategoryListSchemaType,
  CreateCommentBodyType,
  CreateCommentResponseType,
  CreatePostBodyType,
  GetCommentsByPostIdResponseType,
  GetHomePageListLazyLoadType,
  GetPostByUserIdResType,
  GetQuickPostListType,
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
};

export default postApiRequest;
