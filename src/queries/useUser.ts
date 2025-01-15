import { userApiRequest } from "@/apiRequests/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userApiRequest.getAllUsers,
    select: (response) => response.payload.data,
  });
};

export const useGetToManageUser = () => {
  return useQuery({
    queryKey: ["manage-users"],
    queryFn: userApiRequest.getToManageUser,
  });
};

export const useCreateAccountForModerator = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApiRequest.createAccountForModerator,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manage-users"],
      });
    },
  });
};

export const useUpdateStatusModeratorAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApiRequest.updateStatusModeratorAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manage-users"],
      });
    },
  });
};

export const useUpdateStatusUserAccount = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: userApiRequest.updateStatusUserAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["manage-users"],
      });
    },
  });
};

export const useGetUserStatistics = () => {
  return useQuery({
    queryKey: ["user-statistics"],
    queryFn: userApiRequest.getUserStatistics,
  });
};
