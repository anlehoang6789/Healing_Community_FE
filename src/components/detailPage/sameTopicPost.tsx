"use client";

import { Card, CardContent } from "@/components/ui/card";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import React from "react";

interface Post {
  title: string;
  description: string;
  date: string;
  imageUrl: string;
  hashtags: string[];
}

const posts: Post[] = [
  {
    title: "4 bước để có cuộc sống khoẻ mạnh",
    description:
      "Để có cuộc sống khoẻ mạnh hãy làm việc thật ý nghĩa và lạc quan. Ngoài những tính năng liên quan đến Apple Intelligence, thì nó cũng có những tính năng đúng như tên gọi của nó - Camera Control. Anh em có thể sử dụng Camera Control để zoom in",
    date: "13/2/2023 1:23",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    hashtags: ["#chualanh", "#cuocsong", "#songtot", "#hoiphuc"],
  },
  {
    title: "4 bước để có cuộc sống khoẻ mạnh",
    description:
      "Để có cuộc sống khoẻ mạnh hãy làm việc thật ý nghĩa và lạc quan. Ngoài những tính năng liên quan đến Apple Intelligence, thì nó cũng có những tính năng đúng như tên gọi của nó - Camera Control. Anh em có thể sử dụng Camera Control để zoom in",
    date: "13/2/2023 1:23",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    hashtags: ["#chualanh", "#cuocsong", "#songtot", "#hoiphuc"],
  },
  {
    title: "4 bước để có cuộc sống khoẻ mạnh",
    description:
      "Để có cuộc sống khoẻ mạnh hãy làm việc thật ý nghĩa và lạc quan. Ngoài những tính năng liên quan đến Apple Intelligence, thì nó cũng có những tính năng đúng như tên gọi của nó - Camera Control. Anh em có thể sử dụng Camera Control để zoom in",
    date: "13/2/2023 1:23",
    imageUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    hashtags: ["#chualanh", "#cuocsong", "#songtot", "#hoiphuc"],
  },
];
export default function SameTopicPost() {
  return (
    <Card className="py-4 px-10">
      <h2 className="text-xl font-semibold text-center mb-4">
        Bài viết cùng chủ đề
      </h2>

      <div className="space-y-4">
        {posts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <CardContent className="flex flex-col py-2 px-2">
              <Image
                src={post.imageUrl}
                alt={post.title}
                width={4000}
                height={120}
                className="md:h-72 sm:h-60 h-60 rounded-lg object-cover"
                priority
              />
              <div className="ml-4 flex flex-col justify-between">
                <div>
                  <h3 className="lg:text-lg md:text-2xl sm:text-2xl text-lg mt-2 font-medium text-textChat">
                    {post.title}
                  </h3>
                  <p className="lg:text-sm md:text-xl sm:text-xl text-sm text-muted-foreground line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center text-gray-500 text-xs mt-2">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  <span>{post.date}</span>
                </div>
                <div className="text-xs mt-2 text-gray-500">
                  {post.hashtags.join(" ")}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Card>
  );
}
