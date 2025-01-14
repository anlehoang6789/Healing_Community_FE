import { z } from "zod";

export const GetReportPostSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  reportedUserId: z.string(),
  reportedUserName: z.string(),
  reportedUserEmail: z.string(),
  postId: z.string(),
  postTitle: z.string(),
  reportTypeEnum: z.number(),
  isApprove: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetReportPostSchemaType = z.TypeOf<typeof GetReportPostSchema>;

export const GetReportPostListRes = z.object({
  data: z.array(GetReportPostSchema),
  message: z.string(),
});

export type GetReportPostListResType = z.TypeOf<typeof GetReportPostListRes>;

export const AddReportPostBody = z.object({
  postId: z.string(),
  reportTypeEnum: z.number(),
});

export type AddReportPostBodyType = z.TypeOf<typeof AddReportPostBody>;

export const ApproveOrRejectReportPostBody = z.object({
  postId: z.string(),
  isApprove: z.boolean(),
});

export type ApproveOrRejectReportPostBodyType = z.TypeOf<
  typeof ApproveOrRejectReportPostBody
>;

export const GetReportExpertSchema = z.object({
  id: z.string(),
  userId: z.string(),
  reportDescription: z.string(),
  appointmentId: z.string(),
  appoinmtentDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  expertEmail: z.string(),
  expertName: z.string(),
  isApprove: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetReportExpertSchemaType = z.TypeOf<typeof GetReportExpertSchema>;

export const GetReportExpertListRes = z.object({
  data: z.array(GetReportExpertSchema),
  message: z.string(),
});

export type GetReportExpertListResType = z.TypeOf<
  typeof GetReportExpertListRes
>;

export const AprroveOrRejectReportExpertBody = z.object({
  appointmentId: z.string(),
  isApprove: z.boolean(),
});

export type AprroveOrRejectReportExpertBodyType = z.TypeOf<
  typeof AprroveOrRejectReportExpertBody
>;

export const AddReportExpertBody = z.object({
  appoinmtentId: z.string(),
  reportDescription: z.string(),
});

export type AddReportExpertBodyType = z.TypeOf<typeof AddReportExpertBody>;

//===========================moderator activity
export const GetModeratorActivityReportPostSchema = z.object({
  id: z.string(),
  postId: z.string(),
  postTitle: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  reason: z.string(),
  isApprove: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetModeratorActivityReportPostSchemaType = z.TypeOf<
  typeof GetModeratorActivityReportPostSchema
>;

export const GetModeratorActivityReportPostListRes = z.object({
  data: z.array(GetModeratorActivityReportPostSchema),
  message: z.string(),
});

export type GetModeratorActivityReportPostListResType = z.TypeOf<
  typeof GetModeratorActivityReportPostListRes
>;

export const GetModeratorActivityReportExpertSchema = z.object({
  id: z.string(),
  moderatorId: z.string(),
  moderatorName: z.string(),
  moderatorEmail: z.string(),
  appointmentId: z.string(),
  appoinmtentDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  expertEmail: z.string(),
  expertName: z.string(),
  isApprove: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetModeratorActivityReportExpertSchemaType = z.TypeOf<
  typeof GetModeratorActivityReportExpertSchema
>;

export const GetModeratorActivityReportExpertListRes = z.object({
  data: z.array(GetModeratorActivityReportExpertSchema),
  message: z.string(),
});

export type GetModeratorActivityReportExpertListResType = z.TypeOf<
  typeof GetModeratorActivityReportExpertListRes
>;

export const GetModeratorActivityReportCommentSchema = z.object({
  id: z.string(),
  commentId: z.string(),
  comment: z.string(),
  userId: z.string(),
  userName: z.string(),
  userEmail: z.string(),
  content: z.string(),
  isApprove: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetModeratorActivityReportCommentSchemaType = z.TypeOf<
  typeof GetModeratorActivityReportCommentSchema
>;

export const GetModeratorActivityReportCommentListRes = z.object({
  data: z.array(GetModeratorActivityReportCommentSchema),
  message: z.string(),
});

export type GetModeratorActivityReportCommentListResType = z.TypeOf<
  typeof GetModeratorActivityReportCommentListRes
>;
// ============================================

export const GetSystemReportSchema = z.object({
  id: z.string(),
  userId: z.string(),
  userName: z.string(),
  email: z.string(),
  content: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetSystemReportSchemaType = z.TypeOf<typeof GetSystemReportSchema>;

export const GetSystemReportListRes = z.object({
  data: z.array(GetSystemReportSchema),
  message: z.string(),
});

export type GetSystemReportListResType = z.TypeOf<
  typeof GetSystemReportListRes
>;

export const AddSystemReportBody = z.object({
  content: z.string(),
});

export type AddSystemReportBodyType = z.TypeOf<typeof AddSystemReportBody>;
