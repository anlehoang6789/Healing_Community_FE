import http from "@/lib/http";
import {
  ChangePasswordBodyType,
  FollowUserBodyType,
  FollowUserResType,
  ForgotPasswordBodyType,
  GetFollowingResType,
  PersonalInformationBodyType,
  ResetPasswordWithOtpBodyType,
  UpdateAvatarProfileBodyType,
  UpdateProfileUserBodyType,
} from "@/schemaValidations/account.schema";

const accountApiRequest = {
  changePasswordForUser: (body: ChangePasswordBodyType) =>
    http.post<{ message: string }>("user/api/user/reset-password", body),
  forgotPasswordSendOtp: (body: ForgotPasswordBodyType) =>
    http.post<{ message: string }>(
      "user/api/forgotpassword/forgot-password",
      body
    ),
  resetPasswordWhenHaveOtp: (body: ResetPasswordWithOtpBodyType) =>
    http.post<{ message: string }>(
      "user/api/forgotpassword/confirm-forgot-password",
      body
    ),
  getUserProfile: (userId: string) =>
    http.get<PersonalInformationBodyType>(
      `user/api/user/get-user-profile/${userId}`
    ),
  updateAvatarProfile: (formData: FormData) =>
    http.put<UpdateAvatarProfileBodyType>(
      "user/api/user/update-profile-picture",
      formData
    ),
  updateProfileUser: (body: UpdateProfileUserBodyType) =>
    http.put<{ message: string }>("user/api/user/update-user-profile", body),
  getFollowing: () =>
    http.get<GetFollowingResType>("user/api/follower/get-following"),
  followUser: (body: FollowUserBodyType) =>
    http.post<FollowUserResType>("user/api/follower/follow-user", body),
  unFollowUser: (userId: string) =>
    http.delete<{ message: string }>(
      `user/api/follower/unfollow-user?userId=${userId}`
    ),
};

export default accountApiRequest;
