import http from "@/lib/http";
import {
  ApproveOrRejectRequestGroupResType,
  ApproveOrRejectRequestGroupType,
  CreateGroupRequestType,
  CrequestGroupRequestType,
  GetAllGroupsResponseType,
  GetGroupDetailsByGroupIdResType,
  GetGroupMembersByGroupIdListResType,
  GetListRequestGroupByUserIdResponseType,
  GetListRequestGroupResponseType,
  GetRequestJoinGroupListResType,
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

  crequestGroup: (payload: CrequestGroupRequestType) =>
    http.post<{ data: string }>(
      "group/api/group/create-request-group",
      payload
    ),
  getApprovalRequestsCreateGroup: () =>
    http.get<GetListRequestGroupResponseType>(
      "group/api/group/get-approval-requests-create-group"
    ),

  approveOrRejectRequestGroup: (payload: ApproveOrRejectRequestGroupResType) =>
    http.put<{ data: string }>(
      `group/api/managegroup/approve-request-create-group/${payload.groupRequestId}?isApproved=${payload.isApproved}`,
      {}
    ),

  getRequestsCreateGroupByUserId: (userId: string) =>
    http.get<GetListRequestGroupByUserIdResponseType>(
      `group/api/group/get-user-requests-create-group/${userId}`
    ),
  getRequestJoinGroup: (groupId: string) =>
    http.get<GetRequestJoinGroupListResType>(
      `group/api/group/get-approval-queue/${groupId}`
    ),
  approveOrRejectRequestJoinGroup: (body: ApproveOrRejectRequestGroupType) =>
    http.post<{ message: string }>(
      `group/api/managegroup/approve-user-join-group?queueId=${body.queueId}&isApproved=${body.isApproved}`,
      {}
    ),
};

export default groupApiRequest;
