import accountApiRequest from "@/apiRequests/account";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useChangePasswordUserMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.changePasswordForUser,
  });
};

export const useForgotPasswordSendOtpMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.forgotPasswordSendOtp,
  });
};

export const useResetPasswordWhenHaveOtpMutation = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: accountApiRequest.resetPasswordWhenHaveOtp,
    onSuccess: () => {
      if (onSuccess) {
        onSuccess();
      }
    },
  });
};

export const useGetUserProfileQuery = (userId: string, enabled?: boolean) => {
  return useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => accountApiRequest.getUserProfile(userId),
    enabled,
  });
};

export const useUpdateAvatarProfileMutation = () => {
  return useMutation({
    mutationFn: accountApiRequest.updateAvatarProfile,
  });
};

export const useUpdateProfileUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequest.updateProfileUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userProfile"],
        exact: true,
      });
    },
  });
};

export const useGetFollowingQuery = (userId: string) => {
  return useQuery({
    queryKey: ["following", userId],
    queryFn: () => accountApiRequest.getFollowing(userId),
  });
};

export const useFollowUserMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequest.followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following", userId],
        exact: true,
      });
    },
  });
};

export const useUnfollowUserMutation = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequest.unFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following", userId],
        exact: true,
      });
    },
  });
};
