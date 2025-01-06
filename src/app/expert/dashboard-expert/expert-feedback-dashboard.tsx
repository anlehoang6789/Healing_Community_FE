"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetDashboardRecentRatingQuery } from "@/queries/useExpert";
import { Star } from "lucide-react";
import React from "react";

const RecentRatingItem = ({
  userId,
  rating,
  comment,
}: {
  userId: string;
  rating: number;
  comment: string;
}) => {
  const { data, isLoading, isError } = useGetUserProfileQuery(userId);

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-5 bg-gray-200 rounded mb-2 w-1/2"></div>
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-4 h-4 bg-gray-200 rounded-full"></div>
          ))}
        </div>
        <div className="h-5 bg-gray-200 rounded w-full mt-2"></div>
      </div>
    );
  }

  if (isError) {
    return <div className="text-red-500">Lỗi tải thông tin người dùng</div>;
  }

  return (
    <TableRow className="text-muted-foreground">
      <TableCell className="font-medium text-textChat">
        {data?.payload.data.fullName || data?.payload.data.userName}
      </TableCell>
      <TableCell>
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating ? "text-yellow-500 fill-current" : "text-gray-300"
              }`}
            />
          ))}
        </div>
      </TableCell>
      <TableCell className="text-right capitalize">{comment}</TableCell>
    </TableRow>
  );
};

export default function ExpertFeedbackDashboard() {
  const { data } = useGetDashboardRecentRatingQuery();
  const recentRatingList = data?.payload.data || [];

  return (
    <Card className=" shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-textChat">
            Đánh Giá Gần Đây
          </CardTitle>
          <div className="flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500 fill-current" />
            <span className="text-yellow-500">4.9</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow className="text-muted-foreground">
              <TableHead className="w-[150px]">Khách Hàng</TableHead>
              <TableHead>Đánh Giá</TableHead>
              <TableHead className="text-right">Nhận Xét</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentRatingList.map((item) => (
              <RecentRatingItem
                key={item.userId}
                userId={item.userId}
                rating={item.rating}
                comment={item.comment}
              />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
