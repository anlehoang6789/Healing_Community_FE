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
