"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Role } from "@/constants/type";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import {
  useGetDetailsCategoryQuery,
  useGetHighlightPostQuery,
} from "@/queries/usePost";
import { QuickPostType } from "@/schemaValidations/post.schema";
import Link from "next/link";
import React from "react";

const UserProfile = ({ userId }: { userId: string }) => {
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data: userProfile } = useGetUserProfileQuery(
    userId,
    !isExpert && !!userId
  );
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId,
    isExpert && !!userId
  );
  return (
    <Link href={`/user/profile/${userId}`}>
      <p className="text-sm text-muted-foreground">
        Tác giả:{" "}
        <span className="text-textChat hover:bg-clip-text hover:text-transparent hover:bg-gradient-to-r from-pink-500 to-violet-500">
          {isExpert
            ? expertProfile?.payload.data.fullname ||
              expertProfile?.payload.data.email
            : userProfile?.payload.data.fullName ||
              userProfile?.payload.data.userName ||
              "Anonymous"}
        </span>
      </p>
    </Link>
  );
};

const CategoryBadge = ({ categoryId }: { categoryId: string }) => {
  const { data, isError } = useGetDetailsCategoryQuery({ categoryId });
  if (isError)
    return (
      <div className="text-textChat font-semibold">
        Chức năng hiện đang bảo trì, bạn chờ xíu nhé
      </div>
    );
  return (
    <Badge className="text-textChat bg-muted" variant={"outline"}>
      {data?.payload.data.name}
    </Badge>
  );
};

export default function HighlightPosts({
  highlightPostList,
}: {
  highlightPostList: QuickPostType[];
}) {
  // const { data } = useGetHighlightPostQuery(4);
  // const highlightPostList = data?.payload.data || [];
  return (
    <div className="w-full mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-muted-foreground">
          Bài nổi bật
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-8 gap-y-4">
          {highlightPostList.map((post, index) => (
            <Card
              key={post.postId}
              className="flex flex-col items-start space-x-3 w-80 relative"
            >
              <CardContent className="p-3">
                <div className=" mb-4">
                  <Badge
                    variant="outline"
                    className="bg-gradient-to-r from-[#d4fc79] to-[#96e6a1] text-black text-sm"
                  >
                    #{index + 1}
                  </Badge>
                  <div className="absolute top-3 right-3">
                    <CategoryBadge categoryId={post.categoryId} />
                  </div>
                </div>
                <div>
                  <Link href={`/content/${post.postId}`}>
                    <h3 className="font-bold text-base mb-1 text-textChat hover:underline">
                      {post.title.length > 100
                        ? `${post.title.slice(0, 100)}...`
                        : post.title}
                    </h3>
                  </Link>
                  <UserProfile userId={post.userId} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
