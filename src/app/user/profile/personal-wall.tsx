import FollowedUser from "@/components/layoutClient/followedUser";
import JoinedGroup from "@/components/layoutClient/joinedGroup";
import OwnPost from "@/components/layoutClient/ownPost";
import PostTopics from "@/components/layoutClient/postTopics";
import React from "react";

export default function PersonalWall() {
  return (
    <div className=" min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 col-span-3">
          <FollowedUser />

          <div className="mt-4">
            <JoinedGroup />
          </div>
        </div>

        <div className="md:col-span-2 col-span-3">
          <PostTopics />
          <div className="mt-4">
            <OwnPost />
          </div>
        </div>
      </div>
    </div>
  );
}
