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
  data: z.string().url(),
});

export type UploadFileForExpertResponseType = z.TypeOf<
  typeof UploadFileForExpertResponse
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
