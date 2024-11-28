import HighlightPosts from "@/components/homePage/highlightPosts";
import Posts from "@/components/homePage/posts";
import QuickPosts from "@/components/homePage/quickPosts";
import React from "react";

export default function HomePage() {
  return (
    <div className="w-full bg-background h-auto overflow-hidden flex flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 mt-6">
      <div className="grid grid-cols-12 md:gap-20 space-y-4">
        <div className="col-span-12 md:col-span-3 justify-self-start">
          <HighlightPosts />
        </div>

        <div className="col-span-12 md:col-span-6 justify-self-center">
          <Posts />
        </div>

        <div className="col-span-12 md:col-span-3 justify-self-end">
          <QuickPosts />
        </div>
      </div>
    </div>
  );
}
