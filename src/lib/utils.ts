import { toast } from "@/hooks/use-toast";
import { EntityError } from "@/lib/http";
import { clsx, type ClassValue } from "clsx";
import { UseFormSetError } from "react-hook-form";
import { twMerge } from "tailwind-merge";
import jwt from "jsonwebtoken";
import authApiRequest from "@/apiRequests/auth";

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

export const getUserIdFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("userId") : null;
};

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

export const removeTokenFromLocalStorage = () => {
  isBrowser && localStorage.removeItem("accessToken");
  isBrowser && localStorage.removeItem("refreshToken");
};

export const checkRefreshToken = async (param?: {
  onError?: () => void;
  onSuccess?: () => void;
}) => {
  /**
   * Không nên đưa logic get access token và refresh token ra khỏi hàm 'checkRefreshToken'
   * Vì để mỗi lần mà hàm 'checkRefreshToken' chạy, nó sẽ luôn lấy được cái accessToken và refreshToken mới nhất
   * Nếu đưa ra ngoài, thì nó chỉ lấy được cái accessToken và refreshToken lúc đầu
   */
  const accessToken = getAccessTokenFromLocalStorage();
  const refreshToken = getRefreshTokenFromLocalStorage();

  // Chưa đăng nhập thì cũng kh cho chạy
  if (!accessToken || !refreshToken) return;

  const decodeAccessToken = jwt.decode(accessToken) as {
    exp: number;
    iat: number;
  };
  const decodeRefreshToken = jwt.decode(refreshToken) as {
    exp: number;
    iat: number;
  };

  //   Thời điểm hết hạn của token được tính theo epoch time(s)
  // Còn khi dùng cú pháp Date().getTime() thì nó trả về epoch time(ms)
  const now = new Date().getTime() / 1000 - 1;

  // Nếu refresh token hết hạn thì kh xử lí nữa
  if (now >= decodeRefreshToken.exp) {
    removeTokenFromLocalStorage();
    return param?.onError && param.onError();
  }

  //Ví dụ access token có thời gian hết hạn là 10s
  // Thì chúng ta sẽ kiểm tra còn 1/3 thời gian hết hạn của access token thì sẽ gửi request refresh token
  // Thời gian còn lại sẽ tính theo công thức: decodeAccessToken.exp - now
  //  Thời gian hết hạn của accessToken tính theo công thức: decodeAccessToken.exp - decodeAccessToken.iat
  if (
    decodeAccessToken.exp - now <
    (decodeAccessToken.exp - decodeAccessToken.iat) / 3
  ) {
    // Nếu thời gian còn lại ít hơn 1/3 thời gian hết hạn của access token thì call api refreshToken
    try {
      const result =
        await authApiRequest.refreshTokenFromNextClientToNextServer();
      setAccessTokenToLocalStorage(result.payload.data.token);
      setRefreshTokenToLocalStorage(result.payload.data.refreshToken);
      param?.onSuccess && param.onSuccess();
    } catch (error) {
      param?.onError && param.onError();
    }
  }
};

//format giá tiền
export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
};

//format lại ngày giờ (20/11/2024 12h30p)
export const formatDateTime = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const formatTime = (timeString: string) => {
  const date = new Date(timeString);
  const day = date.getUTCDate().toString().padStart(2, "0");
  const month = (date.getUTCMonth() + 1).toString().padStart(2, "0");
  const year = date.getUTCFullYear();
  const hours = date.getUTCHours().toString().padStart(2, "0");
  const minutes = date.getUTCMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};

export const getRoleFromLocalStorage = () => {
  return isBrowser ? localStorage.getItem("role") : null;
};

//format lại ngày (12/12/2024)
export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};
