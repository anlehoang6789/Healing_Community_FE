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

export const useGetUserProfileQuery = (userId: string) => {
  return useQuery({
    queryKey: ["user-profile", userId],
    queryFn: () => accountApiRequest.getUserProfile(userId),
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
        queryKey: ["user-profile"],
        exact: true,
      });
    },
  });
};

export const useGetFollowingQuery = () => {
  return useQuery({
    queryKey: ["following"],
    queryFn: accountApiRequest.getFollowing,
  });
};

export const useFollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequest.followUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"],
        exact: true,
      });
    },
  });
};

export const useUnfollowUserMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: accountApiRequest.unFollowUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["following"],
        exact: true,
      });
    },
  });
};
