"use client";

import { useState } from "react";
import { Star } from "lucide-react";
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

// Types (same as in listOfExperts.tsx)
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

// Experts data (same as in listOfExperts.tsx)
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

// Specialties array (same as in listOfExperts.tsx)
const specialties: Specialty[] = [
  "Tâm lý",
  "Thư giãn",
  "Tâm thần học",
  "Dinh dưỡng",
  "Vật lý trị liệu",
];

export default function RecommendExperts() {
  const { theme } = useTheme();
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<Specialty | null>(
    null
  );

  // Filtering logic (same as in listOfExperts.tsx)
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

  // Expert Card Component
  function ExpertCard({ expert }: { expert: Expert }) {
    return (
      <Card className="overflow-hidden relative w-full">
        <CardContent className="p-4 flex items-center">
          <div className="mr-6">
            <Image
              src={expert.image}
              alt={expert.name}
              width={150}
              height={150}
              className="object-cover w-[100px] h-[100px] rounded-md"
            />
          </div>
          <div className="flex-grow">
            <div className="absolute top-2 right-2 z-10">
              <span className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full flex items-center gap-1">
                {expert.rating}/5
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              </span>
            </div>
            <h3 className="font-semibold text-xl mb-2">{expert.name}</h3>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="font-semibold text-lg">Chuyên môn:</span>

              {expert.specialty.map((spec, index) => (
                <span
                  key={index}
                  className={`text-muted-foreground text-base px-2 py-1 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  {spec}
                </span>
              ))}
            </div>

            <div>
              <span className="font-semibold text-lg">Lượt đánh giá:</span>
              <span className="text-muted-foreground text-base px-2 py-1 rounded-full ">
                {expert.reviewCount} lượt
              </span>
            </div>

            <div>
              <span className="font-semibold text-lg">Lượt đặt lịch:</span>
              <span className="text-muted-foreground text-base px-2 py-1 rounded-full ">
                {expert.bookings} lượt
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="container mx-auto pb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Filter Section - Left Side */}
        <div className="col-span-1">
          <div className="sticky top-4 flex flex-col gap-4">
            <Select onValueChange={(value) => setRatingFilter(Number(value))}>
              <SelectTrigger className="w-full text-textChat">
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

            <div className="flex flex-col gap-2">
              <Button
                variant={specialtyFilter === null ? "default" : "outline"}
                onClick={() => setSpecialtyFilter(null)}
                className="w-full"
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
                  variant={
                    specialtyFilter === specialty ? "default" : "outline"
                  }
                  onClick={() => setSpecialtyFilter(specialty)}
                  className="w-full"
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
        </div>

        {/* Experts Section - Right Side */}
        <div className="col-span-3">
          <div className="flex flex-col gap-6">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <ExpertCard key={expert.id} expert={expert} />
              ))
            ) : (
              <div className="text-center text-red-500">
                Không có dữ liệu trùng khớp
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
