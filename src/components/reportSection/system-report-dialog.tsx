"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import SystemReportFeedback from "@/components/reportSection/system-report-feedback";

export default function SystemReportDialog({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="p-6 max-w-5xl text-textChat">
        <DialogHeader>
          <DialogTitle className="sr-only">Báo cáo bài viết</DialogTitle>
          <DialogDescription className="sr-only">Gop y</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <SystemReportFeedback />
        </div>
      </DialogContent>
    </Dialog>
  );
}
