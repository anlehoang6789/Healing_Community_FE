"use client";

import { CardContent, CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import React from "react";

interface HotPost {
  id: number;
  title: string;
  author: string;
  content: string;
  img: string;
}

const hotposts: HotPost[] = [
  {
    id: 1,
    title: "Trên tay nhanh Honor Magic V3 (Smartphone Màn hình gập siêu mỏng)",
    author: "huyhoang@95",
    content:
      "Honor Magic V3 là chiếc điện thoại màn hình gập siêu mỏng vừa ra mắt với nhiều tính năng độc đáo.",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 2,
    title: "Apple khai tử ốp FineWoven và ra mắt ví silicon mới cho iPhone 16",
    author: "zyzy1908",
    content:
      "Theo Wall Street Journal, 4 nhân viên này bị cáo buộc tội danh tương tự như vi phạm lòng tin, mặc dù chi tiết cụ thể vẫn chưa được làm rõ. Hội đồng các vấn đề đại lục Đài Loan (MAC) lên án hành động này là vô lý và cảnh báo rằng việc giam giữ tùy tiện có thể làm xói mòn niềm tin của nhà đầu tư vào môi trường kinh doanh tại Trung Quốc. MAC cũng cho biết thêm, mặc dù chưa có thông tin về thiệt hại tài chính, nhưng vụ việc này chắc chắn sẽ tạo ra bầu không khí bất an và lo lắng trong cộng đồng doanh nghiệp. Việc bắt giữ nhân viên người Đài Loan được xem là một chiến thuật mới trong chiến dịch gây áp lực của Bắc Kinh. Vụ việc này đặt ra thêm một thách thức lớn đối với Apple, công ty đang nỗ lực đa dạng hóa chuỗi cung ứng và giảm sự phụ thuộc vào sản xuất tại Trung Quốc. Trước đó, nhà sản xuất chip TSMC của Apple, đóng vai trò then chốt trong chuỗi cung ứng của hãng, đã lên kế hoạch vô hiệu hóa thiết bị từ xa để ngăn chặn công nghệ tiên tiến rơi vào tay Trung Quốc trong trường hợp xảy ra xung đột.",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 3,
    title: "Samsung ra mắt máy giặt sấy AI tại Việt Nam",
    author: "zyzy1908",
    content:
      "Samsung trình làng dòng máy giặt sấy mới với AI Heatpump tại sự kiện IFA 2024.",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 4,
    title: "Công nghệ mới cho nhà thông minh từ Google",
    author: "techguru",
    content:
      "Google ra mắt loạt sản phẩm mới hỗ trợ nhà thông minh với nhiều cải tiến đột phá.",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 5,
    title: "Công nghệ mới cho nhà thông minh từ Google",
    author: "techguru",
    content:
      "Google ra mắt loạt sản phẩm mới hỗ trợ nhà thông minh với nhiều cải tiến đột phá.",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

export default function HotPosts() {
  return (
    <div className="">
      {/* Grid cho màn hình lớn */}
      <div className="grid gap-4 lg:grid-cols-3 ">
        {/* Phần card lớn (màn hình lớn) */}
        <div className="lg:col-span-2">
          <CardHeader className="p-0">
            <Link href="#">
              <Image
                src={hotposts[0].img}
                alt={hotposts[0].title}
                width={620}
                height={500}
                className="rounded-lg w-full h-[500px] object-cover"
                priority
              />
            </Link>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <Link href="#" className="hover:underline">
              <h3 className="text-xl font-semibold text-muted-foreground">
                {hotposts[0].title}
              </h3>
            </Link>
            <Link href="#" className="hover:underline">
              <p className="text-sm text-muted-foreground">
                {hotposts[0].author}
              </p>
            </Link>
          </CardContent>
        </div>

        {/* Cột nhỏ bên phải (màn hình lớn) */}
        <div className="hidden lg:block">
          <CardHeader className="p-0">
            <Link href="#">
              <Image
                src={hotposts[1].img}
                alt={hotposts[1].title}
                width={600}
                height={500}
                className="rounded-lg w-full h-auto"
                priority
              />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Link href="#" className="hover:underline">
              <h4 className="mt-2 text-lg font-semibold text-muted-foreground">
                {hotposts[1].title}
              </h4>
            </Link>
            <Link href="#" className="hover:underline">
              <p className="text-sm text-muted-foreground">
                {hotposts[1].author}
              </p>
            </Link>
            <p className="mt-1 text-muted-foreground lg:line-clamp-6 md:hidden">
              {hotposts[1].content}
            </p>
          </CardContent>
        </div>

        {/* Ba card nhỏ (Màn hình lớn) */}
        <div className="hidden lg:grid lg:col-span-3 grid-cols-1 md:grid-cols-3 gap-4">
          {hotposts.slice(2).map((post) => (
            <div key={post.id}>
              <CardHeader className="p-0">
                <Link href="#">
                  <Image
                    src={post.img}
                    alt={post.title}
                    width={500}
                    height={300}
                    className="rounded-lg w-full"
                    priority
                  />
                </Link>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <Link href="#" className="hover:underline">
                  <h4 className="text-lg font-semibold text-muted-foreground">
                    {post.title}
                  </h4>
                </Link>
                <Link href="#" className="hover:underline">
                  <p className="text-sm text-gray-500">{post.author}</p>
                </Link>
              </CardContent>
            </div>
          ))}
        </div>
      </div>

      {/* Layout cho responsive */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-2 sm:grid-cols-2 xs:grid-cols-2 lg:hidden pt-4">
        {/* Cột nhỏ bên phải (hiện khi responsive) */}
        <div>
          <CardHeader className="p-0">
            <Link href="#">
              <Image
                src={hotposts[1].img}
                alt={hotposts[1].title}
                width={600}
                height={500}
                className="rounded-lg w-full h-auto"
                priority
              />
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <Link href="#" className="hover:underline">
              <h4 className="mt-2 text-lg font-semibold text-muted-foreground">
                {hotposts[1].title}
              </h4>
            </Link>
            <Link href="#" className="hover:underline">
              <p className="text-sm text-muted-foreground">
                {hotposts[1].author}
              </p>
            </Link>
          </CardContent>
        </div>

        {/* Ba card nhỏ (mỗi card chiếm 1/2 màn hình khi responsive) */}
        {hotposts.slice(2).map((post) => (
          <div key={post.id}>
            <CardHeader className="p-0">
              <Link href="#">
                <Image
                  src={post.img}
                  alt={post.title}
                  width={500}
                  height={300}
                  className="rounded-lg w-full"
                  priority
                />
              </Link>
            </CardHeader>
            <CardContent className="p-0 pt-2">
              <Link href="#" className="hover:underline">
                <h4 className="text-lg font-semibold text-muted-foreground">
                  {post.title}
                </h4>
              </Link>
              <Link href="#" className="hover:underline">
                <p className="text-sm text-gray-500">{post.author}</p>
              </Link>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
}
