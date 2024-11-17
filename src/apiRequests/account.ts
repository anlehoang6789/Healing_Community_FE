import http from "@/lib/http";
import {
  ChangePasswordBodyType,
  ForgotPasswordBodyType,
  PersonalInformationBodyType,
  ResetPasswordWithOtpBodyType,
  UpdateAvatarProfileBodyType,
  UpdateProfileUserBodyType,
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
  getUserProfile: (userId: string) =>
    http.get<PersonalInformationBodyType>(`user/get-user-profile/${userId}`),
  updateAvatarProfile: (formData: FormData) =>
    http.put<UpdateAvatarProfileBodyType>(
      "user/update-profile-picture",
      formData
    ),
  updateProfileUser: (body: UpdateProfileUserBodyType) =>
    http.put<{ message: string }>("user/update-user-profile", body),
};

export default accountApiRequest;
