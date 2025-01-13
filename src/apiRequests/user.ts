import http from "@/lib/http";
import { RegisterModeratorBodyType } from "@/schemaValidations/moderator.schema";
import {
  GetToManageUserListResType,
  GetUsersResponseType,
} from "@/schemaValidations/user.schema";

export const userApiRequest = {
  // Lấy danh sách tất cả người dùng
  getAllUsers: () => http.get<GetUsersResponseType>("user/api/user/get-all"),
  getToManageUser: () =>
    http.get<GetToManageUserListResType>(
      "user/api/manageraccount/get-user-manager"
    ),
  createAccountForModerator: (body: RegisterModeratorBodyType) =>
    http.post<{ message: string }>(
      "user/api/manageraccount/create-moderator-account",
      body
    ),
};

export default userApiRequest;
