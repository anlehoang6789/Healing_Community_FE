"use client";

import CreatePostInGroup from "@/app/user/group/[groupId]/create-post-in-group";
import ViewPostInGroup from "@/app/user/group/[groupId]/view-post-in-group";
import { useParams } from "next/navigation";

export default function PostInGroupClient() {
  const param = useParams();
  const groupId = param.groupId;
  return (
    <div className="w-full space-y-4">
      <CreatePostInGroup groupId={groupId as string} />
      <ViewPostInGroup groupId={groupId as string} />
    </div>
  );
}
