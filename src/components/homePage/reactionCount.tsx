"use client";
import { useGetReactionCountQuery } from "@/queries/usePost";
import React from "react";

export default function ReactionCount({ postId }: { postId: string }) {
  const { data, isLoading, isError } = useGetReactionCountQuery(postId);

  if (isLoading)
    return (
      <span className="text-sm text-gray-500 animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-1/4"></div>
      </span>
    );
  if (isError || !data)
    return (
      <div className="text-textChat">
        Hiện tại chức năng đang bảo trì bạn chờ chút nhé
      </div>
    );
  const { like, love, haha, wow, sad, angry, total } = data.payload.data;

  const reactions = [
    { count: like.likeCount, icon: like.icon },
    { count: love.loveCount, icon: love.icon },
    { count: haha.hahaCount, icon: haha.icon },
    { count: wow.wowCount, icon: wow.icon },
    { count: sad.sadCount, icon: sad.icon },
    { count: angry.angryCount, icon: angry.icon },
  ];

  return (
    <div className="text-sm text-gray-500 flex items-center">
      {total > 0 ? (
        <>
          <div className="flex">
            {reactions.map(
              (reaction, index) =>
                reaction.count > 0 && (
                  <span key={index} className="-ml-1 first:ml-0">
                    {reaction.icon}
                  </span>
                )
            )}
          </div>
          <span className="ml-1">{total}</span>
        </>
      ) : null}
    </div>
  );
}
