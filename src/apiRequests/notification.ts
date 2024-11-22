import http from "@/lib/http";
import { UnreadCountResponseType } from "@/schemaValidations/notification.schema";

const notificationApiRequest = {
  getUnreadCount: () =>
    http.get<UnreadCountResponseType>(
      "notification/api/notification/unread-count"
    ),
};

export default notificationApiRequest;
