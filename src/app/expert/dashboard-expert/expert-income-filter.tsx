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
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const revenueData = {
  year: [
    { name: "Tháng 1", total: 120000 },
    { name: "Tháng 2", total: 190000 },
    { name: "Tháng 3", total: 300000 },
    { name: "Tháng 4", total: 500000 },
    { name: "Tháng 5", total: 200000 },
    { name: "Tháng 6", total: 300000 },
    { name: "Tháng 7", total: 400000 },
    { name: "Tháng 8", total: 450000 },
    { name: "Tháng 9", total: 500000 },
    { name: "Tháng 10", total: 350000 },
    { name: "Tháng 11", total: 400000 },
    { name: "Tháng 12", total: 480000 },
  ],
  month: [
    { name: "Tuần 1", total: 50000 },
    { name: "Tuần 2", total: 75000 },
    { name: "Tuần 3", total: 120000 },
    { name: "Tuần 4", total: 100000 },
  ],
  week: [
    { name: "Thứ 2", total: 10000 },
    { name: "Thứ 3", total: 15000 },
    { name: "Thứ 4", total: 20000 },
    { name: "Thứ 5", total: 18000 },
    { name: "Thứ 6", total: 22000 },
    { name: "Thứ 7", total: 25000 },
    { name: "Chủ nhật", total: 18000 },
  ],
};

type RevenueTimeframe = "year" | "month" | "week";

const timeframeLabels = {
  year: "Năm nay",
  month: "Tháng này",
  week: "Tuần này",
};

export default function ExpertIncomeFilter() {
  const [revenueTimeframe, setRevenueTimeframe] =
    useState<RevenueTimeframe>("year");

  const chartConfig = {
    total: {
      label: "Doanh Thu",
      color: "hsl(var(--chart-1))",
    },
  };

  const currentData = revenueData[revenueTimeframe];

  const trendPercentage = useMemo(() => {
    if (currentData.length < 2) return 0;
    const lastValue = currentData[currentData.length - 1].total;
    const previousValue = currentData[currentData.length - 2].total;
    return ((lastValue - previousValue) / previousValue) * 100;
  }, [currentData]);

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
          {currentData
            .reduce((sum, item) => sum + item.total, 0)
            .toLocaleString()}{" "}
          đ
        </div>
        <div
          className={`flex items-center gap-1 ${
            trendPercentage >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          {trendPercentage >= 0 ? (
            <div className="flex items-center">
              Tăng <TrendingUp className="h-4 w-4 ml-2" />
            </div>
          ) : (
            <div className="flex items-center">
              Giảm <TrendingDown className="h-4 w-4 ml-2" />
            </div>
          )}
          <span className="text-sm font-medium">
            {Math.abs(trendPercentage).toFixed(1)}%
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
