"use client";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { formatCurrency } from "@/lib/utils";
import { useGetFeeServiceQuery } from "@/queries/usePayment";
import { CircleHelp } from "lucide-react";
import React from "react";

export default function FeeServiceHelp() {
  const { data } = useGetFeeServiceQuery();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <CircleHelp className="ml-2 h-5 w-5 text-textChat" />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-1">
          <h3 className="text-base font-semibold text-red-600">Lưu ý</h3>
          <p className="mb-4">
            Phí nền tảng áp dụng đối với chuyên gia sử dụng nền tảng để tạo lịch
            tư vấn với khách hàng.
          </p>
          <p className="mb-4">Cách tính phí:</p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Nền tảng sẽ thu{" "}
              <span className="p-1 bg-yellow-300 rounded-lg text-gray-800">
                {data?.payload.data.platformFeeValue}%
              </span>{" "}
              phí cho mỗi giá tiền khi tư vấn.
            </li>
            <li>Phí được tính trên tổng giá trị của buổi tư vấn.</li>
          </ul>
          <p className="mb-4">Ví dụ:</p>
          <p>
            Nếu chuyên gia tạo ra 1 lịch tư vấn có giá trị là{" "}
            {formatCurrency(100000)}, thì tiền chuyên gia thực nhận sau khi đã
            trừ phí nền tảng là:
          </p>
          <p className="font-bold">
            100.000 - 100.000 * {Number(data?.payload.data.platformFeeValue)}% ={" "}
            {formatCurrency(
              100000 -
                100000 * (Number(data?.payload.data.platformFeeValue) / 100)
            )}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
