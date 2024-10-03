import { z } from "zod";

// change password body
export const ChangePasswordBody = (registeredPassword: string) =>
  z
    .object({
      currentPassword: z.string().min(8).max(100),
      newPassword: z
        .string()
        .min(8)
        .max(100)
        .regex(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
          "Mật khẩu phải có ít nhất 1 chữ Hoa, 1 chữ thường, 1 số và 1 kí tự đặc biệt"
        ),
      confirmNewPassword: z.string().min(8).max(100),
    })
    .strict()
    .superRefine(
      ({ currentPassword, newPassword, confirmNewPassword }, ctx) => {
        if (currentPassword !== registeredPassword) {
          ctx.addIssue({
            code: "custom",
            message: "Mật khẩu hiện tại không chính xác",
            path: ["currentPassword"],
          });
        }
        if (newPassword !== confirmNewPassword) {
          ctx.addIssue({
            code: "custom",
            message: "Mật khẩu mới không khớp",
            path: ["confirmNewPassword"],
          });
        }
      }
    );

export type ChangePasswordBodyType = z.TypeOf<
  ReturnType<typeof ChangePasswordBody>
>;

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
