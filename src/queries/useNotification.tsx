import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import notificationApiRequest from "@/apiRequests/notification";

export const useNotificationUnreadCount = () => {
  return useQuery({
    queryKey: ["unread-count"],
    queryFn: () => notificationApiRequest.getUnreadCount(),

    staleTime: 300000, //5 phút
    refetchInterval: 300000,
  });
};

export const useGetNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: notificationApiRequest.getNotification,
    refetchOnMount: true,
  });
};

export const useMaskAsReadNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationApiRequest.maskAsReadNotification,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["unread-count"],
      });
    },
  });
};
