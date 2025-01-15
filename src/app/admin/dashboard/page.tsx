"use client";
import AdminIncomeFilter from "@/app/admin/dashboard/admin-income-filter";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

import { Users2, UserPlus, UserCheck, Banknote } from "lucide-react";
import { useGetUserStatistics } from "@/queries/useUser";
import { useGetTotalRevenueForAdmin } from "@/queries/usePayment";
import AdminBookingFilter from "@/app/admin/dashboard/admin-booking-filter";

export default function AdminDashboard() {
  const { data: userStatistics } = useGetUserStatistics();
  const { data: totalRevenue } = useGetTotalRevenueForAdmin();
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-muted-foreground">
          Thống kê của bạn
        </h1>
        {/* Tổng doanh thu, lượt đặt lịch, đánh giá, lượt xem hồ sơ */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
                {formatCurrency(totalRevenue?.payload.data || 0)}
              </div>
              <p className="text-xs text-green-500"></p>
            </CardContent>
          </Card>
          {/* lượt đặt lịch */}
          <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-textChat">
                Tổng số người dùng
              </CardTitle>
              <Users2 className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textChat">
                {userStatistics?.payload.data.totalUsers}
              </div>
              {/* <p className="text-xs text-blue-500">
                +180.1% so với tháng trước
              </p> */}
            </CardContent>
          </Card>
          {/* đánh giá */}
          <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-textChat">
                Người dùng mới trong tháng
              </CardTitle>
              <UserPlus className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textChat">
                {userStatistics?.payload.data.newUsersThisMonth}
              </div>
              {/* <p className="text-xs text-yellow-500">
                +{userStatistics?.payload.data.newUsersThisMonth} người dùng mới
              </p> */}
            </CardContent>
          </Card>
          {/* lượt xem hồ sơ */}
          <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-textChat">
                Chuyên gia
              </CardTitle>
              <UserCheck className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-textChat">
                {userStatistics?.payload.data.userRolesCount.Expert}
              </div>
              {/* <p className="text-xs text-purple-500">+49% so với tháng trước</p> */}
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Doanh thu theo thời gian */}
          <AdminIncomeFilter />
          {/* Lượt đặt lịch theo thời gian */}
          <AdminBookingFilter />
        </div>
      </div>
    </div>
  );
}
