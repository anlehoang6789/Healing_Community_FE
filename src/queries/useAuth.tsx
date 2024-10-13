import authApiRequest from "@/apiRequests/auth";
import { useMutation } from "@tanstack/react-query";

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
