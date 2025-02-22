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

export const GetTotalRevenueForExpertRes = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.number(),
  errors: z.nullable(z.any()),
  timestamp: z.string(),
});

export type GetTotalRevenueForExpertResType = z.infer<
  typeof GetTotalRevenueForExpertRes
>;

export const GetRevenueStatisticsItemSchema = z.object({
  year: z.number().nullable(),
  month: z.number().nullable(),
  day: z.number().nullable(),
  dayOfWeek: z.string().nullable(),
  weekOfMonth: z.number().nullable(),
  totalRevenue: z.number(),
  totalBookings: z.number(),
});

export type GetRevenueStatisticsItemType = z.infer<
  typeof GetRevenueStatisticsItemSchema
>;

export const GetRevenueStatisticsResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(GetRevenueStatisticsItemSchema),
  errors: z.nullable(z.unknown()),
  timestamp: z.string(),
});

export type GetRevenueStatisticsResponseType = z.infer<
  typeof GetRevenueStatisticsResponseSchema
>;

export const GetTotalRevenueForExpertRequestSchema = z.object({
  filterType: z.string().optional(),
});

export type GetTotalRevenueForExpertRequestSchemaType = z.infer<
  typeof GetTotalRevenueForExpertRequestSchema
>;

export const GetTotalRevenueForAdminRes = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.number(),
  errors: z.nullable(z.any()),
  timestamp: z.string(),
});

export type GetTotalRevenueForAdminResType = z.infer<
  typeof GetTotalRevenueForAdminRes
>;

export const GetRevenueStatisticsItemForAdminSchema = z.object({
  year: z.number().nullable(),
  month: z.number().nullable(),
  day: z.number().nullable(),
  dayOfWeek: z.string().nullable(),
  weekOfMonth: z.number().nullable(),
  totalRevenue: z.number(),
  totalBookings: z.number(),
});

export type GetRevenueStatisticsItemForAdminType = z.infer<
  typeof GetRevenueStatisticsItemForAdminSchema
>;

export const GetRevenueStatisticsForAdminResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(GetRevenueStatisticsItemForAdminSchema),
  errors: z.nullable(z.unknown()),
  timestamp: z.string(),
});

export type GetRevenueStatisticsForAdminResponseType = z.infer<
  typeof GetRevenueStatisticsForAdminResponseSchema
>;

export const GetTotalRevenueForAdminRequestSchema = z.object({
  filterType: z.string().optional(),
});

export type GetTotalRevenueForAdminRequestSchemaType = z.infer<
  typeof GetTotalRevenueForAdminRequestSchema
>;
