"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Article {
  id: number;
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  image: string;
}

const articles: Article[] = [
  {
    id: 1,
    title: "So sánh iPhone 16 Plus VS iPhone 15 Plus",
    excerpt:
      "Giống với bản thường, Apple Watch Series 10 bản titan có màn hình lớn hơn chút so với đời trước với size 46mm và diện tích hiển thị 1220 sq mm. Nếu nhìn qua hình Apple thì khó nhận biết được nó to hơn nhưng nếu cầm trên tay thì màn hình của nó to hơn đáng kể, đây là điều rất giá trị vì mình hay đặt hình nền bằng hình ảnh cá nhân của mình, có thể là hình người, cảnh hay bất kỳ thứ gì đó mình chụp lại được mà mình thích.",
    author: {
      name: "Cao - Foxtek",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 2,
    title:
      "Sự phát triển của vali: từ những chiếc rương nặng nề đến thiết kế hiện đại",
    excerpt:
      "Giống với bản thường, Apple Watch Series 10 bản titan có màn hình lớn hơn chút so với đời trước với size 46mm và diện tích hiển thị 1220 sq mm. Nếu nhìn qua hình Apple thì khó nhận biết được nó to hơn nhưng nếu cầm trên tay thì màn hình của nó to hơn đáng kể, đây là điều rất giá trị vì mình hay đặt hình nền bằng hình ảnh cá nhân của mình, có thể là hình người, cảnh hay bất kỳ thứ gì đó mình chụp lại được mà mình thích.",
    author: {
      name: "Rubi Lee",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 3,
    title: "Top 5 điểm ấn tượng trên iPhone 16 Pro: niềm vui trở lại",
    excerpt:
      "Giống với bản thường, Apple Watch Series 10 bản titan có màn hình lớn hơn chút so với đời trước với size 46mm và diện tích hiển thị 1220 sq mm. Nếu nhìn qua hình Apple thì khó nhận biết được nó to hơn nhưng nếu cầm trên tay thì màn hình của nó to hơn đáng kể, đây là điều rất giá trị vì mình hay đặt hình nền bằng hình ảnh cá nhân của mình, có thể là hình người, cảnh hay bất kỳ thứ gì đó mình chụp lại được mà mình thích.",
    author: {
      name: "Anh Tú",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 4,
    title:
      "Phó chủ tịch AMD nói năm nay sẽ không có card đồ họa gaming flagship cạnh tranh với Nvidia",
    excerpt:
      "Giống với bản thường, Apple Watch Series 10 bản titan có màn hình lớn hơn chút so với đời trước với size 46mm và diện tích hiển thị 1220 sq mm. Nếu nhìn qua hình Apple thì khó nhận biết được nó to hơn nhưng nếu cầm trên tay thì màn hình của nó to hơn đáng kể, đây là điều rất giá trị vì mình hay đặt hình nền bằng hình ảnh cá nhân của mình, có thể là hình người, cảnh hay bất kỳ thứ gì đó mình chụp lại được mà mình thích.",
    author: {
      name: "PW",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 5,
    title: "Nhận định về sự kiện iPhone 16: nói chân mà có cải hay",
    excerpt:
      "Giống với bản thường, Apple Watch Series 10 bản titan có màn hình lớn hơn chút so với đời trước với size 46mm và diện tích hiển thị 1220 sq mm. Nếu nhìn qua hình Apple thì khó nhận biết được nó to hơn nhưng nếu cầm trên tay thì màn hình của nó to hơn đáng kể, đây là điều rất giá trị vì mình hay đặt hình nền bằng hình ảnh cá nhân của mình, có thể là hình người, cảnh hay bất kỳ thứ gì đó mình chụp lại được mà mình thích.",
    author: {
      name: "cuhiep",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 6,
    title:
      "Apple ra mắt iPhone 16 Pro và iPhone 16 Pro Max: màu mới, nút Camera Control, chip A18 Pro",
    excerpt:
      "Giống với bản thường, Apple Watch Series 10 bản titan có màn hình lớn hơn chút so với đời trước với size 46mm và diện tích hiển thị 1220 sq mm. Nếu nhìn qua hình Apple thì khó nhận biết được nó to hơn nhưng nếu cầm trên tay thì màn hình của nó to hơn đáng kể, đây là điều rất giá trị vì mình hay đặt hình nền bằng hình ảnh cá nhân của mình, có thể là hình người, cảnh hay bất kỳ thứ gì đó mình chụp lại được mà mình thích.",
    author: {
      name: "Pnghuy",
      avatar:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];
export default function Posts() {
  return (
    <div className="w-full mx-auto">
      <div>
        <div className="space-y-6">
          {articles.map((article) => (
            <div key={article.id} className="flex space-x-4">
              <Link href="#">
                <Image
                  src={article.image}
                  alt={article.title}
                  width={100}
                  height={100}
                  className="rounded-md"
                />
              </Link>
              <div className="flex-1">
                <Link href="#" className="hover:underline">
                  <h3 className="font-bold text-lg mb-2 text-muted-foreground md:line-clamp-1">
                    {article.title}
                  </h3>
                </Link>
                <p className="text-sm text-gray-600 mb-2 text-muted-foreground hidden sm:line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
                  {article.excerpt}
                </p>
                <div className="flex items-center space-x-2">
                  <Link href="#" className="flex gap-1 items-center">
                    <Avatar className="w-6 h-6 border-2 border-rose-300">
                      <AvatarImage
                        src={article.author.avatar}
                        alt={article.author.name}
                      />
                      <AvatarFallback>
                        <User className="w-4 h-4" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      {article.author.name}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
