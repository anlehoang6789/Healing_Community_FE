import { z } from "zod";

const GroupSchema = z.object({
  groupId: z.string(),
  groupName: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdByUserId: z.string(),
  avatarGroup: z.string().nullable(),
  isAutoApprove: z.boolean(),
  groupVisibility: z.number(),
  memberLimit: z.number(),
  currentMemberCount: z.number(),
});

export type GroupType = z.infer<typeof GroupSchema>;

const GetAllGroupsResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(GroupSchema),
  errors: z.array(z.string()),
  timestamp: z.string(),
});

export type GetAllGroupsResponseType = z.infer<
  typeof GetAllGroupsResponseSchema
>;

const GroupJoinedByUserIdSchema = z.object({
  groupId: z.string(),
  groupName: z.string(),
  groupAvatar: z.string().nullable(),
  joinedAt: z.string(),
  roleInGroup: z.enum(["User", "Admin", "Moderator"]),
});

export type GroupJoinedByUserIdType = z.infer<typeof GroupJoinedByUserIdSchema>;

const GetAllGroupsJoinedByUserIdResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(GroupJoinedByUserIdSchema),
  errors: z.array(z.string()),
  timestamp: z.string(),
});

export type GetAllGroupsJoinedByUserIdResponseType = z.infer<
  typeof GetAllGroupsJoinedByUserIdResponseSchema
>;

const CreateGroupRequestSchema = z.object({
  groupName: z.string(),
  description: z.string(),
  avatarGroup: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isAutoApprove: z.boolean(),
  groupVisibility: z.number(),
  memberLimit: z.number(),
});

export type CreateGroupRequestType = z.infer<typeof CreateGroupRequestSchema>;

const JoinGroupRequestSchema = z.object({
  groupId: z.string(),
});

export type JoinGroupRequestType = z.infer<typeof JoinGroupRequestSchema>;

const LeaveGroupRequestSchema = z.object({
  groupId: z.string(),
});

export type LeaveGroupRequestType = z.infer<typeof LeaveGroupRequestSchema>;

export const GetGroupDetailsByGroupIdSchema = z.object({
  groupId: z.string(),
  groupName: z.string(),
  description: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  createdByUserId: z.string(),
  avatarGroup: z.string(),
  isAutoApprove: z.boolean(),
  groupVisibility: z.number(),
  memberLimit: z.number(),
  currentMemberCount: z.number(),
});

export type GetGroupDetailsByGroupIdType = z.infer<
  typeof GetGroupDetailsByGroupIdSchema
>;

export const GetGroupDetailsByGroupIdRes = z.object({
  data: GetGroupDetailsByGroupIdSchema,
  message: z.string(),
});

export type GetGroupDetailsByGroupIdResType = z.infer<
  typeof GetGroupDetailsByGroupIdRes
>;

export const GetGroupMembersByGroupIdSchema = z.object({
  userId: z.string(),
  groupName: z.string(),
  groupAvatar: z.string(),
  roleInGroup: z.enum(["User", "Owner", "Moderator"]),
  joinedAt: z.string(),
});

export type GetGroupMembersByGroupIdType = z.infer<
  typeof GetGroupMembersByGroupIdSchema
>;

export const GetGroupMembersByGroupIdListRes = z.object({
  data: z.array(GetGroupMembersByGroupIdSchema),
  message: z.string(),
});

export type GetGroupMembersByGroupIdListResType = z.infer<
  typeof GetGroupMembersByGroupIdListRes
>;

export const GetRoleCountByGroupIdSchema = z.object({
  totalUsers: z.number(),
  totalOwnersAndModerators: z.number(),
  totalMembers: z.number(),
});

export type GetRoleCountByGroupIdType = z.infer<
  typeof GetRoleCountByGroupIdSchema
>;

export const GetRoleCountByGroupIdRes = z.object({
  data: GetRoleCountByGroupIdSchema,
  message: z.string(),
});

export type GetRoleCountByGroupIdResType = z.infer<
  typeof GetRoleCountByGroupIdRes
>;

const CrequestGroupRequestSchema = z.object({
  groupName: z.string(),
  description: z.string(),
});

export type CrequestGroupRequestType = z.infer<
  typeof CrequestGroupRequestSchema
>;

export const GetRequestGroupSchema = z.object({
  groupRequestId: z.string(),
  groupName: z.string(),
  description: z.string(),
  isApproved: z.boolean().nullable(),
  approvedAt: z.string().nullable(),
  approvedById: z.string().nullable(),
  requestedById: z.string(),
  requestedAt: z.string(),
});

export type GetRequestGroupType = z.TypeOf<typeof GetRequestGroupSchema>;

export const GetListRequestGroupSchema = z.object({
  data: z.array(GetRequestGroupSchema),
  message: z.string(),
});

export type GetListRequestGroupResponseType = z.infer<
  typeof GetListRequestGroupSchema
>;

export const ApproveOrRejectRequestGroupRes = z.object({
  groupRequestId: z.string(),
  isApproved: z.boolean(),
});

export type ApproveOrRejectRequestGroupResType = z.infer<
  typeof ApproveOrRejectRequestGroupRes
>;

export const GetRequestedGroupByUserIdSchema = z.object({
  groupRequestId: z.string(),
  groupName: z.string(),
  description: z.string(),
  isApproved: z.boolean().nullable(),
  approvedAt: z.string().nullable(),
  approvedById: z.string().nullable(),
  requestedById: z.string(),
  requestedAt: z.string(),
});

export type GetRequestedGroupByUserIdType = z.TypeOf<
  typeof GetRequestedGroupByUserIdSchema
>;

export const GetListRequestGroupByUserIdSchema = z.object({
  data: z.array(GetRequestedGroupByUserIdSchema),
  message: z.string(),
});

export type GetListRequestGroupByUserIdResponseType = z.infer<
  typeof GetListRequestGroupByUserIdSchema
>;

// request join group
export const RequestJoinGroupSchema = z.object({
  queueId: z.string(),
  groupId: z.string(),
  userId: z.string(),
  requestedAt: z.string(),
});

export type RequestJoinGroupType = z.TypeOf<typeof RequestJoinGroupSchema>;

export const GetRequestJoinGroupListRes = z.object({
  data: z.array(RequestJoinGroupSchema),
  message: z.string(),
});

export type GetRequestJoinGroupListResType = z.infer<
  typeof GetRequestJoinGroupListRes
>;

// check role in group

//approve or reject request group
export const ApproveOrRejectRequestGroupSchema = z.object({
  queueId: z.string(),
  isApproved: z.boolean(),
});

export type ApproveOrRejectRequestGroupType = z.TypeOf<
  typeof ApproveOrRejectRequestGroupSchema
>;
