"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
interface Bookmark {
  id: number;
  title: string;
  description: string;
  author: string;
  authorImageUrl: string;
  imageUrl: string;
}

const bookmarks: Bookmark[] = [
  {
    id: 1,
    title:
      "IFA21: Trên tay máy lọc không khí LG PuriCare dành cho người nuôi mèo",
    description:
      "Tại IFA 2024, LG đã mang tới một chiếc máy lọc không khí PuriCare dành cho những người đang nuôi mèo, kết hợp công nghệ lọc không khí với một ổ ngủ kèm nhiều tính năng khác dành cho các boss. Về cơ bản thì chiếc máy lọc này tương tự như chiếc máy này. Rất tốt và đáng sử dụng",
    author: "ND Minh Đức",
    authorImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 2,
    title:
      "IFA22: Trên tay máy lọc không khí LG PuriCare dành cho người nuôi mèo",
    description:
      "Tại IFA 2024, LG đã mang tới một chiếc máy lọc không khí PuriCare dành cho những người đang nuôi mèo, kết hợp công nghệ lọc không khí với một ổ ngủ kèm nhiều tính năng khác dành cho các boss. Về cơ bản thì chiếc máy lọc này tương tự như chiếc máy này. Rất tốt và đáng sử dụng",
    author: "ND Minh Đức",
    authorImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 3,
    title:
      "IFA23: Trên tay máy lọc không khí LG PuriCare dành cho người nuôi mèo",
    description:
      "Tại IFA 2024, LG đã mang tới một chiếc máy lọc không khí PuriCare dành cho những người đang nuôi mèo, kết hợp công nghệ lọc không khí với một ổ ngủ kèm nhiều tính năng khác dành cho các boss. Về cơ bản thì chiếc máy lọc này tương tự như chiếc máy này. Rất tốt và đáng sử dụng",
    author: "ND Minh Đức",
    authorImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 4,
    title:
      "IFA24: Trên tay máy lọc không khí LG PuriCare dành cho người nuôi mèo",
    description:
      "Tại IFA 2024, LG đã mang tới một chiếc máy lọc không khí PuriCare dành cho những người đang nuôi mèo, kết hợp công nghệ lọc không khí với một ổ ngủ kèm nhiều tính năng khác dành cho các boss. Về cơ bản thì chiếc máy lọc này tương tự như chiếc máy này. Rất tốt và đáng sử dụng",
    author: "ND Minh Đức",
    authorImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 5,
    title:
      "IFA25: Trên tay máy lọc không khí LG PuriCare dành cho người nuôi mèo",
    description:
      "Tại IFA 2024, LG đã mang tới một chiếc máy lọc không khí PuriCare dành cho những người đang nuôi mèo, kết hợp công nghệ lọc không khí với một ổ ngủ kèm nhiều tính năng khác dành cho các boss. Về cơ bản thì chiếc máy lọc này tương tự như chiếc máy này. Rất tốt và đáng sử dụng",
    author: "ND Minh Đức",
    authorImageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

export default function BookMarkList() {
  return (
    <div className="flex flex-col gap-4 p-4 rounded-lg shadow-lg border">
      <h2 className="font-bold text-gray-500 text-xl">Các bài viết đã lưu</h2>
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="flex items-center gap-4 p-4">
          <Image
            src={bookmark.imageUrl}
            alt={bookmark.title}
            width={100}
            height={100}
            className="object-cover rounded-lg "
            style={{ width: "auto", height: "auto" }}
          />

          <div>
            <Link href="#" className="hover:underline">
              <h3 className="font-bold line-clamp-1">{bookmark.title}</h3>
            </Link>
            <p className="text-sm pt-4 line-clamp-2 ">{bookmark.description}</p>
            <Link href="#" className="hover:underline">
              <div className="flex items-center gap-2 mt-4 ">
                <Avatar className="w-8 h-8 border-2 border-rose-300">
                  <AvatarImage
                    src={bookmark.authorImageUrl}
                    alt={bookmark.author}
                  />
                </Avatar>
                <span className="text-xs text-gray-500 line-clamp-1">
                  by {bookmark.author}
                </span>
              </div>
            </Link>
          </div>
          <Button variant="headerIconNoBorder">
            <Bookmark
              className="ml-auto w-7 h-7"
              strokeWidth="1px"
              fill="#2FC1BE"
              stroke="#2FC1BE"
            />
          </Button>
        </Card>
      ))}
    </div>
  );
}
