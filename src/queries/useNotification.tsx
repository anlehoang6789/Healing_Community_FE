import { useQuery } from "@tanstack/react-query";
import notificationApiRequest from "@/apiRequests/notification";

export const useNotificationUnreadCount = () => {
  return useQuery({
    queryKey: ["notification", "unread-count"],
    queryFn: () => notificationApiRequest.getUnreadCount(),

    staleTime: 5000,
    refetchInterval: 3000,
  });
};
