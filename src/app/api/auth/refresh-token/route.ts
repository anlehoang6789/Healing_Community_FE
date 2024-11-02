import authApiRequest from "@/apiRequests/auth";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value;
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!refreshToken || !accessToken) {
    return Response.json(
      { message: "Không tìm thấy refreshToken hoặc accessToken" },
      { status: 401 }
    );
  }

  try {
    // response lấy về sau khi call api login của BE server
    const { payload } =
      await authApiRequest.refreshTokenFromNextServerToBeServer({
        refreshToken,
        accessToken,
      });
    //decode access token and refresh token to get the expired time
    const decodeAccessToken = jwt.decode(payload.data.token) as {
      exp: number;
    };

    cookieStore.set("accessToken", payload.data.token, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
      expires: decodeAccessToken.exp * 1000,
    });
    cookieStore.set("refreshToken", payload.data.refreshToken, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      secure: true,
    });
    return Response.json(payload);
  } catch (error: any) {
    return Response.json(
      { message: error.message ?? "Đã có lỗi xảy ra" },
      { status: 401 }
    );
  }
}
