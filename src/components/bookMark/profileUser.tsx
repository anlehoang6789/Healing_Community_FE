"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import React from "react";

export default function ProfileUser() {
  return (
    <Card className="p-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-4 border-b-2 pb-3">
          <Link href="#">
            <Avatar className="w-16 h-16 sm:w-16 sm:h-16 border-2 border-rose-300 ">
              <AvatarImage
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-register.jpg?alt=media&token=0bead35e-556e-4935-945e-909d9cee4483"
                alt="Gia Minh"
              />
              <AvatarFallback>HA</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <Link href="#">
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                GiaMinh
              </h2>
            </Link>
            <p className="text-sm text-gray-500">Tuổi project</p>
            <p className="text-sm font-bold ">100 ngày</p>
          </div>
        </div>

        <div className="mt-5 mb-5 mx-2 flex gap-2 justify-between">
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-base sm:text-base md:text-xs lg:text-base">
              Bài đã lưu
            </span>
            <span className="font-bold">5</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-base sm:text-base md:text-xs lg:text-base">
              Lượt thích
            </span>
            <span className="font-bold">100</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-gray-500 text-base sm:text-base md:text-xs lg:text-base">
              Lượt theo dõi
            </span>
            <span className="font-bold">100</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
