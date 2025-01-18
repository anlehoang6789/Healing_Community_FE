import postApiRequest from "@/apiRequests/post";
import QuickViewNews from "@/components/homePage/quickPosts";
import React from "react";

export default async function QuickPostSEO() {
  const result = await postApiRequest.getQuickPostHomePage();
  const quickPostList = result?.payload.data || [];
  return <QuickViewNews quickPostList={quickPostList} />;
}
