"use client";
import ExpertBookingFilter from "@/app/expert/dashboard-expert/expert-booking-filter";
import ExpertCalendarDashboard from "@/app/expert/dashboard-expert/expert-calendar-dashboard";
import ExpertFeedbackDashboard from "@/app/expert/dashboard-expert/expert-feedback-dashboard";
import ExpertIncomeFilter from "@/app/expert/dashboard-expert/expert-income-filter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { useGetDashboardStatisticsQuery } from "@/queries/useExpert";
import { useGetTotalRevenueForExpert } from "@/queries/usePayment";
import { CalendarDays, Banknote, Star, Users } from "lucide-react";
import React from "react";

export default function DashboardExpert() {
  const { data: expertStatistic } = useGetDashboardStatisticsQuery();

  const { data: expertTotalRevenue } = useGetTotalRevenueForExpert();

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-muted-foreground">
          Thống kê của bạn
        </h1>
        {/* Tổng doanh thu, lượt đặt lịch, đánh giá, lượt xem hồ sơ */}
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8 w-[900px]">
            {/* Tổng doanh thu */}
            <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-textChat">
                  Tổng Doanh Thu
                </CardTitle>
                <Banknote className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-textChat">
                  {formatCurrency(expertTotalRevenue?.payload.data || 0)}
                </div>
                <p className="text-xs text-green-500"></p>
              </CardContent>
            </Card>
            {/* lượt đặt lịch */}
            <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-textChat">
                  Lượt Đặt Lịch
                </CardTitle>
                <CalendarDays className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-textChat">
                  {expertStatistic?.payload.data.totalAppointments}
                </div>
              </CardContent>
            </Card>
            {/* đánh giá */}
            <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-textChat">
                  Đánh Giá
                </CardTitle>
                <Star className="h-4 w-4 text-yellow-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-textChat">
                  {expertStatistic?.payload.data.averageRating}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Doanh thu theo thời gian */}
          <ExpertIncomeFilter />
          {/* Lượt đặt lịch theo thời gian */}
          <ExpertBookingFilter />
        </div>
        {/* Đánh giá, báo cáo hoạt động */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* đánh giá */}
          <ExpertFeedbackDashboard />
          {/* báo cáo hoạt động */}
          <ExpertCalendarDashboard />
        </div>
      </div>
    </div>
  );
}
