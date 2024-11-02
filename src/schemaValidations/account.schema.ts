import { z } from "zod";

// change password body
export const ChangePasswordBody = z
  .object({
    oldPassword: z.string().min(8).max(100),
    newPassword: z
      .string()
      .min(8)
      .max(100)
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "Mật khẩu phải có ít nhất 1 chữ Hoa, 1 chữ thường, 1 số và 1 kí tự đặc biệt"
      ),
    confirmPassword: z.string().min(8).max(100),
  })
  .strict()
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (newPassword !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu mới không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type ChangePasswordBodyType = z.TypeOf<typeof ChangePasswordBody>;

// personal information body
export const PersonalInformationBody = z
  .object({
    displayName: z.string().min(3).max(15),
    username: z.string().min(1).max(12),
    description: z.string().max(1000),
    twitterLink: z.string(),
    facebookLink: z.string(),
    instagramLink: z.string(),
    linkedinLink: z.string(),
  })
  .strict();

export type PersonalInformationBodyType = z.TypeOf<
  typeof PersonalInformationBody
>;

export const UpdateInformationModeratorBody = z
  .object({
    name: z.string().trim().min(2).max(256),
    avatar: z.string().url().optional(),
  })
  .strict();

export type UpdateInformationModeratorBodyType = z.TypeOf<
  typeof UpdateInformationModeratorBody
>;
