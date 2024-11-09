"use client";

import { useAppContext } from "@/components/app-provider";
import { checkRefreshToken } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

// Các path không cần check refresh token
const UNAUTHENTICATED_PATHS = [
  "/login",
  "/logout",
  "/refresh-token",
  "/register",
];

export default function RefreshToken() {
  const pathname = usePathname();
  const router = useRouter();
  const { setIsAuth } = useAppContext();

  useEffect(() => {
    if (UNAUTHENTICATED_PATHS.includes(pathname)) return;
    let interval: any = null;

    // Phải gọi lần đâu tiên vì interval chỉ chạy sau thời gian TIMEOUT
    checkRefreshToken({
      onError: () => {
        clearInterval(interval);
        setIsAuth(false);
        router.push("/login");
      },
    });

    // TIMEOUT interval phải bé hơn thời gian accessToken hết hạn
    // Ví dụ thời gian hết hạn của access token là 10s thì chúng ta phải cho 1s check 1 lần
    const TIMEOUT = 10000;
    interval = setInterval(
      () =>
        checkRefreshToken({
          onError: () => {
            clearInterval(interval);
            setIsAuth(false);
            router.push("/login");
          },
        }),
      TIMEOUT
    );
    return () => {
      clearInterval(interval);
    };
  }, [pathname, router, setIsAuth]);

  return null;
}
