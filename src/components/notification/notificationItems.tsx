"use client";
import { formatDateTime, handleErrorApi } from "@/lib/utils";
import { useMaskAsReadNotification } from "@/queries/useNotification";
import { useRouter } from "next/navigation";
import React from "react";

interface NotificationItemsProps {
  icon: React.ReactNode;
  isRead: boolean;
  message: string;
  postId: string;
  createdAt: string;
  notificationTypeId: string;
  notificationId: string;
  userId: string;
}

export default function NotificationItems({
  isRead,
  message,
  postId,
  createdAt,
  icon,
  notificationId,
  notificationTypeId,
  userId,
}: NotificationItemsProps) {
  const router = useRouter();
  const maskAsReadNotificationMutation = useMaskAsReadNotification();
  const handleClick = async () => {
    if (maskAsReadNotificationMutation.isPending) return;
    try {
      await maskAsReadNotificationMutation.mutateAsync(notificationId);
      if (notificationTypeId === "06") {
        router.push(`/user/profile/${userId}`);
      }
      router.push(`/content/${postId}`);
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <div
      className={`flex items-start gap-4 rounded-lg p-2 hover:cursor-pointer ${
        !isRead ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-accent"
      }`}
      onClick={handleClick}
    >
      <div className="relative mt-1 rounded-full bg-blue-500 p-1 text-white">
        {icon}
        {!isRead && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
      <div className="grid gap-1">
        <p className={`text-sm ${!isRead ? "font-semibold text-black" : ""}`}>
          {message}
        </p>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className={`${!isRead ? "text-gray-600" : ""}`}>
            {formatDateTime(createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
