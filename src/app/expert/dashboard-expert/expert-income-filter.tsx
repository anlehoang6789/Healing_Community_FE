"use client";

import { TrendingUp, TrendingDown } from "lucide-react";
import { useState, useMemo } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
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
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
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

export default function ExpertIncomeFilter() {
  const [revenueTimeframe, setRevenueTimeframe] =
    useState<RevenueTimeframe>("year");

  const { data: expertRevenueData } = useGetRevenueDetailsForExpertQuery({
    filterType: timeframeFilters[revenueTimeframe],
  });

  const chartConfig = {
    total: {
      label: "Doanh Thu",
      color: "hsl(var(--chart-1))",
    },
  };

  const currentData = useMemo(() => {
    if (!expertRevenueData) return [];

    if (timeframeFilters[revenueTimeframe] === "month") {
      const months = Array(12)
        .fill(0)
        .map((_, index) => ({
          name: `Tháng ${index + 1}`,
          total:
            expertRevenueData.payload.data.find(
              (item: any) => item.month === index + 1
            )?.totalRevenue || 0,
        }));
      return months;
    }

    if (timeframeFilters[revenueTimeframe] === "week") {
      const weeks = Array(4)
        .fill(0)
        .map((_, index) => ({
          name: `Tuần ${index + 1}`,
          total:
            expertRevenueData.payload.data.find(
              (item: any) => item.weekOfMonth === index + 1
            )?.totalRevenue || 0,
        }));
      return weeks;
    }

    if (timeframeFilters[revenueTimeframe] === "day") {
      const days = Object.keys(dayOfWeekLabels).map((day: string) => ({
        name: dayOfWeekLabels[day as keyof typeof dayOfWeekLabels],
        total:
          expertRevenueData.payload.data.find(
            (item: any) => item.dayOfWeek === day
          )?.totalRevenue || 0,
      }));
      return days;
    }

    return [];
  }, [expertRevenueData, revenueTimeframe]);

  return (
    <Card className="w-full max-w-[550px] sm:max-w-[800px] lg:max-w-[700px]">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-semibold text-textChat">
            Doanh thu chi tiết
          </CardTitle>
          <Select
            value={revenueTimeframe}
            onValueChange={(value) =>
              setRevenueTimeframe(value as RevenueTimeframe)
            }
          >
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Chọn khoảng thời gian" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Tuần này</SelectItem>
              <SelectItem value="month">Tháng này</SelectItem>
              <SelectItem value="year">Năm nay</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <CardDescription className="sr-only">
          {timeframeLabels[revenueTimeframe]}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] sm:h-[350px] lg:h-[400px] w-full"
        >
          <LineChart data={currentData} className="w-full">
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.replace("Tháng ", "T")}
            />
            <ChartTooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-backgroundChat border border-[#ccc] p-2 rounded-md">
                      <p className="text-xs font-medium text-muted-foreground mb-1">
                        {label}{" "}
                      </p>
                      <p className="text-sm font-bold">
                        {Number(payload[0].value).toLocaleString()} đ
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Line
              type="monotone"
              dataKey="total"
              stroke="var(--color-total)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex flex-col sm:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground mb-2 sm:mb-0">
          Tổng doanh thu:{" "}
          <span className="font-semibold text-green-500">
            {currentData
              .reduce((sum, item) => sum + item.total, 0)
              .toLocaleString()}{" "}
            đ
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
