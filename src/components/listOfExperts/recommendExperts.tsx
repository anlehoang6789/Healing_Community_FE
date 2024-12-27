"use client";

import React, { useEffect, useState } from "react";
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
import { useGetExpertListInfiniteQuery } from "@/queries/useExpert";
import { ExpertType } from "@/schemaValidations/expert.schema";
import Link from "next/link";

export default function RecommendExperts() {
  const { theme } = useTheme();
  const [ratingFilter, setRatingFilter] = useState<number | null>(null);
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const pageSize = 10;
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetExpertListInfiniteQuery(pageSize);

  const specialties = React.useMemo(() => {
    if (!data) return [];

    const allExperts = data.pages.flatMap((page) => page.payload.data);

    const allSpecialties = allExperts.flatMap((expert) =>
      expert.specialization.split(",").map((spec) => spec.trim())
    );

    return Array.from(new Set(allSpecialties)).sort();
  }, [data]);

  // Xử lý lazy load
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight * 0.8 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
          .catch((error) => {
            console.error("Error while fetching next page:", error);
          })
          .finally(() => setIsLoadingMore(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Lọc chuyên gia
  const filteredExperts = React.useMemo(() => {
    if (!data) return [];

    const allExperts = data.pages.flatMap((page) => page.payload.data);

    // Sắp xếp theo điểm sao từ cao xuống thấp
    const sortedExperts = allExperts.sort((a, b) => {
      // Ưu tiên điểm sao
      if (b.averageRating !== a.averageRating) {
        return b.averageRating - a.averageRating;
      }

      // Nếu điểm sao bằng nhau, ưu tiên số lượt đặt lịch
      return b.totalAppointments - a.totalAppointments;
    });

    // Nếu không có filter, trả về danh sách đã sắp xếp
    if (
      (ratingFilter === null || ratingFilter === 0) &&
      specialtyFilter === null
    ) {
      return sortedExperts;
    }

    // Nếu có filter, thực hiện lọc
    return sortedExperts.filter((expert) => {
      // Lọc theo rating
      if (
        ratingFilter !== null &&
        ratingFilter !== 0 &&
        Math.floor(expert.averageRating) !== ratingFilter
      )
        return false;

      // Lọc theo chuyên môn
      if (
        specialtyFilter &&
        !expert.specialization
          .toLowerCase()
          .includes(specialtyFilter.toLowerCase())
      )
        return false;

      return true;
    });
  }, [data, ratingFilter, specialtyFilter]);

  // Expert Card Component
  function ExpertCard({ expert }: { expert: ExpertType }) {
    const specialties = expert.specialization
      .split(",")
      .map((spec) => spec.trim());
    return (
      <Link href={`/user/profile/expert-info/${expert.expertId}`}>
        <Card className="overflow-hidden relative w-full">
          <CardContent className="p-4 flex items-center">
            <div className="mr-6">
              <Image
                src={
                  expert.profileImageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt={expert.fullname}
                width={150}
                height={150}
                className="object-cover w-[100px] h-[100px] rounded-md"
              />
            </div>
            <div className="flex-grow">
              <div className="absolute top-2 right-2 z-10">
                <span className="font-semibold text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full flex items-center gap-1">
                  {expert.averageRating.toFixed(1)}/5
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                </span>
              </div>
              <h3 className="font-semibold text-xl mb-2">{expert.fullname}</h3>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className="font-semibold text-lg">Chuyên môn:</span>

                {specialties.map((spec, index) => (
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
                  {expert.totalRatings} lượt
                </span>
              </div>

              <div>
                <span className="font-semibold text-lg">Lượt đặt lịch:</span>
                <span className="text-muted-foreground text-base px-2 py-1 rounded-full ">
                  {expert.totalAppointments} lượt
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <div className="container mx-auto pb-8">
      <div className="grid  md:grid-cols-4 gap-6">
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

            <div className="flex md:flex-col gap-2 overflow-x-auto scrollbar-hide">
              <div className="flex md:flex-col gap-2">
                <Button
                  variant={specialtyFilter === null ? "default" : "outline"}
                  onClick={() => setSpecialtyFilter(null)}
                  className="w-auto shrink-0"
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
                    className="w-auto shrink-0"
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
        </div>

        {/* Experts Section - Right Side */}
        <div className="col-span-3">
          <div className="flex flex-col gap-6">
            {filteredExperts.length > 0 ? (
              filteredExperts.map((expert) => (
                <ExpertCard key={expert.expertId} expert={expert} />
              ))
            ) : (
              <div className="text-center text-red-500">
                Không có dữ liệu trùng khớp
              </div>
            )}
          </div>

          {hasNextPage && (
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              className="mt-4"
            >
              {isFetchingNextPage ? "Đang tải thêm..." : "Tải thêm"}
            </Button>
          )}

          {isLoadingMore && (
            <div className="text-center">Đang tải thêm chuyên gia...</div>
          )}
        </div>
      </div>
    </div>
  );
}
