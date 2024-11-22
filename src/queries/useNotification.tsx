import { useQuery } from "@tanstack/react-query";
import notificationApiRequest from "@/apiRequests/notification";

export const useNotificationUnreadCount = () => {
  return useQuery({
    queryKey: ["notification", "unread-count"],
    queryFn: () => notificationApiRequest.getUnreadCount(),
    // Tùy chọn cấu hình thêm
    staleTime: 5000, // Dữ liệu sẽ được coi là fresh trong 5 giây
    refetchInterval: 3000, // Tự động refetch sau 30 giây
  });
};
