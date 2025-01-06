import BookExpert from "@/components/expertInfo/bookExpert";
import ExpertProfile from "@/components/expertInfo/expertInfo";
import React from "react";

export default function ExpertInfor() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 col-span-3">
          <ExpertProfile />
        </div>

        <div className="md:col-span-1 col-span-3">
          <div className="sticky top-20">
            <BookExpert />
          </div>
        </div>
      </div>
    </div>
  );
}
