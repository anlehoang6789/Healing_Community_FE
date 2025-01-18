"use client";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import React from "react";

export default function CustomerNameForExpert({ userId }: { userId: string }) {
  const { data } = useGetUserProfileQuery(userId);

  return (
    <div>
      <h1 className="font-bold text-textChat text-lg">
        {data?.payload.data.userName}
      </h1>
      <p className="text-xs text-muted-foreground">
        {data?.payload.data.email}{" "}
        <span className="px-1 border border-blue-500 rounded-lg">
          {" "}
          Khách hàng
        </span>
      </p>
    </div>
  );
}
