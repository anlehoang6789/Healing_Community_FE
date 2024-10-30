import { z } from "zod";

export const RegisterModeratorBody = z
  .object({
    email: z.string().email(),
    userName: z.string().min(6).max(100),
    password: z
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
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "Mật khẩu không khớp",
        path: ["confirmPassword"],
      });
    }
  });

export type RegisterModeratorBodyType = z.TypeOf<typeof RegisterModeratorBody>;
