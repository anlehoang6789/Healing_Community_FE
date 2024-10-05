"use client";
import { Button } from "@/components/ui/button";
import React from "react";

const topics = [
  "Cà phê chill",
  "Sức khỏe",
  "Đời sống",
  "Podcast",
  "Tâm lý",
  "Tâm thần",
  "Cà phê khong chill",
  "Sức khỏe tinh thần",
  "Đời sống vui",
  "Podcast hay",
  "Tâm lý xã hội",
  "Tâm thần học",
];

export default function PostTopics() {
  return (
    <div className="p-4 rounded-lg shadow-lg border">
      <h2 className="text-lg font-bold pb-2 text-gray-500">
        Chủ đề bài đã viết
      </h2>

      <div className="overflow-x-auto mt-2 ">
        <div className="flex flex-nowrap gap-2 mb-4">
          {topics.map((topic) => (
            <Button
              key={topic}
              className="bg-gray-200 rounded-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
            >
              {topic}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
