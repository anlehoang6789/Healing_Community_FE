import {
  LogoutBodyType,
  RefreshTokenBodyType,
  RefreshTokenResType,
} from "./../schemaValidations/auth.schema";
import http from "@/lib/http";
import {
  LoginBodyType,
  LoginResType,
  RegisterBodyType,
} from "@/schemaValidations/auth.schema";

const authApiRequest = {
  refreshTokenRequest: null as Promise<{
    status: number;
    payload: RefreshTokenResType;
  }> | null,
  loginFromNextServerToBeServer: (body: LoginBodyType) =>
    http.post<LoginResType>("user/api/user/login", body),
  loginFromNextClientToNextServer: (body: LoginBodyType) =>
    http.post<LoginResType>("/api/auth/login", body, {
      baseUrl: "",
    }),
  registerUser: (body: RegisterBodyType) =>
    http.post<{ message: string }>("user/api/user/register-user", body),
  logoutFromNextServerToBeServer: (
    body: LogoutBodyType & {
      accessToken: string;
    }
  ) =>
    http.post<{ message: string }>(
      "user/api/user/logout",
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
  refreshTokenFromNextServerToBeServer: (body: RefreshTokenBodyType) =>
    http.post<RefreshTokenResType>("user/api/token/refresh-token", body),

  // API này được xử lí để nó không bị call 2 lần. Tránh trường hợp chuyển trang nhanh quá nó chưa kịp gắn cái access token và refresh token mới để call cái refreshToken lần nữa mà nó lại đi lấy cái cũ để gửi lại
  async refreshTokenFromNextClientToNextServer() {
    if (this.refreshTokenRequest) {
      return this.refreshTokenRequest;
    }
    this.refreshTokenRequest = http.post<RefreshTokenResType>(
      "api/auth/refresh-token",
      null,
      {
        baseUrl: "",
      }
    );
    const result = await this.refreshTokenRequest;
    this.refreshTokenRequest = null;
    return result;
  },
};

export default authApiRequest;
