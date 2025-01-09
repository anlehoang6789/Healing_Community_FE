"use client";

import ViewPostInGroupForModerator from "@/app/moderator/group/[groupId]/view-post-in-group";

import { useParams } from "next/navigation";

export default function PostInGroupModerator() {
  const param = useParams();
  const groupId = param.groupId;
  return (
    <div className="w-full space-y-4">
      <ViewPostInGroupForModerator groupId={groupId as string} />
    </div>
  );
}
