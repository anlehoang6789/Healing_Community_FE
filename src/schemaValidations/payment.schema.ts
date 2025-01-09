import { z } from "zod";

export const PaymentHistorySchema = z.object({
  paymentId: z.string(),
  userId: z.string(),
  appointmentId: z.string(), //id cuộc hẹn
  orderCode: z.number(),
  amount: z.number(),
  status: z.number(),
  paymentDate: z.string(),
  updatedAt: z.string(),
});

export type PaymentHistoryType = z.infer<typeof PaymentHistorySchema>;

export const PaymentHistoryListRes = z.object({
  data: z.array(PaymentHistorySchema),
  message: z.string(),
});

export type PaymentHistoryListResType = z.infer<typeof PaymentHistoryListRes>;

export const CreatePaymentRequestSchema = z.object({
  appointmentId: z.string(),
  redirectUrl: z.string().url(),
});

export type CreatePaymentRequestType = z.infer<
  typeof CreatePaymentRequestSchema
>;

export const CreatePaymentResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.string().url(),
  errors: z.array(z.string()).optional(),
  timestamp: z.string(),
});

export type CreatePaymentResponseType = z.infer<
  typeof CreatePaymentResponseSchema
>;

export const BookExpertScheduleReq = z.object({
  expertAvailabilityId: z.string(),
});

export type BookExpertScheduleReqType = z.infer<typeof BookExpertScheduleReq>;

export const BookExpertScheduleRes = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.string(),
  errors: z.array(z.string()),
  timestamp: z.string(),
});

export type BookExpertScheduleResType = z.infer<typeof BookExpertScheduleRes>;

export const PaymentHistoryDetailsSchema = z.object({
  paymentId: z.string(),
  appointmentId: z.string(),
  amount: z.number(),
  expertName: z.string(),
  expertEmail: z.string(),
  appointmentDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
});

export type PaymentHistoryDetailsType = z.infer<
  typeof PaymentHistoryDetailsSchema
>;

export const PaymentHistoryDetailsRes = z.object({
  data: PaymentHistoryDetailsSchema,
  message: z.string(),
});

export type PaymentHistoryDetailsResType = z.infer<
  typeof PaymentHistoryDetailsRes
>;

export const GetFeeServiceSchema = z.object({
  platformFeeId: z.string(),
  platformFeeName: z.string(),
  platformFeeDescription: z.string(),
  platformFeeValue: z.number(),
});

export type GetFeeServiceType = z.infer<typeof GetFeeServiceSchema>;

export const GetFeeServiceRes = z.object({
  data: GetFeeServiceSchema,
  message: z.string(),
});

export type GetFeeServiceResType = z.infer<typeof GetFeeServiceRes>;

export const UpdateFeeServiceSchema = z.object({
  platformFeeId: z.string(),
  percent: z.number(),
});

export type UpdateFeeServiceType = z.infer<typeof UpdateFeeServiceSchema>;

export const GetManagerPaymentForModeratorSchema = z.object({
  paymentId: z.string(),
  userId: z.string(),
  expertEmail: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  expertName: z.string(),
  appointmentId: z.string(),
  appointmentDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  orderCode: z.number(),
  amount: z.number(),
  paymemtStatus: z.number(),
  appointmentStatus: z.number(),
  userPaymentQrCodeLink: z.string(),
  expertPaymentQrCodeLink: z.string(),
  paymentDetail: z.string(),
  paymentDate: z.string(),
  updatedAt: z.string(),
});

export type GetManagerPaymentForModeratorType = z.infer<
  typeof GetManagerPaymentForModeratorSchema
>;

export const GetManagerPaymentForModeratorRes = z.object({
  data: z.array(GetManagerPaymentForModeratorSchema),
  message: z.string(),
});

export type GetManagerPaymentForModeratorResType = z.infer<
  typeof GetManagerPaymentForModeratorRes
>;

export const GetManagerPaymentForUserAndExpertSchema = z.object({
  paymentId: z.string(),
  userId: z.string(),
  expertEmail: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  expertName: z.string(),
  appointmentId: z.string(),
  appointmentDate: z.string(),
  startTime: z.string(),
  endTime: z.string(),
  orderCode: z.number(),
  amount: z.number(),
  status: z.number(),
  paymentDetail: z.string(),
  paymentDate: z.string(),
  updatedAt: z.string(),
});

export type GetManagerPaymentForUserAndExpertType = z.infer<
  typeof GetManagerPaymentForUserAndExpertSchema
>;

export const GetManagerPaymentForUserAndExpertListRes = z.object({
  data: z.array(GetManagerPaymentForUserAndExpertSchema),
  message: z.string(),
});

export type GetManagerPaymentForUserAndExpertListResType = z.infer<
  typeof GetManagerPaymentForUserAndExpertListRes
>;
