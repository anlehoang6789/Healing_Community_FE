import NotificationItems from "@/components/notification/notificationItems";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bell, UserPlus, Users } from "lucide-react";
import React from "react";

export default function NotificationPopover() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="headerIcon"
          size="icon"
          className="rounded-full flex-shrink-0 border-gray-500 relative"
        >
          <Bell className="h-5 w-5" strokeWidth="1.5px" />
          <span className="absolute -top-0 -right-1 h-3 w-3 rounded-full bg-red-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mt-2 mr-4">
        <div className="p-4 text-2xl font-medium">Thông báo</div>
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
