export const TokenType = {
  ForgotPasswordToken: "ForgotPasswordToken",
  AccessToken: "AccessToken",
  RefreshToken: "RefreshToken",
} as const;

export const Role = {
  Admin: "Admin",
  Registered_User: "Registered_User",
  Moderator: "Moderator",
  Guest: "Guest",
} as const;

export const RoleValues = [
  Role.Admin,
  Role.Registered_User,
  Role.Moderator,
  Role.Guest,
] as const;
