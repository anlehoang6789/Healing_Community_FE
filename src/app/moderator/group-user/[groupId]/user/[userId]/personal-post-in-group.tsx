"use client";

import ViewPersonalPostInGroupForModerator from "@/app/moderator/group-user/[groupId]/user/[userId]/view-personal-post-in-group";

import { useParams } from "next/navigation";

export default function PersonalPostInGroupForModerator() {
  const param = useParams();
  const groupId = param.groupId;
  const userId = param.userId;
  return (
    <div className="w-full">
      <ViewPersonalPostInGroupForModerator
        groupId={groupId as string}
        userId={userId as string}
      />
    </div>
  );
}
