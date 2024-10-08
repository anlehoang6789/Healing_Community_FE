import PostStoryForm from "@/app/user/create-post/post-story-form";
import React from "react";

export default function CreatePost() {
  return (
    <div className="flex flex-col min-h-screen items-center relative mb-4">
      <div className="h-[300px] bg-gray-800 w-full absolute top-0"></div>
      <h1 className="text-lg md:text-3xl font-bold text-white my-10 relative">
        Cùng chia sẻ hành trình của mình nào!!!
      </h1>

      <div className="shadow-lg rounded-lg md:px-8 md:py-6 w-full md:w-3/5 min-h-[500px] flex flex-col relative bg-white mb-4">
        <PostStoryForm />
      </div>
    </div>
  );
}
