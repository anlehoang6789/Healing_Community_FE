"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import Link from "next/link";

export default function ButtonTestAgain() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:mb-6">
      <div className="w-full md:w-[370px] text-sm md:text-base mb-2 md:mb-0 md:mr-4 bg-gray-200 md:p-4 p-2 rounded-md text-black">
        Trạng thái tâm lý của bạn:
        <strong className="text-sm md:text-lg pl-1">Acute Stress</strong>
      </div>
      <Button
        asChild
        className="bg-green-500 hover:bg-green-600 text-white flex items-center w-full md:w-52 md:h-14"
      >
        <Link href={"/psychological-test"}>
          Làm lại bài test <RotateCw className="ml-2" />
        </Link>
      </Button>
    </div>
  );
}
