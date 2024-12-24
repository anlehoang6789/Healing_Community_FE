import { Globe, Eye, Clock, Tag, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

export default function GroupAbout() {
  return (
    <Card className="bg-background text-textChat p-6 max-w-4xl mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4 pb-4 border-b-2">
        Giới thiệu về nhóm này
      </h2>

      <div className="space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <p className="text-muted-foreground">
            J2TEAM Community là nhóm cộng đồng dành cho người dùng Samsung J2
            những bạn yêu mến J2TEAM và JUNO_OKYO.
          </p>
        </div>

        {/* Info Items */}
        <div className="space-y-6">
          {/* Public Status */}
          <div className="flex gap-3">
            <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Công khai</div>
              <div className="text-muted-foreground text-sm">
                Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì
                họ đăng.
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex gap-3">
            <Eye className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Hiển thị</div>
              <div className="text-muted-foreground text-sm">
                Ai cũng có thể tìm thấy nhóm này.
              </div>
            </div>
          </div>

          {/* History */}
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Lịch sử</div>
              <div className="text-muted-foreground text-sm">
                Đã tạo nhóm vào 6 tháng 10, 2016. Lần gần nhất đổi tên là vào 3
                tháng 3, 2017.
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-3">
            <Tag className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Thẻ</div>
              <div className="text-muted-foreground text-sm">
                Kỹ năng học tập • Công nghệ
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex gap-3">
            <MapPin className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Việt Nam - Hà Nội</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
