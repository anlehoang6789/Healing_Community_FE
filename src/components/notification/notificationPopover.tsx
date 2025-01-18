import NotificationItems from "@/components/notification/notificationItems";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetNotification,
  useNotificationUnreadCount,
} from "@/queries/useNotification";
import { Bell, UserPlus, Users } from "lucide-react";
import React from "react";

export default function NotificationPopover() {
  // Sử dụng hook để lấy số lượng thông báo chưa đọc
  const { data: unreadCountResponse } = useNotificationUnreadCount();

  // Lấy số lượng thông báo chưa đọc từ payload, mặc định là 0 nếu undefined
  const unreadCount = unreadCountResponse?.payload?.data ?? 0;
  const { data: notifications } = useGetNotification();
  const notificationList = notifications?.payload.data || [];
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="headerIcon"
          size="icon"
          className="rounded-full flex-shrink-0 border-gray-500 relative"
        >
          <Bell className="h-5 w-5" strokeWidth="1.5px" />
          {/* Hiển thị số thông báo chưa đọc nếu > 0 */}
          {unreadCount > 0 && (
            <span className="absolute -top-0 -right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              {unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mt-2 mr-4 bg-backgroundChat">
        <div className="p-4 text-2xl font-bold text-muted-foreground">
          Thông báo
        </div>
        <ScrollArea className="h-[300px]">
          {notificationList.map((item) => (
            <div className="grid gap-4 p-4" key={item.notificationId}>
              <NotificationItems
                createdAt={item.createdAt}
                isRead={item.isRead}
                message={item.message}
                postId={item.postId}
                icon={<Users className="h-4 w-4" />}
                notificationTypeId={item.notificationTypeId}
                notificationId={item.notificationId}
                userId={item.userId}
              />
            </div>
          ))}
        </ScrollArea>
        {/* <div className="mt-2 text-xs text-right text-muted-foreground cursor-pointer hover:underline hover:text-blue-500">
          Xem tất cả thông báo
        </div> */}
      </PopoverContent>
    </Popover>
  );
}
