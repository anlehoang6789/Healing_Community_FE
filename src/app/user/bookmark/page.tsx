import BookMarkList from "@/components/bookmark/bookmarkList";
import ProfileUser from "@/components/bookmark/profileUser";
import React from "react";

export default function BookMark() {
  return (
    <div className="w-full bg-background h-auto p-4 max-w-7xl overflow-hidden mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:order-2 order-1 md:col-span-1 col-span-3">
          <ProfileUser />
        </div>

        <div className="md:order-1 order-2 md:col-span-2 col-span-3">
          <BookMarkList />
        </div>
      </div>
    </div>
  );
}
