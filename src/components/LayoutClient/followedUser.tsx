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
    <div className="p-4 rounded-lg shadow-lg bg-white">
      <h2 className="text-lg font-bold pb-2">Đã theo dõi</h2>
      <ul className="space-y-5">
        {followedUsers.map((user) => (
          <li
            key={user.name}
            className="flex justify-between items-center my-2 space-x-32"
          >
            <Link
              href={`/user/${user.name}`}
              className="flex items-center space-x-4"
            >
              <Image
                src={user.avatarUrl}
                alt={`${user.name}'s avatar`}
                width={40}
                height={40}
                className="rounded-full object-cover w-10 h-10"
              />
              <div>
                <p className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500">
                  {user.posts} bài viết mới
                </p>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Button className="flex items-center bg-[#A4DDED] text-black rounded-full">
                <BadgeCheck
                  className="w-5 h-5 mr-3 text-green-700"
                  strokeWidth="3px"
                />
                Đã theo dõi
              </Button>
              <Bell className="text-yellow-500 w-5 h-5" />
            </div>
          </li>
        ))}
      </ul>
      <Link href="#" className="flex justify-end mt-6">
        <span>Xem tất cả</span>
      </Link>
    </div>
  );
}
