"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Send } from "lucide-react";

type ReportDialogProps = {
  expertName: string;
  reportText: string;
  setReportText: (text: string) => void;
  selectedReasons: string[];
  setSelectedReasons: React.Dispatch<React.SetStateAction<string[]>>;
  reportReasons: { id: string; label: string }[];
  onSendReport: () => void;
};

const ReportDialog: React.FC<ReportDialogProps> = ({
  expertName,

  reportText,
  setReportText,
  selectedReasons,
  setSelectedReasons,
  reportReasons,
  onSendReport,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex items-center hover:cursor-pointer hover:bg-gray-200 rounded-lg ">
          <Send className="mr-2 h-4 w-4" />
          <span>Gửi báo cáo</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-muted-foreground">
            Gửi báo cáo cho {expertName}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Hãy chia sẻ trải nghiệm của bạn về buổi tư vấn với chuyên gia. Báo
            cáo của bạn sẽ giúp chúng tôi cải thiện dịch vụ.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-4">
            <Label className="text-muted-foreground">Lý do báo cáo</Label>
            {reportReasons.map((reason) => (
              <div
                className="flex items-center space-x-2 text-muted-foreground"
                key={reason.id}
              >
                <Checkbox
                  id={reason.id}
                  checked={selectedReasons.includes(reason.id)}
                  onCheckedChange={() => {
                    setSelectedReasons((prev) =>
                      prev.includes(reason.id)
                        ? prev.filter((id) => id !== reason.id)
                        : [...prev, reason.id]
                    );
                  }}
                />
                <Label htmlFor={reason.id}>{reason.label}</Label>
              </div>
            ))}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="report" className="text-muted-foreground">
              Nội dung báo cáo
            </Label>
            <Textarea
              id="report"
              placeholder="Nhập báo cáo của bạn ở đây..."
              value={reportText}
              onChange={(e) => setReportText(e.target.value)}
              className="text-muted-foreground"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="button" onClick={onSendReport}>
            Gửi báo cáo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ReportDialog;
