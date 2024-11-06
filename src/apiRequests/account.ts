import http from "@/lib/http";
import {
  ChangePasswordBodyType,
  ForgotPasswordBodyType,
  ResetPasswordWithOtpBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  changePasswordForUser: (body: ChangePasswordBodyType) =>
    http.post<{ message: string }>("user/reset-password", body),
  forgotPasswordSendOtp: (body: ForgotPasswordBodyType) =>
    http.post<{ message: string }>("forgotpassword/forgot-password", body),
  resetPasswordWhenHaveOtp: (body: ResetPasswordWithOtpBodyType) =>
    http.post<{ message: string }>(
      "forgotpassword/confirm-forgot-password",
      body
    ),
};

export default accountApiRequest;
