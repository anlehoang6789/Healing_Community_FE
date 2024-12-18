import BookmarkManager from "@/app/user/bookmark/bookmark-manager";
import React from "react";

export default function BookMark() {
  return (
    <div className="w-full bg-background min-h-screen p-4 overflow-hidden">
      {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:order-2 order-1 md:col-span-1 col-span-3">
          <ProfileUser />
        </div>

        <div className="md:order-1 order-2 md:col-span-2 col-span-3">
          <BookmarkList />
        </div>
      </div> */}
      <BookmarkManager />
    </div>
  );
}
