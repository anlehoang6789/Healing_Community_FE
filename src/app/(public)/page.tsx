import Banner from "@/components/landingPage/banner";
import HighlightPosts from "@/components/homePage/highlightPosts";
import HotPosts from "@/components/homePage/hotPosts";
import Posts from "@/components/homePage/posts";
import QuickPosts from "@/components/homePage/quickPosts";
import React from "react";
import { cookies } from "next/headers";

export default function LandingPage() {
  return (
    <div>
      <Banner />
    </div>
  );
}
