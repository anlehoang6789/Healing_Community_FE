"use client";

import React from "react";
import { format } from "date-fns";
import { Edit, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateAvailableTimeSlot,
  useDeleteAvailableTimeSlotByIdMutation,
  useGetExpertAvailability,
} from "@/queries/useExpert";
import { toast } from "@/hooks/use-toast";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { ExpertAvailabilityType } from "@/schemaValidations/expert.schema";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

export default function CreateCalendar() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [isAddingSlot, setIsAddingSlot] = React.useState(false);
  const [deleteConfirmationSlotId, setDeleteConfirmationSlotId] =
    React.useState<string | null>(null);

  const createTimeSlotMutation = useCreateAvailableTimeSlot();
  const expertProfileId = getUserIdFromLocalStorage();
  const { data: expertAvailability, refetch } = useGetExpertAvailability(
    expertProfileId as string
  );

  const deleteTimeSlotMutation = useDeleteAvailableTimeSlotByIdMutation(
    expertProfileId as string
  );

  const handleDeleteTimeSlot = (expertAvailabilityId: string) => {
    deleteTimeSlotMutation.mutate(expertAvailabilityId, {
      onSuccess: () => {
        toast({
          title: "Xóa lịch trống thành công",
          variant: "success",
        });
        refetch();

        setDeleteConfirmationSlotId(null);
      },
      onError: (error) => {
        handleErrorApi({ error });
      },
    });
  };

  const handleAddSlot = (newSlot: { startTime: string; endTime: string }) => {
    // Thêm kiểm tra thời gian
    const startTime = new Date(`2023-01-01T${newSlot.startTime}`);
    const endTime = new Date(`2023-01-01T${newSlot.endTime}`);

    // Tính khoảng thời gian giữa start và end (tính bằng phút)
    const timeDifference =
      (endTime.getTime() - startTime.getTime()) / (1000 * 60);

    if (startTime >= endTime) {
      toast({
        title: "Thời gian không hợp lệ",
        description: "Thời gian bắt đầu phải trước thời gian kết thúc",
        variant: "destructive",
      });
      return;
    }

    if (timeDifference < 30) {
      toast({
        title: "Thời gian slot không hợp lệ",
        description: "Mỗi slot trống phải kéo dài ít nhất 30 phút",
        variant: "destructive",
      });
      return;
    }
    if (!selectedDate) {
      toast({
        title: "Vui lòng chọn ngày",
        variant: "destructive",
      });
      return;
    }

    createTimeSlotMutation.mutate(
      {
        availableDate: format(selectedDate, "yyyy-MM-dd"),
        startTime: `${newSlot.startTime}:00`,
        endTime: `${newSlot.endTime}:00`,
      },
      {
        onSuccess: (response) => {
          toast({
            title: "Tạo lịch trống thành công",
            variant: "success",
          });
          setIsAddingSlot(false);
          refetch();
        },
        onError: (error) => {
          handleErrorApi({ error });
          console.error(error);
        },
      }
    );
  };

  // Filter time slots for the selected date
  const filteredTimeSlots = React.useMemo(() => {
    // Kiểm tra dữ liệu một cách an toàn
    if (!selectedDate || !expertAvailability) return [];

    // Truy cập payload.data thay vì chỉ data
    const availabilityData = expertAvailability.payload?.data || [];

    return availabilityData.filter(
      (slot: ExpertAvailabilityType) =>
        format(new Date(slot.availableDate), "yyyy-MM-dd") ===
        format(selectedDate, "yyyy-MM-dd")
    );
  }, [selectedDate, expertAvailability]);

  return (
    <div className="w-full bg-background h-auto p-4 max-w-7xl overflow-hidden mx-auto rounded-lg shadow-lg border">
      <h1 className="text-2xl font-bold mb-4 text-muted-foreground">
        Quản lý lịch tư vấn
      </h1>
      <div className="flex flex-col md:flex-row md:space-x-4 text-muted-foreground">
        <div className="flex justify-center items-center mb-4 w-full md:w-1/2 ">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="flex items-center justify-center"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-xl font-semibold mb-2">
            Lịch trống ngày {selectedDate && format(selectedDate, "dd/MM/yyyy")}
          </h2>
          <div className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
            {filteredTimeSlots.length > 0 ? (
              filteredTimeSlots.map((slot: ExpertAvailabilityType) => (
                <div
                  key={slot.expertAvailabilityId}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-md"
                >
                  <span>
                    {slot.startTime.slice(0, 5)} - {slot.endTime.slice(0, 5)}
                  </span>
                  <div className="flex items-center space-x-2">
                    <AlertDialog
                      open={
                        deleteConfirmationSlotId === slot.expertAvailabilityId
                      }
                      onOpenChange={(open) => {
                        if (!open) {
                          setDeleteConfirmationSlotId(null);
                        }
                      }}
                    >
                      <Button
                        variant="iconSend"
                        size="sm"
                        className="text-red-500 hover:text-red-700"
                        onClick={() =>
                          setDeleteConfirmationSlotId(slot.expertAvailabilityId)
                        }
                        disabled={deleteTimeSlotMutation.isPending}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <AlertDialogContent className="bg-backgroundChat text-red-500">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Bạn có chắc chắn muốn xóa?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Lịch trống từ{" "}
                            <b>
                              {slot.startTime.slice(0, 5)} -{" "}
                              {slot.endTime.slice(0, 5)}
                            </b>{" "}
                            sẽ bị xóa <b className="text-red-500">vĩnh viễn</b>.
                            Bạn không thể hoàn tác sau khi xóa.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Hủy</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-red-500 text-white"
                            onClick={() =>
                              handleDeleteTimeSlot(slot.expertAvailabilityId)
                            }
                            disabled={deleteTimeSlotMutation.isPending}
                          >
                            {deleteTimeSlotMutation.isPending
                              ? "Đang xóa..."
                              : "Xóa"}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-center">
                Không có lịch trống cho ngày này
              </p>
            )}
          </div>

          <Button
            className="mt-4"
            onClick={() => setIsAddingSlot(true)}
            disabled={createTimeSlotMutation.isPending}
          >
            <Plus className="mr-2 h-4 w-4" /> Thêm lịch trống
          </Button>
        </div>
      </div>

      <Dialog open={isAddingSlot} onOpenChange={setIsAddingSlot}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Thêm lịch trống mới</DialogTitle>
            <DialogDescription>
              Tạo lịch trống cho ngày{" "}
              {selectedDate && format(selectedDate, "dd/MM/yyyy")}
            </DialogDescription>
          </DialogHeader>
          <TimeSlotForm
            onSubmit={handleAddSlot}
            onCancel={() => setIsAddingSlot(false)}
            isLoading={createTimeSlotMutation.isPending}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}

type TimeSlotFormProps = {
  onSubmit: (data: { startTime: string; endTime: string }) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

function TimeSlotForm({ onSubmit, onCancel, isLoading }: TimeSlotFormProps) {
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ startTime, endTime });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="start-time" className="text-right">
            Thời gian bắt đầu
          </Label>
          <Input
            id="start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="end-time" className="text-right">
            Thời gian kết thúc
          </Label>
          <Input
            id="end-time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="col-span-3"
            required
          />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Hủy
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Đang lưu..." : "Lưu"}
        </Button>
      </DialogFooter>
    </form>
  );
}
