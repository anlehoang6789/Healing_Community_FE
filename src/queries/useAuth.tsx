import authApiRequest from "@/apiRequests/auth";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.loginFromNextClientToNextServer,
  });
};

export const useRegisterUserMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.registerUser,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: authApiRequest.logoutFromNextClientToNextServer,
  });
};

export const useGetRoleByUserIdQuery = (userId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["role-by-user-id", userId],
    queryFn: () => authApiRequest.getRoleByUserId(userId),
    enabled,
  });
};
