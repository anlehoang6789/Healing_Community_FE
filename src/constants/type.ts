export const TokenType = {
  ForgotPasswordToken: "ForgotPasswordToken",
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
} as const;

export const Role = {
  Admin: "Admin",
  User: "User",
  Moderator: "Moderator",
  Guest: "Guest",
  Expert: "Expert",
} as const;

export const RoleValues = [
  Role.Admin,
  Role.User,
  Role.Moderator,
  Role.Guest,
  Role.Expert,
] as const;

export const PaymentHistoryStatus = {
  0: "Pending",
  1: "Paid",
  2: "Failed",
  3: "Cancelled",
  4: "Unknown",
} as const;

export type RoleType = (typeof Role)[keyof typeof Role];
