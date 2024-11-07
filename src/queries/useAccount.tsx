import accountApiRequest from "@/apiRequests/account";
import { useMutation } from "@tanstack/react-query";

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
