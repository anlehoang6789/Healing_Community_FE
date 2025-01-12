"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  useGetGroupMembersByGroupIdQuery,
  useGetRoleCountByGroupIdQuery,
} from "@/queries/useGroup";
import { useParams } from "next/navigation";
import { getUserIdFromLocalStorage } from "@/lib/utils";

import { useState } from "react";
import GroupCurrentUserForModerator from "@/app/moderator/group/[groupId]/members/group-current-user";
import GroupMemberDetailsForModerator from "@/app/moderator/group/[groupId]/members/group-member-details";
import SearchGroupMembers from "@/app/moderator/group/[groupId]/members/search-group-members";

export default function GroupMembersClient() {
  const [searchTerm, setSearchTerm] = useState("");
  const params = useParams();
  const groupIdFromPath = params.groupId as string;
  const { data: roleCount } = useGetRoleCountByGroupIdQuery(groupIdFromPath);
  const { data: groupMembers } =
    useGetGroupMembersByGroupIdQuery(groupIdFromPath);
  const groupMembersList = groupMembers?.payload.data || [];
  const currentUserId = getUserIdFromLocalStorage();

  const currentUser = groupMembersList.find(
    (member) => member.userId === currentUserId
  );

  const otherMembers = groupMembersList.filter(
    (member) => member.userId !== currentUserId
  );

  return (
    <Card className="max-w-5xl mx-auto">
      <CardHeader className="space-y-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-medium">
            Thành viên · {roleCount?.payload.data.totalMembers}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Người và Trang mới tham gia nhóm này sẽ hiển thị tại đây.
        </p>
        <SearchGroupMembers
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </CardHeader>
      <CardContent className="space-y-6">
        {/* nick chính mình */}
        <div className="space-y-4">
          {currentUser && (
            <GroupCurrentUserForModerator
              userId={currentUser.userId}
              roleInGroup={currentUser.roleInGroup}
            />
          )}
        </div>
        {(roleCount?.payload.data.totalOwnersAndModerators as number) > 0 && (
          <Separator className="bg-zinc-800" />
        )}
        {/* quản trị viên */}
        <div className="space-y-4">
          <h3 className="text-sm font-medium">
            Quản trị nhóm & chủ nhóm ·{" "}
            {roleCount?.payload.data.totalOwnersAndModerators}
          </h3>
          <div className="space-y-4">
            {/* Hiển thị chính bạn nếu bạn là Owner hoặc Moderator */}
            {currentUser &&
              (currentUser.roleInGroup === "Owner" ||
                currentUser.roleInGroup === "Moderator") && (
                <div className="flex items-center justify-between">
                  <GroupMemberDetailsForModerator
                    groupId={groupIdFromPath}
                    userId={currentUser.userId}
                    roleInGroup={currentUser.roleInGroup}
                  />
                </div>
              )}

            {/* Hiển thị những thành viên khác là Owner hoặc Moderator */}
            {otherMembers
              .filter(
                (member) =>
                  member.roleInGroup === "Owner" ||
                  member.roleInGroup === "Moderator"
              )
              .map((admin, index) => (
                <div key={index} className="flex items-center justify-between">
                  <GroupMemberDetailsForModerator
                    groupId={groupIdFromPath}
                    userId={admin.userId}
                    roleInGroup={admin.roleInGroup}
                  />
                </div>
              ))}
          </div>
        </div>

        {(roleCount?.payload.data.totalUsers as number) >= 1 && (
          <Separator className="bg-zinc-800" />
        )}
        {/* thành viên */}
        <div className="space-y-4">
          {(roleCount?.payload.data.totalUsers as number) >= 1 && (
            <h3 className="text-sm font-medium">
              Thành viên trong nhóm · {roleCount?.payload.data.totalUsers}
            </h3>
          )}
          <div className="space-y-4">
            {otherMembers
              .filter((member) => member.roleInGroup === "User")
              .map((member, index) => (
                <div key={index} className="flex items-center justify-between">
                  <GroupMemberDetailsForModerator
                    groupId={groupIdFromPath}
                    userId={member.userId}
                    roleInGroup={member.roleInGroup}
                  />
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
