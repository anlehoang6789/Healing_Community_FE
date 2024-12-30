import http from "@/lib/http";
import {
  CreateGroupRequestType,
  GetAllGroupsJoinedByUserIdResponseType,
  GetAllGroupsResponseType,
  GetGroupDetailsByGroupIdResType,
  GetGroupMembersByGroupIdListResType,
  GetRoleCountByGroupIdResType,
  JoinGroupRequestType,
  LeaveGroupRequestType,
} from "@/schemaValidations/group.schema";

const groupApiRequest = {
  getAllGroups: () =>
    http.get<GetAllGroupsResponseType>("group/api/group/get-all"),

  getGroupsJoinedByUserId: (userId: string) =>
    http.get(`group/api/usergroup/get-by-user-id/${userId}`),

  createGroup: (payload: CreateGroupRequestType) =>
    http.post<{ message: string }>("group/api/group/create-group", payload),

  deleteGroupByGroupId: (groupId: string) =>
    http.delete<{ message: string }>(`group/api/group/delete-group/${groupId}`),

  joinGroup: (payload: JoinGroupRequestType) =>
    http.post<{ message: string }>("group/api/usergroup/join", payload),

  leaveGroupByGroupId: (payload: LeaveGroupRequestType) =>
    http.post<{ message: string }>(
      `group/api/usergroup/leave?groupId=${payload.groupId}`,
      {}
    ),

  updateGroup: (groupId: string, payload: CreateGroupRequestType) =>
    http.put<{ message: string }>(
      `group/api/group/update-group/${groupId}`,
      payload
    ),
  getGroupDetailsByGroupId: (groupId: string) =>
    http.get<GetGroupDetailsByGroupIdResType>(
      `group/api/group/get-by-group-id/${groupId}`
    ),
  getGroupMemberByGroupId: (groupId: string) =>
    http.get<GetGroupMembersByGroupIdListResType>(
      `group/api/usergroup/get-by-group-id/${groupId}`
    ),
  getRoleCountByGroupId: (groupId: string) =>
    http.get<GetRoleCountByGroupIdResType>(
      `group/api/usergroup/get-role-count-by-group-id/${groupId}`
    ),
};

export default groupApiRequest;
