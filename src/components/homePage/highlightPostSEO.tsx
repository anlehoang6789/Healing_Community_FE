import postApiRequest from "@/apiRequests/post";
import HighlightPosts from "@/components/homePage/highlightPosts";
import React from "react";

export default async function HighlightPostSEO() {
  const result = await postApiRequest.getHighlightPost(4);
  const highlightPostList = result?.payload.data || [];
  return <HighlightPosts highlightPostList={highlightPostList} />;
}
