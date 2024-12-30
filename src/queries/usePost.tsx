import postApiRequest from "@/apiRequests/post";
import {
  CreateCategoryBodyType,
  CreateCommentBodyType,
  CreateSharedCommentBodyType,
  GetAuthorOtherPostBodyType,
  GetOtherPostWithSameCategoryBodyType,
  UpdatePersonalPostBodyType,
  UpdateSharedPostBodyType,
} from "@/schemaValidations/post.schema";
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

export const useGetDetailsCategoryQuery = ({
  categoryId,
  enabled,
}: {
  categoryId: string;
  enabled?: boolean;
}) => {
  return useQuery({
    queryKey: ["details-category", categoryId],
    queryFn: () => postApiRequest.getDetailsCategory(categoryId),
    enabled,
  });
};

export const useAddCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.addCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-list"],
      });
    },
  });
};

export const useDeleteCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.deleteCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-list"],
      });
    },
  });
};

export const useUpdateCategoryMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      categoryId,
      ...body
    }: CreateCategoryBodyType & { categoryId: string }) =>
      postApiRequest.updateCategory(categoryId, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["category-list"],
      });
    },
  });
};

export const useUploadAvatarCoverFromFileMutation = () => {
  return useMutation({
    mutationFn: postApiRequest.uploadAvatarCoverFromFile,
  });
};

export const useCreatePostMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-by-user-id", userId],
      });
    },
  });
};

export const useGetPostByPostIdQuery = ({
  postId,
  enabled,
}: {
  postId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["post-by-post-id", postId],
    queryFn: () => postApiRequest.getPostByPostId(postId),
    enabled,
  });
};

export const useGetCommentsByPostIdQuery = (postId: string) => {
  return useQuery({
    queryKey: ["comments", postId],
    queryFn: () => postApiRequest.getCommentsByPostId(postId),
    enabled: !!postId,
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

// export const useGetHomePageLazyLoadQuery = (
//   pageSize: number,
//   initialArticles?: GetHomePageSchemaLazyLoadType[]
// ) => {
//   return useInfiniteQuery({
//     queryKey: ["home-page-lazy-load"],
//     queryFn: ({ pageParam = 1 }) => {
//       return postApiRequest.getHomePageLazyLoad(pageParam, pageSize);
//     },
//     getNextPageParam: (lastPage, allPages) => {
//       const hasNextPage = lastPage.payload.data.length === pageSize;
//       return hasNextPage ? allPages.length + 1 : undefined;
//     },
//     initialData: initialArticles
//       ? {
//           pages: [
//             {
//               status: 200,
//               payload: {
//                 message: "Initial articles loaded",
//                 data: initialArticles.slice(0, pageSize),
//               },
//             },
//           ],
//           pageParams: [1],
//         }
//       : undefined,
//     initialPageParam: 1,
//   });
// };

export const useUpdatePersonalPostMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      ...body
    }: UpdatePersonalPostBodyType & { id: string }) =>
      postApiRequest.updatePersonalPost(id, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-by-user-id", userId],
        //exact: true => invalidate cache của 1 employee cụ thể
        exact: true,
      });
    },
  });
};

export const useGetReactionCountQuery = (postId: string) => {
  return useQuery({
    queryKey: ["reaction-count", postId],
    queryFn: () => postApiRequest.getReactionCount(postId),
  });
};

export const useGetCommentCountQuery = (postId: string) => {
  return useQuery({
    queryKey: ["comment-count", postId],
    queryFn: () => postApiRequest.getCommentCount(postId),
  });
};

export const useCreateCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateCommentBodyType & { postId: string }) =>
      postApiRequest.createComment(body),
    onSuccess: (response, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", variables.postId],
      });

      queryClient.invalidateQueries({
        queryKey: ["comment-count", variables.postId],
      });
    },
  });
};

export const useDeleteCommentByCommnetIdMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: {
      commentId: string;
      postId?: string;
      shareId?: string;
    }) => postApiRequest.deleteCommentByCommentId(body.commentId),
    onSuccess: (response, variables) => {
      // Nếu là comment của post
      if (variables.postId) {
        queryClient.invalidateQueries({
          queryKey: ["comments", variables.postId],
        });

        queryClient.invalidateQueries({
          queryKey: ["comment-count", variables.postId],
        });
      }

      // Nếu là comment của shared post
      if (variables.shareId) {
        queryClient.invalidateQueries({
          queryKey: ["shared-comments", variables.shareId],
        });

        queryClient.invalidateQueries({
          queryKey: ["shared-comment-count", variables.shareId],
        });
      }
    },
  });
};

export const useAddReactionMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.addReaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reaction-count", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-reaction-by-post-id", postId],
      });
    },
  });
};

