import { NextResponse, type NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { Role } from "@/constants/type";

const userPaths = [
  "/consultation-calendar",
  "/psychological-test",
  "/test-result",
];
const expertPaths = ["/expert"];
const userAndExpertPaths = ["/chat", "/user"];
const adminPaths = ["/admin"];
const moderatorPaths = ["/moderator"];
const privatePaths = [
  ...userPaths,
  ...expertPaths,
  ...userAndExpertPaths,
  ...adminPaths,
  ...moderatorPaths,
];
const unAuthPaths = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  // chỉ chơi với server component nên ta check trạng thái đăng nhập bằng cookie
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const decodeToken = accessToken
    ? (jwt.decode(accessToken) as { [key: string]: any })
    : null;
  const role = decodeToken
    ? decodeToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ]
    : null;
  // console.log("role", role);

  /// Chưa đăng nhập thì kh cho vào private path -> chưa đăng nhập thì kh có refreshToken
  if (privatePaths.some((path) => pathname.startsWith(path)) && !refreshToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("clearToken", "true");
    return NextResponse.redirect(url);
  }

  // Đã đăng nhập thì không cho vào các đường dẫn unAuthPaths
  if (unAuthPaths.some((path) => pathname.startsWith(path)) && refreshToken) {
    return NextResponse.redirect(new URL("/content", request.url));
  }

  // Nếu đã đăng nhập, không cho truy cập đúng đường dẫn "/" (landing-page)
  if (pathname === "/" && refreshToken) {
    return NextResponse.redirect(new URL("/content", request.url));
  }

  //Nếu đã đăng nhập thì bắt đầu check role để nó không cho vào các đường dẫn không phù hợp với role
  if (privatePaths.some((path) => pathname.startsWith(path))) {
    // Chỉ User được truy cập userPaths
    if (
      userPaths.some((path) => pathname.startsWith(path)) &&
      role !== Role.User
    ) {
      return NextResponse.redirect(new URL("/content", request.url));
    }

    // Chỉ Expert được truy cập expertPaths
    if (
      expertPaths.some((path) => pathname.startsWith(path)) &&
      role !== Role.Expert
    ) {
      return NextResponse.redirect(new URL("/content", request.url));
    }

    // Chỉ User và Expert được truy cập userAndExpertPaths
    if (
      userAndExpertPaths.some((path) => pathname.startsWith(path)) &&
      role !== Role.User &&
      role !== Role.Expert
    ) {
      return NextResponse.redirect(new URL("/content", request.url));
    }
  }

  // Nếu đang ở trong private path mà không có accessToken(hết hạn accessToken) thì chuyển hướng về trang logout
  // khi gặp tình trạng lâu ngày vào lại web mà mất accessToken thì check nếu mà còn refreshToken thì gọi api để lấy cặp token mới và redirect về cái url mà người dùng đang muốn vào
  if (
    privatePaths.some((path) => pathname.startsWith(path)) &&
    !accessToken &&
    refreshToken
  ) {
    const url = new URL("/refresh-token", request.url);
    url.searchParams.set("refreshToken", refreshToken);

    url.searchParams.set("redirect", pathname);

    return NextResponse.redirect(url);
  }

  // Nếu không phải trường hợp trên thì cho qua (diễn ra tự nhiên đó)
  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    "/user/:path*",
    "/expert/:path*",
    "/register",
    "/login",
    "/",
    "/chat",
    "/consultation-calendar",
    "/psychological-test",
    "/test-result",
  ],
};
