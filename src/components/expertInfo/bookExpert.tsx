"use client";

import React, { useEffect, useState } from "react";
import { isSameDay, isBefore, isToday, parseISO, isAfter } from "date-fns";
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
import { useGetExpertAvailability } from "@/queries/useExpert";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  useBookExpertScheduleMutation,
  useCreatePaymentMutation,
} from "@/queries/usePayment";
import {
  formatCurrency,
  formatDate,
  formatDateTime,
  getRoleFromLocalStorage,
  getUserIdFromLocalStorage,
} from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";

type TimeSlot = {
  id: string;
  availableDate: string;
  startTime: string;
  endTime: string;
  amount: number;
  expertAvailabilityId: string;
};

export default function BookExpert() {
  const { expertId } = useParams() ?? "";
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Lấy giá trị status từ query parameters
    const status = searchParams.get("status");

    if (status === "cancelled") {
      router.push(`/user/profile/expert-info/${expertId}`);
    } else if (status === "paid") {
      router.push("/consultation-calendar");
    }
  }, [searchParams, expertId, router]);

  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [selectedSlot, setSelectedSlot] = React.useState<TimeSlot | null>(null);
  const [isBookingDialogOpen, setIsBookingDialogOpen] = React.useState(false);
  const [bookedSlots, setBookedSlots] = React.useState<string[]>([]);

  // Gọi API để lấy lịch trống của chuyên gia dựa trên userId
  const { data: availabilityData, isLoading: isLoadingAvailability } =
    useGetExpertAvailability(expertId as string);

  // Gọi API đặt lịch hẹn
  const { mutate: bookSchedule } = useBookExpertScheduleMutation();

  // Gọi API tạo thanh toán
  const { mutate: createPayment } = useCreatePaymentMutation();

  const userId = getUserIdFromLocalStorage();
  const role = getRoleFromLocalStorage();
  const { data: userById } = useGetUserProfileQuery(userId as string);

  const [fullName, setFullName] = useState(
    userById?.payload.data.fullName || ""
  );
  const [email, setEmail] = useState(userById?.payload.data.email || "");

  useEffect(() => {
    if (userById) {
      setFullName(userById.payload.data.fullName);
      setEmail(userById.payload.data.email);
    }
  }, [userById]);

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
        amount: slot.amount,
        expertAvailabilityId: slot.expertAvailabilityId,
      }));
  }, [availabilityData, selectedDate]);

  const isSlotAvailable = (slot: TimeSlot) => {
    const now = new Date(); // Thời gian hiện tại
    const slotDateTime = parseISO(`${slot.availableDate}T${slot.startTime}`);

    // Kiểm tra xem slot có phải là trong tương lai không
    return isAfter(slotDateTime, now);
  };

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
      // Gọi API đặt lịch
      bookSchedule(
        { expertAvailabilityId: selectedSlot.expertAvailabilityId },
        {
          onSuccess: (response) => {
            const appointmentId = response.payload.data;

            // Gọi API tạo thanh toán
            createPayment(
              {
                appointmentId,
                redirectUrl: `http://localhost:3000/user/profile/expert-info/${expertId}`,
              },
              {
                onSuccess: (paymentResponse) => {
                  const paymentUrl = paymentResponse.payload.data;

                  // Chuyển hướng đến URL thanh toán của PayOs
                  window.location.href = paymentUrl;
                },
                onError: (error) => {
                  console.error("Error creating payment:", error);
                },
              }
            );

            setBookedSlots([...bookedSlots, selectedSlot.id]);
            setIsBookingDialogOpen(false);
            setSelectedSlot(null);
          },
          onError: (error) => {
            console.error("Error booking schedule:", error);
          },
        }
      );
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
              ) : availableSlots.length === 0 ||
                availableSlots.filter(isSlotAvailable).length === 0 ? (
                <p className="text-muted-foreground">
                  Không có khung giờ nào khả dụng
                </p>
              ) : (
                <ScrollArea className="h-full max-h-[215px]">
                  <div className="space-y-2">
                    {availableSlots
                      .filter(isSlotAvailable) // Lọc các slot còn khả dụng
                      .map((slot) => (
                        <Button
                          key={slot.id}
                          variant={
                            selectedSlot?.id === slot.id ? "default" : "outline"
                          }
                          className="w-full flex"
                          onClick={() => handleSlotSelect(slot)}
                          disabled={bookedSlots.includes(slot.id)}
                        >
                          <div className="flex justify-between items-center w-full">
                            <div>
                              {slot.startTime.slice(0, 5)} -{" "}
                              {slot.endTime.slice(0, 5)}
                            </div>
                            {formatCurrency(slot.amount)}
                          </div>
                          <div className="self-end mt-2">
                            {" "}
                            {bookedSlots.includes(slot.id) && (
                              <span className="text-muted-foreground">
                                (Đã đặt)
                              </span>
                            )}
                          </div>
                        </Button>
                      ))}
                  </div>
                </ScrollArea>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          {role === "User" && (
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
                  <DialogTitle className="text-textChat">
                    Xác nhận đặt lịch
                  </DialogTitle>
                  <DialogDescription>
                    Bạn có chắc chắn muốn đặt lịch cho{" "}
                    {selectedSlot?.startTime.slice(0, 5)} -{" "}
                    {selectedSlot?.endTime.slice(0, 5)} ngày{" "}
                    {selectedSlot?.availableDate
                      ? formatDate(selectedSlot.availableDate)
                      : "No date available"}
                    ?
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBooking}>
                  <div className="grid gap-4">
                    <div>
                      <Label htmlFor="name" className="text-textChat">
                        Tên của bạn
                      </Label>
                      <Input
                        id="name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-textChat">
                        Email của bạn
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <p className="text-lg font-semibold text-textChat mt-4">
                    Giá: {formatCurrency(selectedSlot?.amount || 0)}
                  </p>
                  <DialogFooter className="mt-4">
                    <Button
                      variant="outline"
                      onClick={() => setIsBookingDialogOpen(false)}
                      className="text-textChat"
                    >
                      Hủy
                    </Button>
                    <Button type="submit">Đặt lịch</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
