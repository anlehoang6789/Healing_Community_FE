import postApiRequest from "@/apiRequests/post";
import Posts from "@/components/homePage/posts";
import React from "react";

export default async function PostSEO() {
  const pageNumber = 1;
  const pageSize = 1000;
  const result = await postApiRequest.getHomePageLazyLoad(pageNumber, pageSize);
  const articles = result.payload.data;
  // console.log(articles);
  return <div>SEO POST</div>;
}
