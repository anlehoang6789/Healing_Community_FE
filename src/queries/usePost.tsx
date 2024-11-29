import postApiRequest from "@/apiRequests/post";
import { GetHomePageSchemaLazyLoadType } from "@/schemaValidations/post.schema";
import { usePostStore } from "@/store/postStore";
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

export const useGetAllCategoryQuery = () => {
  return useQuery({
    queryKey: ["category-list"],
    queryFn: () => postApiRequest.getAllCategory(),
  });
};

export const useUploadAvatarCoverFromFileMutation = () => {
  return useMutation({
    mutationFn: postApiRequest.uploadAvatarCoverFromFile,
  });
};

export const useCreatePostMutation = () => {
  return useMutation({
    mutationFn: postApiRequest.createPost,
  });
};

export const useGetPostByPostIdQuery = (postId: string) => {
  return useQuery({
    queryKey: ["post-by-post-id", postId],
    queryFn: () => postApiRequest.getPostByPostId(postId),
  });
};

export const useGetCommentsByPostIdQuery = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => postApiRequest.getCommentsByPostId(postId),
    enabled: !!postId,
  });
};

export const useCreateCommentMutation = () => {
  return useMutation({
    mutationFn: postApiRequest.createComment,
  });
};
export const useGetPostByUserIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ["post-by-user-id", userId],
    queryFn: () => postApiRequest.getPostByUserId(userId),
  });
};

export const useDeletePostByPostIdMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.deletePostByPostId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-by-user-id", userId],
      });
    },
  });
};

export const useGetQuickPostHomePageQuery = () => {
  return useQuery({
    queryKey: ["quick-post"],
    queryFn: () => postApiRequest.getQuickPostHomePage(),
  });
};

export const useAddUserReferenceMutation = () => {
  return useMutation({
    mutationFn: postApiRequest.addUserReference,
  });
};

// export const useGetHomePageLazyLoadQuery = (pageSize: number) => {
//   return useInfiniteQuery({
//     queryKey: ["home-page-lazy-load"],
//     queryFn: ({ pageParam = 1 }) =>
//       postApiRequest.getHomePageLazyLoad(pageParam, pageSize),
//     getNextPageParam: (lastPage, allPages) => {
//       // Kiểm tra nếu còn dữ liệu thì trả về số trang tiếp theo
//       const hasNextPage = lastPage.payload.data.length === pageSize;
//       return hasNextPage ? allPages.length + 1 : undefined;
//     },
//     initialPageParam: 1, // Giá trị khởi tạo của pageParam
//   });
// };

export const useGetHomePageLazyLoadQuery = (
  pageSize: number,
  initialArticles?: GetHomePageSchemaLazyLoadType[]
) => {
  return useInfiniteQuery({
    queryKey: ["home-page-lazy-load"],
    queryFn: ({ pageParam = 1 }) => {
      return postApiRequest.getHomePageLazyLoad(pageParam, pageSize);
    },
    getNextPageParam: (lastPage, allPages) => {
      const hasNextPage = lastPage.payload.data.length === pageSize;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
    initialData: initialArticles
      ? {
          pages: [
            {
              status: 200, // Provide a default status
              payload: {
                message: "Initial articles loaded", // Add a default message
                data: initialArticles.slice(0, pageSize), // Add the initial articles
              },
            },
          ],
          pageParams: [1], // Initialize pageParams
        }
      : undefined,
    initialPageParam: 1, // Ensure initialPageParam is set
  });
};
