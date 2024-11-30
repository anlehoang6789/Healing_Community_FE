import http from "@/lib/http";
import {
  GetAllGroupsJoinedByUserIdResponseType,
  GetAllGroupsResponseType,
} from "@/schemaValidations/group.schema";

const groupApiRequest = {
  getAllGroups: () =>
    http.get<GetAllGroupsResponseType>("group/api/group/get-all"),

  getGroupsJoinedByUserId: (userId: string) =>
    http.get(`group/api/usergroup/get-by-user-id?userId=${userId}`),
};

export default groupApiRequest;
