"use client";
import {
  Globe,
  Eye,
  Clock,
  ContactRound,
  ShieldCheck,
  LockKeyhole,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useGetGroupDetailsByGroupIdQuery } from "@/queries/useGroup";
import { formatDateTime } from "@/lib/utils";

export default function GroupAbout() {
  const params = useParams();
  const groupIdFromPath = params.groupId as string;
  //data group detail
  const { data: groupDetails } = useGetGroupDetailsByGroupIdQuery({
    groupId: groupIdFromPath,
  });
  return (
    <Card className="bg-background text-textChat p-6 max-w-4xl mx-auto my-6">
      <h2 className="text-xl font-semibold mb-4 pb-4 border-b-2">
        Giới thiệu về nhóm này
      </h2>

      <div className="space-y-6">
        {/* Description */}
        <div className="space-y-2">
          <p className="text-muted-foreground">
            {groupDetails?.payload.data.description}
          </p>
        </div>

        {/* Info Items */}
        <div className="space-y-6">
          {/* Public Status */}
          <div className="flex gap-3">
            {groupDetails?.payload.data.groupVisibility === 0 ? (
              <Globe className="w-5 h-5 text-muted-foreground shrink-0" />
            ) : (
              <LockKeyhole className="w-5 h-5 text-muted-foreground shrink-0" />
            )}
            <div>
              <div className="font-semibold">
                {groupDetails?.payload.data.groupVisibility === 0
                  ? "Công khai"
                  : "Riêng tư"}
              </div>
              <div className="text-muted-foreground text-sm">
                {groupDetails?.payload.data.groupVisibility === 0
                  ? "Bất kỳ ai cũng có thể nhìn thấy mọi người trong nhóm và những gì họ đăng."
                  : "Chỉ những người đã tham gia nhóm mới có thể nhìn thấy ai đang ở trong nhóm và những gì họ đăng."}
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="flex gap-3">
            <Eye className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Hiển thị</div>
              <div className="text-muted-foreground text-sm">
                {groupDetails?.payload.data.groupVisibility === 0
                  ? "Ai cũng có thể tìm thấy nhóm này."
                  : "Chỉ những người đã tham gia nhóm mới có thể tìm thấy nhóm này."}
              </div>
            </div>
          </div>

          {/* History */}
          <div className="flex gap-3">
            <Clock className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Lịch sử</div>
              <div className="text-muted-foreground text-sm">
                Đã tạo nhóm vào{" "}
                {formatDateTime(groupDetails?.payload.data.createdAt as string)}
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="flex gap-3">
            <ContactRound className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Giới hạn thành viên</div>
              <div className="text-muted-foreground text-sm">
                {groupDetails?.payload.data.memberLimit} thành viên
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="flex gap-3">
            <ShieldCheck className="w-5 h-5 text-muted-foreground shrink-0" />
            <div>
              <div className="font-semibold">Trạng thái phê duyệt</div>
              <div className="text-muted-foreground text-sm">
                {groupDetails?.payload.data.isAutoApprove
                  ? "Có phê duyệt"
                  : "Không phê duyệt"}{" "}
                thành viên
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