export const useGetUserReactionByPostIdQuery = (postId: string) => {
  return useQuery({
    queryKey: ["user-reaction-by-post-id", postId],
    queryFn: () => postApiRequest.getUserReactionByPostId(postId),
  });
};

export const useGetBookmarkListQuery = () => {
  return useQuery({
    queryKey: ["bookmark-list"],
    queryFn: postApiRequest.getBookmarkList,
  });
};

export const useGetBookmarkListDetailsQuery = ({
  bookmarkId,
  enabled,
}: {
  bookmarkId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["bookmark-list-details", bookmarkId],
    queryFn: () => postApiRequest.getBookmarkListDetails(bookmarkId),
    enabled,
  });
};

export const useDeleteBookmarkListDetailsMutation = (bookmarkId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.deleteBookmarkListDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark-list-details", bookmarkId],
      });
    },
  });
};

export const useCreateBookmarkListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.createBookmarkList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark-list"],
      });
    },
  });
};

export const useDeleteBookmarkListMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.deleteBookmarkList,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark-list"],
      });
    },
  });
};

export const useAddBookmarkListDetailsMutation = (bookmarkId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.addBookmarkListDetails,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["bookmark-list-details", bookmarkId],
      });
    },
  });
};

export const useGetAllReactionTypeQuery = () => {
  return useQuery({
    queryKey: ["reaction-type"],
    queryFn: postApiRequest.getAllReactionType,
  });
};

export const useRemoveReactionMutation = (postId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.removeReaction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reaction-count", postId],
      });
      queryClient.invalidateQueries({
        queryKey: ["user-reaction-by-post-id", postId],
      });
    },
  });
};

export const useGetSharedPostByUserIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ["shared-post-by-user-id", userId],
    queryFn: () => postApiRequest.getSharedPosts(userId),
  });
};

export const useUpdateSharedPostMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (body: UpdateSharedPostBodyType) =>
      postApiRequest.updateSharedPost(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shared-post-by-user-id"],
      });
    },
  });
};

export const useDeleteSharedPostMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.deleteSharedPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shared-post-by-user-id", userId],
      });
    },
  });
};

export const useSharePostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.sharePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["shared-post-by-user-id"],
      });
    },
  });
};

export const useGetAuthorOtherPostQuery = ({
  body,
}: {
  body: GetAuthorOtherPostBodyType;
}) => {
  return useQuery({
    queryKey: ["author-other-post", body],
    queryFn: () => postApiRequest.getAuthorOtherPost(body),
  });
};

export const useGetOtherPostWithSameCategoryQuery = ({
  body,
}: {
  body: GetOtherPostWithSameCategoryBodyType;
}) => {
  return useQuery({
    queryKey: ["other-post-with-same-category", body],
    queryFn: () => postApiRequest.getOtherPostWithSameCategory(body),
  });
};

export const useGetCommentsByShareIdQuery = (shareId: string) => {
  return useQuery({
    queryKey: ["shared-comments", shareId],
    queryFn: () => postApiRequest.getCommentsByShareId(shareId),
    enabled: !!shareId,
  });
};

export const useGetSharedCommentCountQuery = (shareId: string) => {
  return useQuery({
    queryKey: ["shared-comment-count", shareId],
    queryFn: async () => {
      console.log("Fetching shared comment count...");
      return await postApiRequest.getSharedCommentCount(shareId);
    },
  });
};

export const useCreateSharedCommentMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body: CreateSharedCommentBodyType & { shareId: string }) =>
      postApiRequest.createSharedComment(body),
    onSuccess: (response, variables) => {
      // Sử dụng variables.shareId để invalidate
      queryClient.invalidateQueries({
        queryKey: ["shared-comment-count", variables.shareId],
      });
      queryClient.invalidateQueries({
        queryKey: ["shared-comments", variables.shareId],
      });
    },
  });
};

export const useViewPostInGroupByGroupIdQuery = (groupId: string) => {
  return useQuery({
    queryKey: ["post-in-group", groupId],
    queryFn: () => postApiRequest.viewPostInGroupByGroupId(groupId),
  });
};

export const useCreatePostInGroupMutation = ({
  userId,
  groupId,
}: {
  userId: string;
  groupId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.createPostInGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["post-in-group", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["personal-post-group", userId, groupId],
      });
    },
  });
};

export const useGetPersonalPostGroupQuery = ({
  userId,
  groupId,
}: {
  userId: string;
  groupId: string;
}) => {
  return useQuery({
    queryKey: ["personal-post-group", userId, groupId],
    queryFn: () => postApiRequest.getPersonalPostGroup(userId, groupId),
  });
};

export const useDeletePersonalPostInGroupMutation = ({
  userId,
  groupId,
}: {
  userId: string;
  groupId: string;
}) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postApiRequest.deletePostByPostId,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["personal-post-group", userId, groupId],
      });
    },
  });
};
