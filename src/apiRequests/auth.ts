import { LogoutBodyType } from "./../schemaValidations/auth.schema";
import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  loginFromNextServerToBeServer: (body: LoginBodyType) =>
    http.post<LoginResType>("user/login", body),
  loginFromNextClientToNextServer: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    }),
  registerUser: (body: RegisterBodyType) =>
    http.post<{ message: string }>("user/register-user", body),
  logoutFromNextServerToBeServer: (
    body: LogoutBodyType & {
      accessToken: string;
    }
  ) =>
    http.post<{ message: string }>(
      "user/logout",
      {
        refreshToken: body.refreshToken,
      },
      {
        headers: {
          Authorization: `Bearer ${body.accessToken}`,
        },
      }
    ),
  logoutFromNextClientToNextServer: () =>
    http.post("api/auth/logout", null, {
      baseUrl: "",
    }),
};

export default authApiRequest;
