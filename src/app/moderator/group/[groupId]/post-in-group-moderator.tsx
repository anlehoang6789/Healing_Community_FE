"use client";

import ViewPostInGroup from "@/app/user/group/[groupId]/view-post-in-group";
import { useParams } from "next/navigation";

export default function PostInGroupModerator() {
  const param = useParams();
  const groupId = param.groupId;
  return (
    <div className="w-full space-y-4">
      <ViewPostInGroup groupId={groupId as string} />
    </div>
  );
}
