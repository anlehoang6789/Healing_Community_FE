import postApiRequest from "@/apiRequests/post";
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
  const setSelectedPostId = usePostStore((state) => state.setSelectedPostId);
  return useMutation({
    mutationFn: postApiRequest.deletePostByPostId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-by-user-id", userId],
        exact: true,
      });
      setSelectedPostId(null);
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

export const useGetHomePageLazyLoadQuery = (pageSize: number) => {
  return useInfiniteQuery({
    queryKey: ["home-page-lazy-load"],
    queryFn: ({ pageParam = 1 }) =>
      postApiRequest.getHomePageLazyLoad(pageParam, pageSize),
    getNextPageParam: (lastPage, allPages) => {
      // Kiểm tra nếu còn dữ liệu thì trả về số trang tiếp theo
      const hasNextPage = lastPage.payload.data.length === pageSize;
      return hasNextPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1, // Giá trị khởi tạo của pageParam
  });
};
