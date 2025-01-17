"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatDateTime } from "@/lib/utils";
import {
  useGetAuthorOtherPostQuery,
  useGetPostByPostIdQuery,
} from "@/queries/usePost";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

export default function OtherPost() {
  const param = useParams();
  const postIdFromUrl = param?.postId;
  const { data: postById } = useGetPostByPostIdQuery({
    postId: postIdFromUrl as string,
    enabled: true,
  });
  const top = 5;
  const { data, isLoading, isError } = useGetAuthorOtherPostQuery({
    body: { authorId: postById?.payload.data.userId as string, top },
  });
  const authorOtherPost = (data?.payload.data || []).filter(
    (post) => post.postId !== postIdFromUrl
  );

  if (isLoading)
    return (
      <div className="overflow-hidden animate-pulse">
        <div className="flex flex-col py-2 px-2">
          <div className="w-full h-60 md:h-72 bg-gray-200 rounded-lg"></div>
          <div className="ml-4 flex flex-col justify-between">
            <div>
              <div className="h-5 mt-2 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full mt-1"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mt-1"></div>
            </div>
            <div className="flex items-center h-4 mt-2 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      </div>
    );

  if (isError)
    return (
      <div className="text-textChat font-bold">
        Chức năng này đang bảo trì, bạn đợi chút nhé
      </div>
    );

  return (
    <>
      {authorOtherPost.length > 0 && (
        <Card className="py-4 px-10">
          <h2 className="text-xl font-semibold text-center mb-4">
            Những bài viết khác
          </h2>

          <div className="space-y-4">
            {authorOtherPost.map((post) => (
              <Card key={post.postId} className="overflow-hidden">
                <Link href={`/content/${post.postId}`}>
                  <CardContent className="flex flex-col py-2 px-2">
                    <Image
                      src={post.coverImgUrl}
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
                        <div className="lg:text-sm md:text-xl sm:text-xl text-sm text-muted-foreground line-clamp-2">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: post.description,
                            }}
                          />
                        </div>
                      </div>
                      <div className="flex items-center text-gray-500 text-xs mt-2">
                        <CalendarIcon className="mr-1 h-4 w-4" />
                        <span>{formatDateTime(post.createAt)}</span>
                      </div>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}
