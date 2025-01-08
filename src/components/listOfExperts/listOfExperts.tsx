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

export default function ExpertsPage() {
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

    return allExperts.filter((expert) => {
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

  function ExpertCard({ expert }: { expert: ExpertType }) {
    const specialties = expert.specialization
      .split(",")
      .map((spec) => spec.trim());

    return (
      <Link href={`/user/profile/${expert.expertId}/expert-info`}>
        <Card className="overflow-hidden relative md:w-[260px]">
          <CardContent className="p-4">
            <div className="absolute top-2 right-2 z-10">
              <span className="font-semibold text-yellow-600 bg-yellow-100 px-1 py-1 rounded-full flex items-center gap-1 text-sm">
                {expert.averageRating.toFixed(1)}/5
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
              </span>
            </div>
            <div className="flex items-center justify-center pb-4">
              <Image
                src={
                  expert.profileImageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt={expert.fullname}
                width={100}
                height={100}
                className="object-cover w-[100px] h-[100px] rounded-md"
              />
            </div>
            <div className="text-center">
              <h3 className="font-semibold text-lg ">{expert.fullname}</h3>

              <div className="flex items-center justify-center gap-2 mt-2 flex-wrap h-[64px] overflow-x-auto">
                {specialties.map((specialty, index) => (
                  <span
                    key={index}
                    className={`text-muted-foreground text-sm px-2 py-1 rounded-full ${
                      theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    {specialty}
                  </span>
                ))}
                <span
                  className={`text-muted-foreground text-sm px-2 py-1 rounded-full ${
                    theme === "dark" ? "bg-gray-700" : "bg-gray-200"
                  }`}
                >
                  {expert.totalRatings} đánh giá
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
              <span className="text-muted-foreground">
                {expert.totalAppointments}
              </span>
            </div>
          </CardFooter>
        </Card>
      </Link>
    );
  }

  return (
    <div className="container mx-auto pb-8">
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

          <div className="flex items-center gap-4 w-[500px] overflow-x-auto pb-2 ">
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

        <div className="grid grid-cols-1 gap-4 md:flex md:gap-4 ">
          {filteredExperts.length === 0 ? (
            <div className="text-center text-red-500 col-span-4">
              Không có chuyên gia nào phù hợp
            </div>
          ) : (
            filteredExperts.map((expert) => (
              <ExpertCard key={expert.expertId} expert={expert} />
            ))
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
  );
}
