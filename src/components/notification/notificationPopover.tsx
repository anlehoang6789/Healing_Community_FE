import NotificationItems from "@/components/notification/notificationItems";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotificationUnreadCount } from "@/queries/useNotification";
import { Bell, UserPlus, Users } from "lucide-react";
import React from "react";

export default function NotificationPopover() {
  // Sử dụng hook để lấy số lượng thông báo chưa đọc
  const { data: unreadCountResponse } = useNotificationUnreadCount();

  // Lấy số lượng thông báo chưa đọc từ payload, mặc định là 0 nếu undefined
  const unreadCount = unreadCountResponse?.payload?.data ?? 0;
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
          <div className="grid gap-4 p-4">
            <NotificationItems
              icon={<UserPlus className="h-4 w-4" />}
              title="Nguyễn Trọng Nghĩa đã bình luận một câu chuyện mà bạn đã đăng."
              time="5 giờ"
              unread={true}
            />
            <NotificationItems
              icon={<Users className="h-4 w-4" />}
              title="Nguyễn Hùng Nghĩa vừa theo dõi bạn"
              time="2 ngày"
              unread={true}
            />
            <NotificationItems
              icon={<Bell className="h-4 w-4" />}
              title="Chúng tôi nhận thấy có lượt đăng nhập mới từ thiết bị/vị trí mà bạn không hay dùng. Vui lòng xem lại."
              time="1 tuần"
            />
            <NotificationItems
              icon={<Users className="h-4 w-4" />}
              title='Hà Gia Minh vừa đăng một câu chuyện mới"'
              time="Ngay lúc này"
            />
            <NotificationItems
              icon={<Users className="h-4 w-4" />}
              title="Thành Đạt vừa phản hồi một comment của bạn"
              time="Ngay lúc này"
            />
          </div>
        </ScrollArea>
        <div className="mt-2 text-xs text-right text-muted-foreground cursor-pointer hover:underline hover:text-blue-500">
          Xem tất cả thông báo
        </div>
      </PopoverContent>
    </Popover>
  );
}
