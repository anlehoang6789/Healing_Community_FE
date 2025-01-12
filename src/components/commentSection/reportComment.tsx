"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";

import { handleErrorApi } from "@/lib/utils";
import { useReportCommentMutation } from "@/queries/usePost";
import { Flag } from "lucide-react";
import { useTheme } from "next-themes";

interface ReportCommentProps {
  commentId: string;
}

const reportReasons = [
  { id: 0, label: "Ngôn từ không phù hợp" },
  { id: 1, label: "Chỉ là tôi không thích nội dung này" },
  { id: 2, label: "Thông tin sai lệch" },
  { id: 3, label: "Vi phạm quy tắc cộng đồng" },
];

const ReportComment: React.FC<ReportCommentProps> = ({ commentId }) => {
  const { theme } = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedReason, setSelectedReason] = useState<number | null>(null);

  const reportCommentMutation = useReportCommentMutation();

  const handleSubmit = async () => {
    if (selectedReason === null) {
      toast({
        description: "Vui lòng chọn lý do báo cáo.",
        variant: "destructive",
      });
      return;
    }

    const reportData = {
      commentId,
      reportTypeEnum: selectedReason,
    };

    try {
      const response = await reportCommentMutation.mutateAsync(reportData);
      toast({
        description: response.payload.message,
        variant: "success",
      });
      setOpen(false);
      setSelectedReason(null);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
        >
          <Flag className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-6 w-[400px] text-textChat">
        <DialogHeader>
          <DialogTitle>Báo cáo bình luận</DialogTitle>
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
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button
            onClick={handleSubmit}
            disabled={reportCommentMutation.isPending}
          >
            {reportCommentMutation.isPending ? "Đang gửi..." : "Gửi báo cáo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ReportComment;
