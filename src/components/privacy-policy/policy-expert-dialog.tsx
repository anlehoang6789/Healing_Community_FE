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

export default function PolicyExpertDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="ml-2 h-5 w-5 text-textChat" />
      </DialogTrigger>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle className="text-textChat font-semibold text-center text-2xl">
            Điều khoản chuyên gia
          </DialogTitle>
          <DialogDescription className="text-muted-foreground text-center text-lg">
            Quy trình giúp chuyên gia làm việc với nền tảng Healing Community
          </DialogDescription>
        </DialogHeader>
        <div className="overflow-y-auto max-h-96 p-2">
          <h1 className="font-bold text-textChat">
            1. Đăng ký và bổ sung giấy phép
          </h1>
          <p className="pl-2 text-muted-foreground">
            Sau khi đăng ký thành công, chuyên gia cần bổ sung{" "}
            <span className="bg-yellow-300">các giấy phép cần thiết</span>,{" "}
            <span className="bg-yellow-300">thông tin cá nhân</span>,{" "}
            <span className="bg-yellow-300">thông tin ngân hàng</span> trước khi
            có thể tạo lịch tư vấn với người dùng.
          </p>
          <h1 className="font-bold text-textChat">
            2. Phê duyệt hồ sơ chuyên gia:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                Sau khi hồ sơ được duyệt thành công,Heling Community sẽ gửi
                email thông báo cho chuyên gia
              </li>
              <li>
                Hồ sơ của chuyên gia sẽ được hiển thị trên trang thông tin
                chuyên gia để người dùng có thể booking.
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            3. Tạo lịch trống và đặt lịch hẹn:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                <span className="font-semibold">Chuyên gia có thể</span> tạo các
                lịch trống (ngày, giờ) để người dùng có thể lựa chọn.
              </li>
              <li>
                <span className="font-semibold">Người dùng có thể</span> xem
                thông tin cá nhân của chuyên gia (bằng cấp, chứng chỉ, thông tin
                liên lạc, đánh giá, ...) và book lịch trực tiếp qua profile của
                chuyên gia.
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            4. Thanh toán và xác nhận lịch hẹn:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                Sau khi người dùng đặt lịch thành công, hệ thống sẽ tạo yêu cầu
                thanh toán, gửi thông tin QR hoặc liên kết thanh toán tích hợp
                để người dùng thanh toán.
              </li>
              <li>
                <span className="font-semibold">
                  Khi thanh toán thành công:
                </span>
                <ul>
                  <li>
                    {" "}
                    Hệ thống sẽ tự động tạo một link tư vấn(sử dụng Google Meet,
                    Jitsi Meet, hoặc các nền tảng tương đương) và thời gian cụ
                    thể cho buổi tư vấn.
                  </li>
                  <li>
                    {" "}
                    Hệ thống sẽ gửi email chứa thông tin buổi tư vấn (thời gian,
                    link họp,...) đến cả chuyên gia và người dùng để xác nhận.
                  </li>
                </ul>
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            5. Thực hiện và ghi hình buổi tư vấn:
          </h1>
          <p className="pl-2 text-muted-foreground">
            Trong buổi tư vấn,{" "}
            <span className="bg-yellow-300">
              Chuyên gia bắt buộc phải ghi hình
            </span>{" "}
            lại buổi tư vấn để làm bằng chứng nếu có tranh chấp, kiện cáo từ
            người dùng sau buổi tư vấn.
          </p>
          <h1 className="font-bold text-textChat">
            6. Hoàn tất và xử lý thanh toán:
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
            7. Xử lý báo cáo và tranh chấp:
          </h1>
          <p className="pl-2 text-muted-foreground">
            <ul>
              <li>
                Nếu có báo cáo từ người dùng, hệ thống sẽ gửi email yêu cầu
                chuyên gia cung cấp chứng cứ (link ghi hình buổi tư vấn...).
              </li>
              <li>
                Hệ thống sẽ duyệt và phản hồi cho người dùng, hoàn tiền nếu báo
                cáo là đúng sự thật trong khoảng từ 3 - 5 ngày.
              </li>
            </ul>
          </p>
          <h1 className="font-bold text-textChat">
            8. Đánh giá sau buổi tư vấn (Tùy chọn):
          </h1>
          <p className="pl-2 text-muted-foreground">
            Sau khi buổi tư vấn kết thúc, người dùng có thể đánh giá chất lượng
            buổi tư vấn với chuyên gia. Kết quả đánh giá sẽ giúp chuyên gia được
            đề cử và tăng uy tín trên nền tảng Healing Community.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
