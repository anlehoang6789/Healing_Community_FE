"use client";

import React from "react";
import { format, addDays, isSameDay } from "date-fns";
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

type TimeSlot = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
};

type Expert = {
  id: string;
  name: string;
  avatar: string;
  timeSlots: TimeSlot[];
};

// Dữ liệu giả cho nhiều ngày
const generateMockTimeSlots = (): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  const today = new Date();

  for (let i = 0; i < 10; i++) {
    const date = addDays(today, i);
    const numSlots = Math.floor(Math.random() * 5) + 1;

    for (let j = 0; j < numSlots; j++) {
      const startHour = Math.floor(Math.random() * 8) + 9;
      const startTime = `${startHour.toString().padStart(2, "0")}:00`;
      const endTime = `${(startHour + 1).toString().padStart(2, "0")}:00`;

      slots.push({
        id: `${i}-${j}`,
        date: date,
        startTime,
        endTime,
      });
    }
  }

  return slots;
};

const mockExpert: Expert = {
  id: "1",
  name: "Hoàng An",
  avatar: "/placeholder.svg?height=100&width=100",
  timeSlots: generateMockTimeSlots(),
};

export default function BookExpert() {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = React.useState<TimeSlot | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = React.useState(false);
  const [bookedSlots, setBookedSlots] = React.useState<string[]>([]);

  const availableSlots = React.useMemo(() => {
    return mockExpert.timeSlots.filter((slot) =>
      isSameDay(slot.date, selectedDate || new Date())
    );
  }, [selectedDate]);

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
          <CardTitle className="text-2xl font-bold">
            Đặt lịch tư vấn với {mockExpert.name}
          </CardTitle>
          <CardDescription>Chọn ngày và giờ phù hợp với bạn</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col  gap-8">
            <div className="flex justify-center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="rounded-md "
                disabled={(date) =>
                  date < new Date() ||
                  !mockExpert.timeSlots.some((slot) =>
                    isSameDay(slot.date, date)
                  )
                }
              />
            </div>
            <div className="">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Clock className="mr-2" /> Các khung giờ có sẵn
              </h3>
              {availableSlots.length > 0 ? (
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
                  Không có khung giờ nào cho ngày này.
                </p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Dialog
            open={isBookingDialogOpen}
            onOpenChange={setIsBookingDialogOpen}
          >
            <DialogTrigger asChild>
              <Button disabled={!selectedSlot}>Đặt lịch hẹn</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận đặt lịch tư vấn</DialogTitle>
                <DialogDescription>
                  Vui lòng xác nhận thông tin đặt lịch của bạn
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleBooking}>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Họ tên
                    </Label>
                    <Input id="name" className="col-span-3" required />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">
                      Số điện thoại
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      className="col-span-3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label className="text-right">Thời gian</Label>
                    <div className="col-span-3">
                      {selectedSlot && (
                        <p>
                          {format(selectedSlot.date, "dd/MM/yyyy")}{" "}
                          {selectedSlot.startTime} - {selectedSlot.endTime}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Xác nhận đặt lịch</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </CardFooter>
      </Card>
    </div>
  );
}
