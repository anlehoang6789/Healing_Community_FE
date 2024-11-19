import postApiRequest from "@/apiRequests/post";
import { useMutation, useQuery } from "@tanstack/react-query";

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
    queryKey: ["post-by-id", postId],
    queryFn: () => postApiRequest.getPostByPostId(postId),
  });
};
