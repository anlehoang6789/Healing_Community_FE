"use client";

import { TrendingUp } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useGetRevenueDetailsForExpertQuery } from "@/queries/usePayment";

type RevenueTimeframe = "year" | "month" | "week";

const timeframeLabels = {
  year: "Năm nay",
  month: "Tháng này",
  week: "Tuần này",
};

const timeframeFilters = {
  year: "month",
  month: "week",
  week: "day",
};

const dayOfWeekLabels = {
  Monday: "Thứ hai",
  Tuesday: "Thứ ba",
  Wednesday: "Thứ tư",
  Thursday: "Thứ năm",
  Friday: "Thứ sáu",
  Saturday: "Thứ bảy",
  Sunday: "Chủ nhật",
};

export default function ExpertBookingFilter() {
  const [bookingsTimeframe, setBookingsTimeframe] =
    useState<RevenueTimeframe>("year");

  const { data: expertRevenueData } = useGetRevenueDetailsForExpertQuery({
    filterType: timeframeFilters[bookingsTimeframe],
  });

  const chartConfig = {
    total: {
      label: "Lượt đặt",
      color: "hsl(var(--chart-1))",
    },
  };

  const currentData = useMemo(() => {
    if (!expertRevenueData) return [];

    if (timeframeFilters[bookingsTimeframe] === "month") {
      const months = Array(12)
        .fill(0)
        .map((_, index) => ({
          name: `Tháng ${index + 1}`,
          total:
            expertRevenueData.payload.data.find(
              (item: any) => item.month === index + 1
            )?.totalBookings || 0,
        }));
      return months;
    }

    if (timeframeFilters[bookingsTimeframe] === "week") {
      const weeks = Array(4)
        .fill(0)
        .map((_, index) => ({
          name: `Tuần ${index + 1}`,
          total:
            expertRevenueData.payload.data.find(
              (item: any) => item.weekOfMonth === index + 1
            )?.totalBookings || 0,
        }));
      return weeks;
    }

    if (timeframeFilters[bookingsTimeframe] === "day") {
      const days = Object.keys(dayOfWeekLabels).map((day: string) => ({
        name: dayOfWeekLabels[day as keyof typeof dayOfWeekLabels],
        total:
          expertRevenueData.payload.data.find(
            (item: any) => item.dayOfWeek === day
          )?.totalBookings || 0,
      }));
      return days;
    }

    return [];
  }, [expertRevenueData, bookingsTimeframe]);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-textChat">
            Lượt đặt lịch chi tiết
          </CardTitle>
          <Select
            value={bookingsTimeframe}
            onValueChange={(value) =>
              setBookingsTimeframe(value as RevenueTimeframe)
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="sr-only">mô tả doanh thu</CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <ChartContainer config={chartConfig}>
            <BarChart data={currentData}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="hsl(var(--chart-1))"
                    stopOpacity={0.2}
                  />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <XAxis
                dataKey="name"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
              />
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Bar
                dataKey="total"
                fill="url(#colorTotal)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ChartContainer>
        </ResponsiveContainer>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
          Tổng lượt đặt lịch:{" "}
          <span className="font-semibold text-green-500">
            {currentData
              .reduce((sum, item) => sum + item.total, 0)
              .toLocaleString()}{" "}
            lượt
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
