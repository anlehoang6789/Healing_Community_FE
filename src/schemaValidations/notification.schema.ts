import { z } from "zod";

export const UnreadCountResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.number(),
  errors: z.array(z.any()),
  timestamp: z.string(),
});

export type UnreadCountResponseType = z.infer<typeof UnreadCountResponseSchema>;

export const GetNotificationSchema = z.object({
  notificationId: z.string(),
  notificationTypeId: z.string(),
  message: z.string(),
  isRead: z.boolean(),
  createdAt: z.string(),
  postId: z.string(),
  userId: z.string(),
});

export type GetNotificationType = z.infer<typeof GetNotificationSchema>;

export const GetNotificationListResponseSchema = z.object({
  data: z.array(GetNotificationSchema),
  message: z.string(),
});

export type GetNotificationListResponseType = z.infer<
  typeof GetNotificationListResponseSchema
>;
