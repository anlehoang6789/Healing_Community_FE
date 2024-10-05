"use client";

import { Button } from "@/components/ui/button";
import { BadgeCheck, Bell } from "lucide-react";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface User {
  name: string;
  posts: number;
  avatarUrl: string;
}

const followedUsers: User[] = [
  {
    name: "GiaMinh",
    posts: 2,
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "HungNghia",
    posts: 0,
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "ThanhDat",
    posts: 10,
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "TrongNghia",
    posts: 12,
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

export default function FollowedUser() {
  return (
    <div className="p-4 rounded-lg shadow-lg border">
      <h2 className="text-lg font-bold pb-2 text-gray-500">Đã theo dõi</h2>

      <ul className="space-y-5">
        {followedUsers.map((user) => (
          <li
            key={user.name}
            className="flex justify-between items-center my-2"
          >
            <Link
              href={`/user/${user.name}`}
              className="flex items-center space-x-2 sm:space-x-2 md:space-x-1 lg:space-x-3"
            >
              <Image
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10 md:w-7 md:h-7 sm:w-10 sm:h-10 lg:w-10 lg:h-10"
                priority
              />
              <div className="flex flex-col">
                <p className="truncate max-w-[100px] bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 text-base sm:text-base md:text-xs lg:text-base">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user.posts} bài viết mới
                </p>
              </div>
            </Link>

            <div className="flex items-center space-x-1 sm:space-x-1 md:space-x-1 lg:space-x-2">
              <Button
                variant="outline"
                className="flex items-center bg-[#A4DDED] text-black text-xs rounded-full border-none px-4 py-2 md:px-1 md:py-0 sm:px-4 sm:py-2 lg:px-3 lg:py-1 sm:text-xs md:text-[10px] lg:text-xs"
              >
                <BadgeCheck
                  className="w-5 h-5 mr-1 text-green-700 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-5 sm:h-5"
                  strokeWidth="3px"
                />
                Đã theo dõi
              </Button>
              <Bell className="text-yellow-500 w-5 h-5 lg:w-5 lg:h-5 md:w-4 md:h-4 sm:w-5 sm:h-5" />
            </div>
          </li>
        ))}
      </ul>

      <Link href="#" className="flex justify-end mt-6 text-sm sm:text-xs">
        <span className="text-gray-500">Xem tất cả</span>
      </Link>
    </div>
  );
}
