import http from "@/lib/http";
import {
  CreateGroupRequestType,
  GetAllGroupsJoinedByUserIdResponseType,
  GetAllGroupsResponseType,
} from "@/schemaValidations/group.schema";

const groupApiRequest = {
  getAllGroups: () =>
    http.get<GetAllGroupsResponseType>("group/api/group/get-all"),

  getGroupsJoinedByUserId: (userId: string) =>
    http.get(`group/api/usergroup/get-by-user-id?userId=${userId}`),

  createGroup: (payload: CreateGroupRequestType) =>
    http.post("group/api/group/create-group", payload),
};

export default groupApiRequest;
