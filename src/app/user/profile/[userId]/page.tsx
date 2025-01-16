import FollowedUser from "@/components/personalWall/followedUser";
import JoinedGroup from "@/components/personalWall/joinedGroup";
import OwnPost from "@/components/personalWall/ownPost";
// import PostTopics from "@/components/personalWall/postTopics";
import React from "react";

export default function PersonalWall() {
  return (
    <div className="min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-1 col-span-3">
          <div className="sticky top-4 space-y-4">
            <FollowedUser />
            <JoinedGroup />
          </div>
        </div>

        <div className="md:col-span-2 col-span-3">
          {/* <PostTopics /> */}
          <div className="mt-4">
            <OwnPost />
          </div>
        </div>
      </div>
    </div>
  );
}
