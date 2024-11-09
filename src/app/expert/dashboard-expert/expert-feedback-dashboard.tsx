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
import { Star } from "lucide-react";
import React from "react";

export default function ExpertFeedbackDashboard() {
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
            <TableRow className="text-muted-foreground">
              <TableCell className="font-medium">Nguyễn Văn A</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                Rất hài lòng với dịch vụ
              </TableCell>
            </TableRow>
            <TableRow className="text-muted-foreground">
              <TableCell className="font-medium">Trần Thị B</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {[...Array(4)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-current"
                    />
                  ))}
                  <Star className="h-4 w-4 text-gray-300" />
                </div>
              </TableCell>
              <TableCell className="text-right">
                Chuyên gia tư vấn rất nhiệt tình
              </TableCell>
            </TableRow>
            <TableRow className="text-muted-foreground">
              <TableCell className="font-medium">Lê Văn C</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 text-yellow-500 fill-current"
                    />
                  ))}
                </div>
              </TableCell>
              <TableCell className="text-right">
                Sẽ quay lại sử dụng dịch vụ
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
