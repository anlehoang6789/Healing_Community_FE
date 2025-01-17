"use client";

import ViewPostInGroupForModerator from "@/app/moderator/group/[groupId]/view-post-in-group";
import CreatePostInGroup from "@/app/user/group/[groupId]/create-post-in-group";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetGroupsByUserIdQuery } from "@/queries/useGroup";

import { useParams } from "next/navigation";

export default function PostInGroupModerator() {
  const param = useParams();
  const groupId = param.groupId;

  const userId = getUserIdFromLocalStorage();
  const { data: joinedGroupsResponse } = useGetGroupsByUserIdQuery(
    userId as string
  );

  // Thêm kiểm tra và type assertion
  const joinedGroupIds = joinedGroupsResponse
    ? (joinedGroupsResponse as any).payload.data.map(
        (group: any) => group.groupId
      )
    : [];

  // Kiểm tra xem một nhóm có được tham gia không
  const isGroupJoined = (groupId: string) => {
    return joinedGroupIds.includes(groupId);
  };
  return (
    <div className="w-full space-y-4">
      {isGroupJoined(groupId as string) && (
        <CreatePostInGroup groupId={groupId as string} />
      )}

      <ViewPostInGroupForModerator groupId={groupId as string} />
    </div>
  );
}
