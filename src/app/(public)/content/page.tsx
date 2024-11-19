import HighlightPosts from "@/components/homePage/highlightPosts";
import HotPosts from "@/components/homePage/hotPosts";
import Posts from "@/components/homePage/posts";
import QuickPosts from "@/components/homePage/quickPosts";
import React from "react";

export default function HomePage() {
  return (
    <div>
      <div className="w-full bg-background h-auto overflow-hidden flex flex-1 flex-col gap-4 p-4 pt-0 md:pt-0 md:gap-8 md:p-8 mt-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2 col-span-3 order-1 md:order-1">
            <HotPosts />
          </div>

          <div className="md:col-span-1 col-span-3 order-2 md:order-2">
            <QuickPosts />
          </div>

          <div className="md:col-span-2 col-span-3 order-3 md:order-3">
            <div>
              <HighlightPosts />
            </div>
            <div className="mt-8">
              <Posts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
