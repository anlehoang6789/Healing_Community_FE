// import { Role } from '@/constants/type'
import z from "zod";

//body login
export const LoginBody = z
  .object({
    email: z.string().email(),
    password: z.string().min(6).max(100),
  })
  .strict();

export type LoginBodyType = z.TypeOf<typeof LoginBody>;

//response login
export const LoginRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
    // account: z.object({
    //   id: z.number(),
    //   name: z.string(),
    //   email: z.string(),
    //   role: z.enum([Role.Registered_User, Role.Moderator, Role.Admin])
    // })
  }),
  message: z.string(),
});

export type LoginResType = z.TypeOf<typeof LoginRes>;

//body refresh token
export const RefreshTokenBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type RefreshTokenBodyType = z.TypeOf<typeof RefreshTokenBody>;

//response refresh token
export const RefreshTokenRes = z.object({
  data: z.object({
    accessToken: z.string(),
    refreshToken: z.string(),
  }),
  message: z.string(),
});

export type RefreshTokenResType = z.TypeOf<typeof RefreshTokenRes>;

//body logout
export const LogoutBody = z
  .object({
    refreshToken: z.string(),
  })
  .strict();

export type LogoutBodyType = z.TypeOf<typeof LogoutBody>;

//body login google
export const LoginGoogleQuery = z.object({
  code: z.string(),
});

export type LoginGoogleQueryType = z.TypeOf<typeof LoginGoogleQuery>;

//body register
export const RegisterBody = z
  .object({
    email: z.string().email(),
    username: z.string().min(6).max(100),
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

export type RegisterBodyType = z.TypeOf<typeof RegisterBody>;
