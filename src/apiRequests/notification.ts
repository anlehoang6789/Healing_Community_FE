import http from "@/lib/http";
import {
  GetNotificationListResponseType,
  UnreadCountResponseType,
} from "@/schemaValidations/notification.schema";

const notificationApiRequest = {
  getUnreadCount: () =>
    http.get<UnreadCountResponseType>(
      "notification/api/notification/unread-count"
    ),
  getNotification: () =>
    http.get<GetNotificationListResponseType>(
      "notification/api/notification/notifications"
    ),
  maskAsReadNotification: (notificationId: string) =>
    http.post<{ message: string }>(
      `notification/api/notification/mark-as-read/${notificationId}`,
      {}
    ),
};

export default notificationApiRequest;
