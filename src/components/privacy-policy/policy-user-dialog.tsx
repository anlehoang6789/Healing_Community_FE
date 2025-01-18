import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CircleHelp } from "lucide-react";
import React from "react";

export default function PolicyUserDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="ml-2 h-5 w-5 text-textChat" />
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-textChat font-semibold text-center text-2xl">
            Điều khoản người dùng
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-lg">
            Quy trình giúp người dùng làm việc với nền tảng Healing Community
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-96 p-2">
          <h1 className="font-bold text-textChat">
            1. Cập nhật thông tin ngân hàng:
          </h1>
          <p className="pl-2 text-muted-foreground">
            Người dùng cần cập nhật{" "}
            <span className="bg-yellow-300">thông tin ngân hàng</span> trong hồ
            sơ trước khi có thể đặt lịch tư vấn với chuyên gia.
          </p>
          <h1 className="font-bold text-textChat">
            2. Thanh toán và xác nhận lịch hẹn:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                Sau khi người dùng đặt lịch thành công, hệ thống sẽ tạo yêu cầu
                thanh toán, gửi thông tin QR hoặc liên kết thanh toán tích hợp
                để người dùng hoàn tất thanh toán.
              </li>
              <li>
                <span className="font-semibold">
                  Khi thanh toán thành công:
                </span>
                <ul>
                  <li>
                    Hệ thống sẽ tự động tạo một link tư vấn (sử dụng Google
                    Meet, Jitsi Meet, hoặc các nền tảng tương đương) và thông
                    báo thời gian cụ thể.
                  </li>
                  <li>
                    Thông tin buổi tư vấn (thời gian, link họp, ...) sẽ được gửi
                    qua email đến cả chuyên gia và người dùng để xác nhận.
                  </li>
                </ul>
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            3. Hoàn tất và xử lý thanh toán:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                Buổi tư vấn sẽ được xem là hoàn thành nếu không có phản hồi hay
                báo cáo nào từ người dùng trong vòng{" "}
                <span className="font-semibold">3 ngày</span>.
              </li>
              <li>
                Tiền sẽ được chuyển từ hệ thống đến chuyên gia sau khi đã trừ
                phí nền tảng <span className="bg-yellow-300">(2%)</span>.
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            4. Xử lý báo cáo và tranh chấp:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                Nếu người dùng gặp vấn đề, có thể gửi báo cáo thông qua hệ
                thống.
              </li>
              <li>
                Hệ thống sẽ xử lý báo cáo, yêu cầu chuyên gia cung cấp chứng cứ
                (ghi hình buổi tư vấn...), và đưa ra kết quả trong vòng{" "}
                <span className="font-semibold">3-5 ngày</span>.
              </li>
              <li>
                Nếu báo cáo chính xác, người dùng sẽ được hoàn tiền và chuyên
                gia sẽ bị trừ{" "}
                <span className="bg-yellow-300">0.1 điểm sao</span>.
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            5. Đánh giá sau buổi tư vấn (Tùy chọn):
          </h1>
          <p className="pl-2 text-muted-foreground">
            Người dùng có thể đánh giá chất lượng buổi tư vấn sau khi kết thúc.
            Đánh giá sẽ giúp chuyên gia cải thiện uy tín và khả năng được đề cử
            trên nền tảng.
          </p>
          <h1 className="font-bold text-textChat">
            6. Người dùng hủy lịch tư vấn (Tùy chọn):
          </h1>
          <p className="pl-2 text-muted-foreground">
            Người dùng có thể{" "}
            <span className="text-red-500 font-bold">hủy</span> lịch tư vấn nếu
            thời gian bắt đầu của buổi tư vấn sau thời điểm hiện tại{" "}
            <span className="font-bold">24 giờ</span>. Tuy nhiên, nếu hủy lịch
            gần sát giờ hoặc thường xuyên, hệ thống có thể áp dụng các biện pháp
            hạn chế để đảm bảo quyền lợi của chuyên gia.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
