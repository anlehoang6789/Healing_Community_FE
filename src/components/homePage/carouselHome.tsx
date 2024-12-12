"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const carouselItems = [
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/carousel%2Fcarousel1.png?alt=media&token=fd9c745e-c1b7-40b4-a360-136371cbf1de",
    quote:
      "Hầu hết mọi thứ sẽ hoạt động trở lại nếu bạn rút phích cắm ra trong vài phút, kể cả bạn.",
    author: "Anne Lamott",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/carousel%2Fcarousel2.png?alt=media&token=2526768d-3f1b-48e4-9a4e-c4d985c380c9",
    quote:
      "Việc chữa lành cần có lòng can đảm, và tất cả chúng ta đều có lòng can đảm, ngay cả khi phải đào sâu một chút để tìm thấy nó.",
    author: "Tori Amos",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/carousel%2Fcarousel3.png?alt=media&token=33ac515d-e5fc-4a11-af96-9ab8e60edbbf",
    quote: "Giữa mọi khó khăn đều có cơ hội.",
    author: "Albert Einstein",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/carousel%2Fcarousel6.png?alt=media&token=63f825d7-bcef-46e8-9a59-cb2d583cbb69",
    tip: "Đừng so sánh hành trình của bạn với người khác, mỗi bông hoa đều nở rộ vào thời điểm riêng của nó.",
  },
  {
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/carousel%2Fcarousel7.png?alt=media&token=8f99face-0af4-4f12-8ec9-e133610f3084",
    tip: "Không sao cả nếu bạn cần thời gian để chữa lành, hãy tiến chậm nhưng chắc chắn.",
  },
];

export default function CarouselHome() {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 4000,
        }),
      ]}
      className="w-full max-w-[1400px] mx-auto"
    >
      <CarouselContent>
        {carouselItems.map((item, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex flex-col aspect-square items-center justify-center p-6 relative">
                  <Image
                    src={item.image}
                    alt={item.quote || item.tip || "Healing image"}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="rounded-lg object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center text-white p-4 rounded-lg">
                    {item.quote ? (
                      <>
                        <blockquote className="text-lg font-semibold text-center mb-2">
                          {item.quote}
                        </blockquote>
                        <cite className="text-sm">- {item.author}</cite>
                      </>
                    ) : (
                      <p className="text-lg font-semibold text-center">
                        {item.tip}
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="text-textChat hidden " />
      <CarouselNext className="text-textChat hidden" />
    </Carousel>
  );
}
