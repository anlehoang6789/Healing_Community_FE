import DetailPost from "@/components/detailPage/detailPost";
import OtherPost from "@/components/detailPage/otherPost";
import ProfileCard from "@/components/detailPage/profileCard";
import SameTopicPost from "@/components/detailPage/sameTopicPost";
import React from "react";

export default function DetailPage() {
  return (
    <div className="grid grid-cols-12 gap-4 p-6">
      {/* Chiếm 8 phần của màn hình */}
      <div className="col-span-12 lg:col-span-8">
        <DetailPost />
      </div>

      {/* Phần còn lại chiếm 4 phần */}
      <div className="col-span-12 lg:col-span-4 ">
        <ProfileCard />
        <div className="mt-4">
          <OtherPost />
        </div>
        <div className="mt-4">
          <SameTopicPost />
        </div>
      </div>
    </div>
  );
}
