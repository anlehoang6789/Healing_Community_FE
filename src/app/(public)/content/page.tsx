import CarouselHome from "@/components/homePage/carouselHome";
// import HighlightPosts from "@/components/homePage/highlightPosts";
import HighlightPostSEO from "@/components/homePage/highlightPostSEO";
import Posts from "@/components/homePage/posts";
// import PostSEO from "@/components/homePage/postSEO";
// import QuickPosts from "@/components/homePage/quickPosts";
import QuickPostSEO from "@/components/homePage/quickPostSEO";
import React from "react";

export default function HomePage() {
  return (
    <div className="w-full bg-background h-auto flex flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 mt-6">
      <div className="mb-8">
        <CarouselHome />
      </div>
      <div className="grid grid-cols-12 md:gap-20 space-y-4 ">
        <div className="col-span-12 md:col-span-3 justify-self-start">
          <div className="sticky top-6">
            {/* <HighlightPosts /> */}
            <HighlightPostSEO />
          </div>
        </div>

        <div className="col-span-12 md:col-span-6 justify-self-center">
          <Posts />
          {/* <PostSEO /> */}
        </div>

        <div className="col-span-12 md:col-span-3 justify-self-end ">
          {/* <QuickPosts /> */}
          <div className="sticky top-6">
            <QuickPostSEO />
          </div>
        </div>
      </div>
    </div>
  );
}
