import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { CircleHelp } from "lucide-react";
import React from "react";

export default function DialogExpertInfo() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <CircleHelp className="w-6 h-6 text-muted-foreground" />
      </DialogTrigger>
      <DialogContent className="max-w-md ">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <h3 className="text-center font-bold text-red-500 text-lg">Lưu ý</h3>
        <Separator />
        <p className="text-textChat text-center">
          Bạn cần cập nhật{" "}
          <span className="text-yellow-500">thông tin cá nhân</span> và bổ sung
          các <span className="text-yellow-500">chứng chỉ cá nhân</span> trước
          khi tạo lịch tư vấn
        </p>
      </DialogContent>
    </Dialog>
  );
}
