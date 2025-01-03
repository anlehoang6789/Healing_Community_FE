"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDateTime } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetExpertRatingQuery } from "@/queries/useExpert";
import { Star } from "lucide-react";

const UserProfileRating = ({
  userId,
  rating,
  time,
}: {
  userId: string;
  rating: number;
  time: string;
}) => {
  const { data, isLoading, isError } = useGetUserProfileQuery(userId);
  if (isLoading)
    return (
      <div className="flex justify-between mb-2 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="bg-gray-400 rounded-full h-10 w-10"></div>
          <div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-1"></div>
            <div className="flex">
              <div className="h-4 bg-gray-200 rounded w-4"></div>
              <div className="h-4 bg-gray-200 rounded w-4 ml-1"></div>
              <div className="h-4 bg-gray-200 rounded w-4 ml-1"></div>
              <div className="h-4 bg-gray-200 rounded w-4 ml-1"></div>
              <div className="h-4 bg-gray-200 rounded w-4 ml-1"></div>
            </div>
          </div>
        </div>
      </div>
    );
  if (isError)
    return <div className="text-textChat">Chức năng hiện đang bảo trì</div>;
  return (
    <div className="flex justify-between mb-2">
      <div className="flex items-center gap-2">
        <Avatar>
          <AvatarImage
            src={
              data?.payload.data.profilePicture ||
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            }
          />
          <AvatarFallback>
            {data?.payload.data.fullName || data?.payload.data.userName}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-medium">
            {data?.payload.data.fullName || data?.payload.data.userName}
          </div>
          <div className="flex items-center">
            {Array(5)
              .fill(null)
              .map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating
                      ? "fill-orange-500 text-orange-500"
                      : "fill-gray-300 text-gray-300"
                  }`}
                />
              ))}
            <div className="text-sm text-muted-foreground ml-2">
              {formatDateTime(time)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ViewRatingExpert({
  expertProfileId,
}: {
  expertProfileId: string;
}) {
  const { data } = useGetExpertRatingQuery(expertProfileId);
  const expertRatingList = data?.payload.data.ratings || [];
  return (
    <div className="max-w-3xl mx-auto p-4">
      {expertRatingList.length > 0 ? (
        <div className="bg-muted/20 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold mb-4">ĐÁNH GIÁ CHUYÊN GIA</h2>
            <div className="flex items-center gap-2 mb-4">
              <div className="text-4xl font-bold text-orange-500">
                {data?.payload.data.averageRating}
              </div>
              <div className="text-sm text-muted-foreground">trên 5</div>
              <div className="flex ml-2">
                {Array(5)
                  .fill(null)
                  .map((_, i) => {
                    const fullStar =
                      i < Math.floor(data?.payload.data.averageRating || 0);
                    const halfStar =
                      i < (data?.payload.data.averageRating ?? 0) &&
                      i >= Math.floor(data?.payload.data.averageRating || 0);

                    return (
                      <svg
                        key={i}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        className="w-5 h-5"
                        fill="none"
                      >
                        <defs>
                          {/* Định nghĩa gradient cho ngôi sao */}
                          <linearGradient
                            id={`gradient-${i}`}
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="0%"
                          >
                            <stop offset="50%" stopColor="rgb(249, 115, 22)" />{" "}
                            {/* Màu cam */}
                            <stop
                              offset="50%"
                              stopColor="rgb(209, 213, 219)"
                            />{" "}
                            {/* Màu xám */}
                          </linearGradient>
                        </defs>

                        <path
                          d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                          fill={
                            halfStar
                              ? `url(#gradient-${i})`
                              : fullStar
                              ? "rgb(249, 115, 22)"
                              : "rgb(209, 213, 219)"
                          }
                        />
                      </svg>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {expertRatingList.map((review) => (
              <div key={review.userId} className="border-b pb-4">
                <UserProfileRating
                  userId={review.userId}
                  rating={review.rating}
                  time={review.time}
                />
                <p className="mb-2">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
