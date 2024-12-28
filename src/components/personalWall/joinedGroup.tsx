"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { CardTooltip } from "@/components/ui/card-tooltip";
import { useParams } from "next/navigation";
import { useGetGroupsByUserIdQuery } from "@/queries/useGroup";
import { GroupJoinedByUserIdType } from "@/schemaValidations/group.schema";
import { Button } from "@/components/ui/button";
import { getUserIdFromLocalStorage } from "@/lib/utils";

export default function JoinedGroup() {
  const { userId } = useParams();
  const { data: response } = useGetGroupsByUserIdQuery(userId as string);
  const ownUserId = getUserIdFromLocalStorage();

  const isOwnProfile = ownUserId === userId;

  const groups = (response?.payload as any)?.data || [];
  return (
    <div className="p-4 rounded-lg shadow-lg border">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-bold text-muted-foreground">
          Nhóm đã tham gia
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4 pt-2">
        {groups.length > 0
          ? `${groups.length} nhóm`
          : isOwnProfile
          ? "Hiện tại bạn chưa tham gia nhóm nào"
          : "Chưa tham gia nhóm nào"}
      </p>

      <div className="grid grid-cols-3 gap-4">
        {groups.map((group: GroupJoinedByUserIdType) => (
          <CardTooltip key={group.groupId} content={group.groupName}>
            <Card key={group.groupName} className="overflow-hidden bg-gray-200">
              <CardContent className="p-2">
                <Link
                  href={`/group/${encodeURIComponent(group.groupId)}`}
                  className="block"
                >
                  <Image
                    src={
                      group.groupAvatar ||
                      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                    }
                    alt={`${group.groupName}'s avatar`}
                    width={100}
                    height={100}
                    className="w-full rounded-lg h-[70px] object-cover"
                    priority
                  />

                  <p className="mt-2 text-center text-sm font-medium text-gray-700 truncate">
                    {group.groupName}
                  </p>
                </Link>
              </CardContent>
            </Card>
          </CardTooltip>
        ))}
      </div>

      {groups.length > 6 && (
        <Link
          href="/user/list-of-groups"
          className="flex justify-end mt-6 text-sm sm:text-xs text-gray-500"
        >
          Xem tất cả nhóm
        </Link>
      )}

      {isOwnProfile && groups.length === 0 && (
        <Link
          href="/user/list-of-groups"
          className="flex justify-center text-sm sm:text-xs text-gray-500"
        >
          <Button className="hidden sm:inline-flex bg-gradient-to-r from-rose-400 to-violet-500 text-black flex-shrink-0 font-normal rounded-[20px]">
            Tham gia ngay
          </Button>
        </Link>
      )}
    </div>
  );
}
