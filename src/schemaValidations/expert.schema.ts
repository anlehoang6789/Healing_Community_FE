import { z } from "zod";

const CertificateTypeSchema = z.object({
  certificateTypeId: z.string(),
  name: z.string(),
  description: z.string(),
  isMandatory: z.boolean(),
  certificates: z.array(z.unknown()),
});
export type CertificateSchemaType = z.TypeOf<typeof CertificateTypeSchema>;

export const GetCertificateTypeResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(CertificateTypeSchema),
  errors: z.array(z.any()),
  timestamp: z.string(),
});

export type GetCertificateTypeResponseType = z.TypeOf<
  typeof GetCertificateTypeResponseSchema
>;

export const UpdateProfileExpertBody = z.object({
  specialization: z.string().min(5),
  expertiseAreas: z.string().min(5),
  bio: z.string().min(10),
  fullname: z.string(),
  profileImageUrl: z.string().url().optional(),
});

export type UpdateProfileExpertBodyType = z.TypeOf<
  typeof UpdateProfileExpertBody
>;

export const UploadFileForExpertResponse = z.object({
  data: z.object({
    fileUrl: z.string().url(),
    certificateId: z.string(),
  }),
});

export type UploadFileForExpertResponseType = z.TypeOf<
  typeof UploadFileForExpertResponse
>;

export const UploadProfileImageForExpertResponse = z.object({
  data: z.string().url(),
});

export type UploadProfileImageForExpertResponseType = z.TypeOf<
  typeof UploadProfileImageForExpertResponse
>;

export const GetExpertProfileSchema = z.object({
  expertProfileId: z.string(),
  userId: z.string(),
  email: z.string().email(),
  specialization: z.string(),
  expertiseAreas: z.string(),
  bio: z.string(),
  frontIdCardUrl: z.string(),
  backIdCardUrl: z.string(),
  profileImageUrl: z.string().url(),
  fullname: z.string(),
  status: z.number(),
  averageRating: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetExpertProfileSchemaType = z.TypeOf<
  typeof GetExpertProfileSchema
>;

export const GetExpertProfileResponseSchema = z.object({
  data: GetExpertProfileSchema,
  message: z.string(),
});
export type GetExpertProfileResType = z.TypeOf<
  typeof GetExpertProfileResponseSchema
>;

export const DeleteCertificateResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.boolean(),
  errors: z.array(z.any()),
  timestamp: z.string(),
});

export type DeleteCertificateResponseType = z.TypeOf<
  typeof DeleteCertificateResponseSchema
>;

const CertificateSchema = z.object({
  certificateId: z.string(),
  expertProfileId: z.string(),
  certificateTypeId: z.string(),
  verifiedByAdminId: z.string().nullable(),
  fileUrl: z.string().url(),
  issueDate: z.string().datetime(),
  expirationDate: z.string().datetime(),
  status: z.number(),
  verifiedAt: z.string().datetime(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  expertProfile: z.null(),
  certificateType: z.null(),
});
export type CertificateType = z.TypeOf<typeof CertificateSchema>;

export const GetAllCertificatesResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(CertificateSchema),
  errors: z.array(z.any()),
  timestamp: z.string().datetime(),
});

export type GetAllCertificatesResponseType = z.TypeOf<
  typeof GetAllCertificatesResponseSchema
>;

export const CreateAvailableTimeSlotBody = z.object({
  availableDate: z.string().date(),
  startTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Invalid time format"),
  endTime: z
    .string()
    .regex(/^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/, "Invalid time format"),
});

export type CreateAvailableTimeSlotBodyType = z.TypeOf<
  typeof CreateAvailableTimeSlotBody
>;

export const CreateAvailableTimeSlotResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.string(),
  errors: z.array(z.any()),
  timestamp: z.string().datetime(),
});

export type CreateAvailableTimeSlotResponseType = z.TypeOf<
  typeof CreateAvailableTimeSlotResponseSchema
>;

const ExpertAvailabilitySchema = z.object({
  expertAvailabilityId: z.string(),
  expertProfileId: z.string(),
  availableDate: z.string().date(),
  startTime: z.string(),
  endTime: z.string(),
  status: z.number(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  expertProfile: z.null(),
  appointments: z.array(z.any()).optional(),
});

export type ExpertAvailabilityType = z.TypeOf<typeof ExpertAvailabilitySchema>;

export const GetExpertAvailabilityByExpertProfileIdResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(ExpertAvailabilitySchema),
  errors: z.array(z.any()),
  timestamp: z.string().datetime(),
});

export type GetExpertAvailabilityExpertProfileIdResponseType = z.TypeOf<
  typeof GetExpertAvailabilityByExpertProfileIdResponseSchema
>;
