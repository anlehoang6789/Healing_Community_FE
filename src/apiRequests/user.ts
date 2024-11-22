import http from "@/lib/http";
import { GetUsersResponseType } from "@/schemaValidations/user.schema";

export const userApiRequest = {
  // Lấy danh sách tất cả người dùng
  getAllUsers: () => http.get<GetUsersResponseType>("user/api/user/get-all"),
};

export default userApiRequest;
