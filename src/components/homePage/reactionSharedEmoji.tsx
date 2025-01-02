"use client";
import { Button } from "@/components/ui/button";
import { handleErrorApi } from "@/lib/utils";
import {
  
  useAddReactionSharedMutation,
  useGetAllReactionTypeQuery,
  useGetUserReactionByPostIdQuery,
  
  useGetUserReactionByShareIdQuery,
  
  useRemoveReactionSharedMutation,
} from "@/queries/usePost";
import {  AddReactionSharedBodyType } from "@/schemaValidations/post.schema";
import { ThumbsUp } from "lucide-react";
import React, { useState } from "react";

export default function ReactionSharedEmoji({ shareId }: { shareId: string }) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: reactionType } = useGetAllReactionTypeQuery();
  const reactionTypeList = reactionType?.payload.data || [];

  //show reaction when user choose
  const { data: emojiSelected } = useGetUserReactionByShareIdQuery(shareId);
  const emojiSelectedItem = emojiSelected?.payload.data;

  //add reaction
  const addReactionMutation = useAddReactionSharedMutation(shareId);
  const handleAddReaction = async (body: AddReactionSharedBodyType) => {
    if (addReactionMutation.isPending) return;
    try {
      await addReactionMutation.mutateAsync(body);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  //remove reaction
  const removeReactionMutation = useRemoveReactionSharedMutation(shareId);
  const handleRemoveReaction = async (shareId: string) => {
    if (removeReactionMutation.isPending) return;
    try {
      await removeReactionMutation.mutateAsync(shareId);
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Button
        variant="iconDarkMod"
        className="flex items-center gap-2 p-0"
        onClick={(e) => {
          e.stopPropagation();
          handleRemoveReaction(shareId);
        }}
      >
        {emojiSelectedItem ? (
          // Hiển thị icon từ dữ liệu API nếu có
          <span className="flex items-center gap-2">
            <span className="text-xl">
              {emojiSelectedItem?.reactionType.icon}
            </span>
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ThumbsUp className="w-4 h-4" />
            Thích
          </span>
        )}
      </Button>
      {isHovered && (
        <div className="absolute bottom-full left-0 mt-2 flex gap-2 p-2 bg-white border border-gray-300 shadow-md rounded-md">
          {reactionTypeList.map((reactionItem) => (
            <button
              key={reactionItem.name}
              className="flex flex-col items-center justify-center p-1 hover:scale-150"
              onClick={(e) => {
                e.stopPropagation();
                handleAddReaction({
                  shareId,
                  reactionTypeId: reactionItem.reactionTypeId,
                });
              }}
            >
              <span className="text-xl">{reactionItem.icon}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
