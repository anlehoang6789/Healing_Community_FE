import { z } from "zod";

export const UserSchema = z.object({
  userId: z.string(),
  roleId: z.number(),
  userName: z.string(),
  email: z.string().email(),
  passwordHash: z.string(),
  profilePicture: z.string(),
  fullName: z.string().optional(),
  phoneNumber: z.string().optional(),
  descrtiption: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  status: z.number(),
  role: z.any().nullable(),
  tokens: z.array(z.any()),
  socialLinks: z.array(z.any()),
});

export type UserType = z.TypeOf<typeof UserSchema>;

export const GetUsersResponseSchema = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.array(UserSchema),
  errors: z.any().nullable(),
  timestamp: z.string(),
});

export type GetUsersResponseType = z.TypeOf<typeof GetUsersResponseSchema>;
