"use client";
import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

import { CardTooltip } from "@/components/ui/card-tooltip";

interface Group {
  name: string;
  avatarUrl: string;
}

const groups: Group[] = [
  {
    name: "Chia sẻ câu chuyện",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Yêu và thương",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Kết bạn 4 phương",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Lắng nghe trái tim",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Các quán cà phê",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    name: "Các bài nhạc hay",
    avatarUrl:
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

export default function JoinedGroup() {
  return (
    <div className="p-4 rounded-lg shadow-lg border">
      <div className="flex justify-between items-center ">
        <h2 className="text-lg font-bold text-muted-foreground">
          Nhóm đã tham gia
        </h2>
      </div>
      <p className="text-sm text-gray-500 mb-4">10 nhóm</p>

      <div className="grid grid-cols-3 gap-4">
        {groups.map((group) => (
          <CardTooltip key={group.name} content={group.name}>
            <Card key={group.name} className="overflow-hidden bg-gray-200">
              <CardContent className="p-2">
                <Link
                  href={`/group/${encodeURIComponent(group.name)}`}
                  className="block"
                >
                  <Image
                    src={group.avatarUrl}
                    alt={`${group.name}'s avatar`}
                    width={100}
                    height={100}
                    className="w-full h-auto rounded-lg object-cover"
                    priority
                  />

                  <p className="mt-2 text-center text-sm font-medium text-gray-700 truncate">
                    {group.name}
                  </p>
                </Link>
              </CardContent>
            </Card>
          </CardTooltip>
        ))}
      </div>

      <Link
        href="/user/list-of-groups"
        className="flex justify-end mt-6 text-sm sm:text-xs text-gray-500"
      >
        Xem tất cả nhóm
      </Link>
    </div>
  );
}
