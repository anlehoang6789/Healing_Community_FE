import React from "react";

interface NotificationItemsProps {
  icon: React.ReactNode;
  title: string;
  time: string;
  unread?: boolean;
}

export default function NotificationItems({
  icon,
  title,
  time,
  unread,
}: NotificationItemsProps) {
  return (
    <div
      className={`flex items-start gap-4 rounded-lg p-2 ${
        unread ? "bg-blue-50 hover:bg-blue-100" : "hover:bg-accent"
      }`}
    >
      <div className="relative mt-1 rounded-full bg-blue-500 p-1 text-white">
        {icon}
        {unread && (
          <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-red-500" />
        )}
      </div>
      <div className="grid gap-1">
        <p className={`text-sm ${unread ? "font-semibold text-black" : ""}`}>
          {title}
        </p>
        <div className="flex gap-2 text-xs text-muted-foreground">
          <span className={`${unread ? "text-gray-600" : ""}`}>{time}</span>
        </div>
      </div>
    </div>
  );
}
