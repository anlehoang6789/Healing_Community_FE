"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useAddReportPostMutation } from "@/queries/useReport";

const reportReasons = [
  { id: 1, label: "Ngôn từ không phù hợp" },
  { id: 2, label: "Chỉ là tôi không thích nội dung này" },
  { id: 3, label: "Thông tin sai lệch" },
  { id: 4, label: "Vi phạm quy tắc cộng đồng" },
];

export default function ReportPostSection({
  postId,
  isOpen,
  setIsOpen,
}: {
  postId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const { theme } = useTheme();
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const reportPostMutation = useAddReportPostMutation();
  const handleSubmit = async () => {
    if (reportPostMutation.isPending) return;
    if (selectedReason === null) {
      toast({
        description: "Vui lòng chọn lý do báo cáo.",
        variant: "destructive",
      });
      return;
    }
    try {
      const result = await reportPostMutation.mutateAsync({
        postId,
        reportTypeEnum: selectedReason,
      });
      toast({
        description: result.payload.message,
        variant: "success",
      });
      setIsOpen(false);
      setSelectedReason(null);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-6 w-[400px] text-textChat">
        <DialogHeader>
          <DialogTitle>Báo cáo bài viết</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-sm text-textChat mb-3">Chọn lý do báo cáo:</p>
          <RadioGroup
            value={selectedReason !== null ? selectedReason.toString() : ""}
            onValueChange={(value) => setSelectedReason(Number(value))}
            className="space-y-2"
          >
            {reportReasons.map((reason) => (
              <div key={reason.id} className="flex items-center space-x-2">
                <RadioGroupItem
                  className={`h-4 w-4  ${
                    theme === "dark" ? "text-white border-gray-300" : ""
                  }`}
                  value={reason.id.toString()}
                  id={`reason-${reason.id}`}
                />
                <label
                  htmlFor={`reason-${reason.id}`}
                  className="text-sm text-textChat"
                >
                  {reason.label}
                </label>
              </div>
            ))}
          </RadioGroup>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={reportPostMutation.isPending}
          >
            {reportPostMutation.isPending ? "Đang gửi..." : "Gửi báo cáo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
