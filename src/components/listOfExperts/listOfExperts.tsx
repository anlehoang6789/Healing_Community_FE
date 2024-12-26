"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { useTheme } from "next-themes";

// Types
type Specialty =
  | "Tâm lý"
  | "Thư giãn"
  | "Tâm thần học"
  | "Dinh dưỡng"
  | "Vật lý trị liệu";

interface Expert {
  id: string;
  name: string;
  image: string;
  specialty: Specialty[];

  rating: number;
  bookings: number;
  reviewCount: number;
}

const experts: Expert[] = [
  {
    id: "1",
    name: "TS. Nguyễn Văn A",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    specialty: ["Tâm lý", "Tâm thần học"],

    rating: 5,
    bookings: 128,
    reviewCount: 256,
  },
  {
    id: "2",
    name: "ThS. Trần Thị B",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    specialty: ["Thư giãn"],

    rating: 4,
    bookings: 96,
    reviewCount: 256,
  },
  {
    id: "3",
    name: "PGS. Lê Văn C",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    specialty: ["Tâm thần học"],

    rating: 3,
    bookings: 256,
    reviewCount: 256,
  },
  {
    id: "4",
    name: "TS. Phạm Thị D",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    specialty: ["Dinh dưỡng", "Tâm lý", "Tâm thần học", "Thư giãn"],

    rating: 4,
    bookings: 64,
    reviewCount: 256,
  },
  {
    id: "5",
    name: "ThS. Hoàng Văn E",
    image:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    specialty: ["Vật lý trị liệu"],

    rating: 1,
    bookings: 192,
    reviewCount: 256,
  },
];

// Specialties array
const specialties: Specialty[] = [
  "Tâm lý",
  "Thư giãn",
  "Tâm thần học",
  "Dinh dưỡng",
  "Vật lý trị liệu",
];

export default function ExpertsPage() {
  const { theme } = useTheme();
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | null>(
    null
  );

  const filteredExperts = experts.filter((expert) => {
    if (
      ratingFilter !== null &&
      ratingFilter !== 0 &&
      expert.rating !== ratingFilter
    )
      return false;

    if (specialtyFilter && !expert.specialty.includes(specialtyFilter))
      return false;

    return true;
  });

  function ExpertCard({ expert }: { expert: Expert }) {
    return (
      <Card className="overflow-hidden relative">
        <CardContent className="p-4">
          <div className="absolute top-2 right-2 z-10">
            <span className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full flex items-center gap-1">
              {expert.rating}/5
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            </span>
          </div>
          <div className="flex items-center justify-center pb-4">
            <Image
              src={expert.image}
              alt={expert.name}
              width={100}
              height={100}
              className="object-cover w-[100px] h-[100px] rounded-md"
            />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">{expert.name}</h3>

            <div className="flex items-center justify-center gap-2 mt-2 flex-wrap h-[64px]">
              {expert.specialty.map((spec, index) => (
                <span
                  key={index}
                  className={`text-muted-foreground text-sm px-2 py-1 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  {spec}
                </span>
              ))}
              <span
                className={`text-muted-foreground text-sm px-2 py-1 rounded-full ${
                  theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                }`}
              >
                {expert.reviewCount} đánh giá
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter
          className={`p-4 flex justify-between items-center ${
            theme === "dark" ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <span>Lượt đặt lịch</span>
          <div className="flex items-center gap-1">
            <div className="w-4 h-4 bg-green-400 rounded-full"></div>
            <span className="text-muted-foreground">{expert.bookings}</span>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-4 text-textChat">
        Danh sách chuyên gia
      </h1>
      <div className="flex flex-col gap-6">
        <div className="flex justify-between flex-col gap-4 lg:flex-row">
          <div className="flex items-center gap-4">
            <Select onValueChange={(value) => setRatingFilter(Number(value))}>
              <SelectTrigger className="w-[180px] text-textChat">
                <SelectValue placeholder="Đánh giá" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Tất cả</SelectItem>
                {[5, 4, 3, 2, 1].map((rating) => (
                  <SelectItem key={rating} value={rating.toString()}>
                    {Array.from({ length: rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="inline-block w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-4 overflow-x-auto">
            <Button
              variant={specialtyFilter === null ? "default" : "outline"}
              onClick={() => setSpecialtyFilter(null)}
            >
              <span
                className={
                  specialtyFilter === null ? "text-white" : "text-textChat"
                }
              >
                Tất cả
              </span>
            </Button>
            {specialties.map((specialty) => (
              <Button
                key={specialty}
                variant={specialtyFilter === specialty ? "default" : "outline"}
                onClick={() => setSpecialtyFilter(specialty)}
              >
                <span
                  className={
                    specialtyFilter === specialty
                      ? "text-white"
                      : "text-textChat"
                  }
                >
                  {specialty}
                </span>
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredExperts.length > 0 ? (
            filteredExperts.map((expert) => (
              <ExpertCard key={expert.id} expert={expert} />
            ))
          ) : (
            <div className="col-span-full text-center text-red-500">
              Không có dữ liệu trùng khớp
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
