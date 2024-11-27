"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { X } from "lucide-react";
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
    <div>
      {articles.map((article) => (
        <div
          //  key={post.postId}
          key={article.id}
          className="p-4 rounded-lg shadow-lg border mb-6"
        >
          <div className="flex items-center gap-4 mb-6">
            {/* Avatar, name*/}
            <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
              <AvatarImage
                //  src={userById?.payload.data.profilePicture}
                //  alt={
                //    userById?.payload.data.fullName ||
                //    userById?.payload.data.userName
                //  }
                src={article.author.avatar}
                alt={article.author.name}
              />
              <AvatarFallback>
                {/* {userById?.payload.data.fullName ||
                   userById?.payload.data.userName} */}
                {article.author.name}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {/* {userById?.payload.data.fullName ||
                   userById?.payload.data.userName} */}
                {article.author.name}
              </h2>
              <p className="text-sm text-gray-500">
                {/* {formatDateTime(post.createAt)} */}
                27/11/2024
              </p>
            </div>
            <Button
              className="ml-auto rounded-full"
              variant={"ghost"}
              size={"icon"}
            >
              <X className="w-4 h-4 text-textChat" />
            </Button>
          </div>

          {/* Body of story */}

          {/* <div className="whitespace-pre-wrap mb-4 text-textChat">
             <div className="font-bold text-lg text-center mb-2">
               {post.title}
             </div>
             <div
               dangerouslySetInnerHTML={{
                 __html: isExpanded
                   ? post.description
                   : post.description.slice(0, 300) +
                     (truncate ? "..." : ""),
               }}
             />
           </div> */}

          <div className="whitespace-pre-wrap mb-4 text-textChat">
            <div className="font-bold text-lg text-center mb-2">
              {/* {post.title} */}
              {article.title}
            </div>
            {/* <div
                 dangerouslySetInnerHTML={{
                   __html: post.description,
                 }}
               /> */}
            {article.excerpt}
            <Image
              src={
                "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              }
              alt="Banner"
              width={1000}
              height={500}
              className="w-full h-auto md:h-[450px] object-cover mt-4 rounded-md"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
