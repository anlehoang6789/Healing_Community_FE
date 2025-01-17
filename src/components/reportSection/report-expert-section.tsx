"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAddReportExpertMutation } from "@/queries/useReport";
import { toast } from "@/hooks/use-toast";
import { handleErrorApi } from "@/lib/utils";

export default function ReportExpertSection({
  appoinmtentId,
  isOpen,
  setIsOpen,
}: {
  appoinmtentId: string;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  const [reportContent, setReportContent] = useState("");

  const reportExpertMutation = useAddReportExpertMutation();
  const handleSubmit = async () => {
    if (reportExpertMutation.isPending) return;
    try {
      const result = await reportExpertMutation.mutateAsync({
        appoinmtentId,
        reportDescription: reportContent,
      });
      toast({
        description: result.payload.message,
        variant: "success",
      });
      setIsOpen(false);
      setReportContent("");
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
          <textarea
            value={reportContent}
            onChange={(e) => setReportContent(e.target.value)}
            placeholder="Nhập nội dung báo cáo tại đây..."
            className="w-full h-24 p-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant={"outline"} onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={reportExpertMutation.isPending || !reportContent.trim()}
          >
            {reportExpertMutation.isPending ? "Đang gửi..." : "Gửi báo cáo"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
