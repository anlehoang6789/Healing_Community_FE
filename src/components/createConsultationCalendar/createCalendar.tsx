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

type TimeSlot = {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
};

export default function CreateCalendar() {
  const [timeSlots, setTimeSlots] = React.useState<TimeSlot[]>([]);
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
    new Date()
  );
  const [isAddingSlot, setIsAddingSlot] = React.useState(false);
  const [editingSlot, setEditingSlot] = React.useState<TimeSlot | null>(null);

  const handleAddSlot = (newSlot: Omit<TimeSlot, "id">) => {
    setTimeSlots([...timeSlots, { ...newSlot, id: Date.now().toString() }]);
    setIsAddingSlot(false);
  };

  const handleEditSlot = (editedSlot: TimeSlot) => {
    setTimeSlots(
      timeSlots.map((slot) => (slot.id === editedSlot.id ? editedSlot : slot))
    );
    setEditingSlot(null);
  };

  const handleDeleteSlot = (id: string) => {
    setTimeSlots(timeSlots.filter((slot) => slot.id !== id));
  };

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
            {timeSlots
              .filter(
                (slot) =>
                  format(slot.date, "yyyy-MM-dd") ===
                  format(selectedDate || new Date(), "yyyy-MM-dd")
              )
              .map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-2 border rounded"
                >
                  <span>
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setEditingSlot(slot)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSlot(slot.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
          <Button className="mt-4" onClick={() => setIsAddingSlot(true)}>
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
            onSubmit={(formData) =>
              handleAddSlot({ ...formData, date: selectedDate || new Date() })
            }
            onCancel={() => setIsAddingSlot(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={!!editingSlot} onOpenChange={() => setEditingSlot(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Chỉnh sửa lịch trống</DialogTitle>
            <DialogDescription>
              Chỉnh sửa lịch trống cho ngày{" "}
              {editingSlot && format(editingSlot.date, "dd/MM/yyyy")}
            </DialogDescription>
          </DialogHeader>
          {editingSlot && (
            <TimeSlotForm
              initialData={editingSlot}
              onSubmit={(formData) =>
                handleEditSlot({
                  ...formData,
                  id: editingSlot.id,
                  date: editingSlot.date,
                })
              }
              onCancel={() => setEditingSlot(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

type TimeSlotFormProps = {
  initialData?: TimeSlot;
  onSubmit: (data: Omit<TimeSlot, "id">) => void;
  onCancel: () => void;
};

function TimeSlotForm({ initialData, onSubmit, onCancel }: TimeSlotFormProps) {
  const [startTime, setStartTime] = React.useState(
    initialData?.startTime || ""
  );
  const [endTime, setEndTime] = React.useState(initialData?.endTime || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      date: initialData?.date || new Date(),
      startTime,
      endTime,
    });
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
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel}>
          Hủy
        </Button>
        <Button type="submit">Lưu</Button>
      </DialogFooter>
    </form>
  );
}
