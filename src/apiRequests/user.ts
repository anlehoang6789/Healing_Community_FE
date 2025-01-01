import http from "@/lib/http";
import {
  GetToManageUserListResType,
  GetUsersResponseType,
} from "@/schemaValidations/user.schema";

export const userApiRequest = {
  // Lấy danh sách tất cả người dùng
  getAllUsers: () => http.get<GetUsersResponseType>("user/api/user/get-all"),
  getToManageUser: () =>
    http.get<GetToManageUserListResType>("user/api/user/get-user-manager"),
};

export default userApiRequest;
