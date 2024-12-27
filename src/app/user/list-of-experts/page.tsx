import ListOfExpertsTab from "@/app/user/list-of-experts/list-of-experts-tab";

import React from "react";

export default function ListOfExpert() {
  return (
    <div className="md:px-28 ">
      <h1 className="text-2xl font-bold mb-4 text-textChat mt-3">
        Danh sách chuyên gia
      </h1>
      <ListOfExpertsTab />
    </div>
  );
}
