"use client";

import React from "react";
import { format, addDays, isSameDay, isBefore, isToday } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Clock } from "lucide-react";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetExpertAvailability } from "@/queries/useExpert";

type TimeSlot = {
  id: string;
  availableDate: string;
  startTime: string;
  endTime: string;
  expertAvailabilityId: string;
};

export default function BookExpert() {
  const userId = getUserIdFromLocalStorage() ?? "";
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = React.useState<TimeSlot | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = React.useState(false);
  const [bookedSlots, setBookedSlots] = React.useState<string[]>([]);

  // Gọi API để lấy lịch trống của chuyên gia dựa trên userId
  const { data: availabilityData, isLoading: isLoadingAvailability } =
    useGetExpertAvailability(userId);

  // Lấy các khung giờ trống từ dữ liệu API
  const availableSlots = React.useMemo(() => {
    if (!availabilityData || !availabilityData.payload) return [];
    return availabilityData.payload.data
      .filter((slot) =>
        isSameDay(new Date(slot.availableDate), selectedDate || new Date())
      )
      .map((slot) => ({
        id: slot.expertAvailabilityId,
        availableDate: slot.availableDate,
        startTime: slot.startTime,
        endTime: slot.endTime,
        expertAvailabilityId: slot.expertAvailabilityId,
      }));
  }, [availabilityData, selectedDate]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: TimeSlot) => {
    setSelectedSlot(slot);
  };

  const handleBooking = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedSlot) {
      console.log("Đã xác nhận đặt lịch cho:", selectedSlot);
      setBookedSlots([...bookedSlots, selectedSlot.id]);
      setIsBookingDialogOpen(false);
      setSelectedSlot(null);
    }
  };

  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Đặt lịch tư vấn</CardTitle>
          <CardDescription>Chọn ngày và giờ phù hợp với bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-8">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md"
                disabled={(date) =>
                  isBefore(date, new Date()) && !isToday(date)
                }
              />
            </div>
            <div className="">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2" /> Các khung giờ có sẵn
              </h3>
              {isLoadingAvailability ? (
                <p className="text-muted-foreground">Đang tải khung giờ...</p>
              ) : availableSlots.length > 0 ? (
                <ScrollArea className="h-[215px]">
                  <div className="space-y-2">
                    {availableSlots.map((slot) => (
                      <Button
                        key={slot.id}
                        variant={
                          selectedSlot?.id === slot.id ? "default" : "outline"
                        }
                        className="w-full justify-start"
                        onClick={() => handleSlotSelect(slot)}
                        disabled={bookedSlots.includes(slot.id)}
                      >
                        {slot.startTime} - {slot.endTime}
                        {bookedSlots.includes(slot.id) && (
                          <span className="ml-2 text-muted-foreground">
                            (Đã đặt)
                          </span>
                        )}
                      </Button>
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <p className="text-muted-foreground">
                  Không có khung giờ nào khả dụng
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Dialog
            open={isBookingDialogOpen}
            onOpenChange={setIsBookingDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                variant="default"
                onClick={() => setIsBookingDialogOpen(true)}
                disabled={!selectedSlot}
              >
                Xác nhận đặt lịch
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận đặt lịch</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn đặt lịch cho {selectedSlot?.startTime} -{" "}
                  {selectedSlot?.endTime}?
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBooking}>
                <div className="grid gap-4">
                  <div>
                    <Label htmlFor="name">Tên của bạn</Label>
                    <Input id="name" required />
                  </div>
                  <div>
                    <Label htmlFor="email">Email của bạn</Label>
                    <Input id="email" type="email" required />
                  </div>
                </div>
                <DialogFooter className="mt-4">
                  <Button
                    variant="outline"
                    onClick={() => setIsBookingDialogOpen(false)}
                  >
                    Hủy
                  </Button>
                  <Button type="submit">Đặt lịch</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
