"use client";

import ViewPersonalPostInGroup from "@/app/user/group-user/[groupId]/user/[userId]/view-personal-post-in-group";
import { useParams } from "next/navigation";

export default function PersonalPostInGroup() {
  const param = useParams();
  const groupId = param.groupId;
  const userId = param.userId;
  return (
    <div className="w-full">
      <ViewPersonalPostInGroup
        groupId={groupId as string}
        userId={userId as string}
      />
    </div>
  );
}
