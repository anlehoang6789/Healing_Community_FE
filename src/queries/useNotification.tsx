import { useQuery } from "@tanstack/react-query";
import notificationApiRequest from "@/apiRequests/notification";

export const useNotificationUnreadCount = () => {
  return useQuery({
    queryKey: ["notification", "unread-count"],
    queryFn: () => notificationApiRequest.getUnreadCount(),

    staleTime: 300000, //5 phút
    refetchInterval: 300000,
  });
};
