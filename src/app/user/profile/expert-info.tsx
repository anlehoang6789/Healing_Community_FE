import BookExpert from "@/components/expertInfo/bookExpert";
import ExpertProfile from "@/components/expertInfo/expertInfo";
import React from "react";

export default function ExpertInfor() {
  return (
    <div className="">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 col-span-3">
          <ExpertProfile />
        </div>

        <div className="  md:col-span-1 col-span-3">
          <BookExpert />
        </div>
      </div>
    </div>
  );
}
