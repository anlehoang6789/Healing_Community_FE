"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatCurrency, formatDate } from "@/lib/utils";
import { usePaymentHistoryDetailsQuery } from "@/queries/usePayment";

export default function PaymentHistoryDetails({
  id,
  setId,
  onSubmitSuccess,
}: {
  id?: string | undefined;
  setId: (value: string | undefined) => void;
  onSubmitSuccess?: () => void;
}) {
  const reset = () => {
    setId(undefined);
  };

  const { data: expertDetails } = usePaymentHistoryDetailsQuery({
    paymentId: id as string,
    enabled: Boolean(id),
  });

  return (
    <Dialog
      open={Boolean(id)}
      onOpenChange={(value) => {
        if (!value) {
          reset();
        }
      }}
    >
      <DialogContent className="sm:max-w-[600px] max-h-screen overflow-auto text-textChat">
        <DialogHeader>
          <DialogTitle className="text-center">Chi tiết đơn hàng</DialogTitle>
          <DialogDescription className="sr-only">
            Make changes to your profile here. Click save when you done.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between">
            <span className="font-semibold">Tên chuyên gia:</span>
            <span>
              {expertDetails?.payload.data.expertName ||
                expertDetails?.payload.data.expertEmail}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Email liên hệ:</span>
            <span>{expertDetails?.payload.data.expertEmail}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Giá tiền buổi tư vấn:</span>
            <span>
              {formatCurrency(expertDetails?.payload.data.amount as number)}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Ngày đặt lịch tư vấn:</span>
            <span>
              {formatDate(
                expertDetails?.payload.data.appointmentDate as string
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Thời gian bắt đầu:</span>
            <span>{expertDetails?.payload.data.startTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-semibold">Thời gian kết thúc:</span>
            <span>{expertDetails?.payload.data.endTime}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
