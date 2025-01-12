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
