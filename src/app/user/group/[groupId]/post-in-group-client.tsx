"use client";

import CreatePostInGroup from "@/app/user/group/[groupId]/create-post-in-group";
import ViewPostInGroup from "@/app/user/group/[groupId]/view-post-in-group";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetGroupInfoQuery } from "@/queries/useGroup";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function PostInGroupClient() {
  const param = useParams();
  const groupId = param.groupId;
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const { data: groupJoin } = useGetGroupInfoQuery({
    userId: userIdFromLocalStorage as string,
    enabled: !!userIdFromLocalStorage,
  });

  const groupJoinList = useMemo(
    () => groupJoin?.payload.data || [],
    [groupJoin]
  );

  const [isMemberState, setIsMemberState] = useState<boolean | null>(null);

  //check xem co phai thanh vien cua nhom khong
  useEffect(() => {
    if (groupJoinList.length > 0) {
      const isMember = groupJoinList.some((group) => group.groupId === groupId);
      setIsMemberState(isMember);
    } else {
      setIsMemberState(null); // Reset trạng thái nếu chưa có dữ liệu
    }
  }, [groupJoinList, groupId]);

  return (
    <div className="w-full space-y-4">
      {isMemberState && <CreatePostInGroup groupId={groupId as string} />}
      <ViewPostInGroup groupId={groupId as string} />
    </div>
  );
}
