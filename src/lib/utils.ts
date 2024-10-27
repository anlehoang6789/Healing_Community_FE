import { toast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/http";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Delete the first `/` character of the path
 */
export const normalizePath = (path: string) => {
  return path.startsWith("/") ? path.slice(1) : path;
};

export const handleErrorApi = ({
  error,
  setError,
  duration,
}: {
  error: any;
  setError?: UseFormSetError<any>;
  duration?: number;
}) => {
  if (error instanceof EntityError && setError) {
    // Kiểm tra `errors` là mảng chuỗi hay mảng đối tượng
    if (Array.isArray(error.payload.errors)) {
      // Nếu là mảng chuỗi, hiển thị lỗi mảng chuỗi nếu có
      if (typeof error.payload.errors[0] === "string") {
        toast({
          title: "Đã xảy ra lỗi",
          description: error.payload.errors.join(", "),
          variant: "destructive",
          duration: duration ?? 5000,
        });
      } else {
        // Xử lý lỗi `errors` dạng đối tượng
        error.payload.errors.forEach((err) => {
          // Kiểm tra nếu err là một đối tượng
          if (typeof err === "object" && err !== null) {
            setError(err.field as "email" | "password", {
              type: "server",
              message: err.message,
            });
          }
        });
      }
    }
  } else {
    // Lấy `message` từ `payload` hoặc `error.message` nếu `payload.message` không có
    const errorMessage =
      error?.payload?.message ||
      error.message ||
      "Đã xảy ra lỗi không xác định";
    toast({
      title: "Đã xảy ra lỗi",
      description: errorMessage,
      variant: "destructive",
      duration: duration ?? 5000,
    });
  }
};

const isBrowser = typeof window !== "undefined";

export const getAccessTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("accessToken") : null;
};

export const getRefreshTokenFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("refreshToken") : null;
};

export const setAccessTokenToLocalStorage = (accessToken: string) => {
  isBrowser && localStorage.setItem("accessToken", accessToken);
};

export const setRefreshTokenToLocalStorage = (refreshToken: string) => {
  isBrowser && localStorage.setItem("refreshToken", refreshToken);
};
