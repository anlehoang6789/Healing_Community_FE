"use client";

import RequestJoinDetails from "@/app/user/group/[groupId]/request-join/request-join-details";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetRequestJoinGroupQuery } from "@/queries/useGroup";
import { useParams } from "next/navigation";

export default function RequestJoinCard() {
  const param = useParams();
  const groupId = param.groupId as string;
  const { data } = useGetRequestJoinGroupQuery(groupId);
  const joinRequests = data?.payload.data || [];
  return (
    <Card className="w-full max-w-5xl mx-auto">
      <CardHeader>
        <CardTitle>Yêu cầu tham gia nhóm</CardTitle>
      </CardHeader>
      <CardContent>
        {joinRequests.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Chưa có yêu cầu tham gia nhóm nào
          </p>
        ) : (
          <ul className="space-y-4">
            {joinRequests.map((request) => (
              <li
                key={request.queueId}
                className="flex items-center justify-between p-4 "
              >
                <RequestJoinDetails
                  groupId={request.groupId}
                  queueId={request.queueId}
                  userId={request.userId}
                  requestedAt={request.requestedAt}
                />
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}
