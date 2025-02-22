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

export const PersonalInformationSchema = z.object({
  fullName: z.string().min(3).max(15),
  userName: z.string(),
  email: z.string(),
  phoneNumber: z.string().min(10).max(10),
  profilePicture: z.string(),
  descrtiption: z.string().max(1000),
  createdAt: z.string(),
  socialLink: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedIn: z.string().optional(),
  }),
});
export type PersonalInformationSchemaType = z.TypeOf<
  typeof PersonalInformationSchema
>;

// personal information body
export const PersonalInformationBody = z
  .object({
    data: PersonalInformationSchema,
    message: z.string(),
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

export const ForgotPasswordBody = z
  .object({
    email: z.string().email(),
  })
  .strict();

export type ForgotPasswordBodyType = z.TypeOf<typeof ForgotPasswordBody>;

export const ResetPasswordWithOtpBody = z
  .object({
    email: z.string().email(),
    otp: z.string(),
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

export type ResetPasswordWithOtpBodyType = z.TypeOf<
  typeof ResetPasswordWithOtpBody
>;

export const UpdateProfileUserBody = z.object({
  fullName: z.string().max(15),
  phoneNumber: z.string().max(10),
  profilePictureUrl: z.string().optional(),
  descrtiption: z.string().max(1000),
  socialLink: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedIn: z.string().optional(),
  }),
});
export type UpdateProfileUserBodyType = z.TypeOf<typeof UpdateProfileUserBody>;

export const UpdateAvatarProfileBody = z.object({
  data: z.string(),
  message: z.string(),
});
export type UpdateAvatarProfileBodyType = z.TypeOf<
  typeof UpdateAvatarProfileBody
>;

export const GetFollowingSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  email: z.string(),
  phoneNumber: z.string(),
  fullName: z.string(),
  profilePicture: z.string(),
  descrtiption: z.string(),
  socialLink: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    linkedIn: z.string().optional(),
  }),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetFollowingSchemaType = z.TypeOf<typeof GetFollowingSchema>;

export const GetFollowingRes = z.object({
  data: z.array(GetFollowingSchema),
  message: z.string(),
});

export type GetFollowingResType = z.TypeOf<typeof GetFollowingRes>;

export const FollowUserBody = z.object({
  followerId: z.string(),
});

export type FollowUserBodyType = z.TypeOf<typeof FollowUserBody>;

export const FollowUserRes = z.object({
  message: z.string(),
  data: z.string(),
});

export type FollowUserResType = z.TypeOf<typeof FollowUserRes>;

export const BankInformationBody = z.object({
  bankName: z.string(),
  bankAccountNumber: z.string(),
  bankAccountName: z.string(),
});

export type BankInformationBodyType = z.TypeOf<typeof BankInformationBody>;

export const GetBankNameSchema = z.object({
  id: z.number(),
  name: z.string(),
  shortName: z.string(),
  logo: z.string(),
  isTransfer: z.number(),
  bin: z.string(),
});

export type GetBankNameSchemaType = z.TypeOf<typeof GetBankNameSchema>;

export const GetBankNameListRes = z.object({
  data: z.array(GetBankNameSchema),
  desc: z.string(),
});

export type GetBankNameListResType = z.TypeOf<typeof GetBankNameListRes>;

export const GetPaymentInformationSchema = z.object({
  paymentInfoId: z.string(),
  userId: z.string(),
  bankName: z.string(),
  bankAccountNumber: z.string(),
  bankAccountName: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type GetPaymentInformationSchemaType = z.TypeOf<
  typeof GetPaymentInformationSchema
>;

export const GetPaymentInformationRes = z.object({
  data: GetPaymentInformationSchema,
  message: z.string(),
});

export type GetPaymentInformationResType = z.TypeOf<
  typeof GetPaymentInformationRes
>;

export const GetFollowerCountRes = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.object({
    userId: z.string(),
    followerCount: z.number(),
  }),
  errors: z.nullable(z.any()),
  timestamp: z.string(),
});

export type GetFollowerCountResType = z.TypeOf<typeof GetFollowerCountRes>;

export const GetFollowingCountRes = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.object({
    userId: z.string(),
    followingCount: z.number(),
  }),
  errors: z.nullable(z.any()),
  timestamp: z.string(),
});

export type GetFollowingCountResType = z.TypeOf<typeof GetFollowingCountRes>;

export const GetRegistrationCountRes = z.object({
  id: z.string(),
  statusCode: z.number(),
  message: z.string(),
  success: z.boolean(),
  data: z.object({
    userId: z.string(),
    totalDays: z.number(),
  }),
  errors: z.nullable(z.any()),
  timestamp: z.string(),
});

export type GetRegistrationCountResType = z.TypeOf<
  typeof GetRegistrationCountRes
>;
