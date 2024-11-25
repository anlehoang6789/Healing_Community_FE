import { z } from "zod";

const CertificateSchema = z.object({
  certificateTypeId: z.string(),
  name: z.string(),
  description: z.string(),
  isMandatory: z.boolean(),
  certificates: z.array(z.unknown()),
});
export type CertificateSchemaType = z.TypeOf<typeof CertificateSchema>;

export const GetCertificateTypeResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(CertificateSchema),
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
  data: z.string().url(),
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
