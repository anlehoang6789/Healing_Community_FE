"use client";

import { TrendingUp } from "lucide-react";
import { useState } from "react";
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

const bookingsData = {
  year: [
    { name: "Tháng 1", total: 1200 },
    { name: "Tháng 2", total: 1900 },
    { name: "Tháng 3", total: 3000 },
    { name: "Tháng 4", total: 5000 },
    { name: "Tháng 5", total: 2000 },
    { name: "Tháng 6", total: 3000 },
    { name: "Tháng 7", total: 4000 },
    { name: "Tháng 8", total: 4500 },
    { name: "Tháng 9", total: 5000 },
    { name: "Tháng 10", total: 3500 },
    { name: "Tháng 11", total: 4000 },
    { name: "Tháng 12", total: 4800 },
  ],
  month: [
    { name: "Tuần 1", total: 500 },
    { name: "Tuần 2", total: 750 },
    { name: "Tuần 3", total: 1200 },
    { name: "Tuần 4", total: 1000 },
  ],
  week: [
    { name: "Thứ 2", total: 100 },
    { name: "Thứ 3", total: 150 },
    { name: "Thứ 4", total: 200 },
    { name: "Thứ 5", total: 180 },
    { name: "Thứ 6", total: 220 },
    { name: "Thứ 7", total: 250 },
    { name: "Chủ nhật", total: 180 },
  ],
};

type RevenueTimeframe = "year" | "month" | "week";

const chartConfig = {
  total: {
    label: "Lượt đặt",
    color: "hsl(var(--chart-1))",
  },
};

export default function ExpertBookingFilter() {
  const [bookingsTimeframe, setBookingsTimeframe] =
    useState<RevenueTimeframe>("year");

  const getTimeframeLabel = (timeframe: RevenueTimeframe) => {
    switch (timeframe) {
      case "year":
        return "năm nay";
      case "month":
        return "tháng này";
      case "week":
        return "tuần này";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-textChat">
            Doanh thu chi tiết
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
        <ChartContainer config={chartConfig}>
          {/* <ResponsiveContainer width="100%" height={300}>
            <BarChart data={bookingsData[bookingsTimeframe]}>
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
          </ResponsiveContainer> */}

          <BarChart data={bookingsData[bookingsTimeframe]}>
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
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none text-textChat">
          Tăng <span className="text-green-500">5.2%</span> so với{" "}
          {getTimeframeLabel(bookingsTimeframe)} trước{" "}
          <TrendingUp className="h-4 w-4 text-green-500" />
        </div>
        <div className="leading-none text-muted-foreground">
          Hiển thị tổng số lượt đặt lịch cho{" "}
          {getTimeframeLabel(bookingsTimeframe)}
        </div>
      </CardFooter>
    </Card>
  );
}
