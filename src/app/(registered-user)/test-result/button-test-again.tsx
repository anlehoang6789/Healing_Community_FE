"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { RotateCw } from "lucide-react";
import Link from "next/link";

export default function ButtonTestAgain() {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:mb-6">
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
