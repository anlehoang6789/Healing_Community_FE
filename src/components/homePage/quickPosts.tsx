"use client";
// import { useGetQuickPostHomePageQuery } from "@/queries/usePost";
import { QuickPostType } from "@/schemaValidations/post.schema";
import { useQuickPostStore } from "@/store/postStore";
import Link from "next/link";

export default function QuickViewNews({
  quickPostList,
}: {
  quickPostList: QuickPostType[];
}) {
  // const { data } = useGetQuickPostHomePageQuery();
  // const quickPostList = data?.payload.data || [];
  const { setPostData } = useQuickPostStore();
  const handleClickedPost = (postId: string, userId: string) => {
    setPostData(postId, userId);
  };
  return (
    <div className="pl-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Xem nhanh
        </h2>
      </div>
      <ul className="space-y-4 relative">
        <div className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-blue-400"></div>
        {quickPostList.map((item) => (
          <li key={item.postId} className="flex items-start space-x-4 relative">
            <div className="absolute left-[-6px] top-2 w-[10px] h-[10px] bg-blue-400 rounded-full"></div>
            <div className="flex-1">
              <Link
                href={`/content/${item.postId}`}
                className="hover:underline"
                onClick={() => handleClickedPost(item.postId, item.userId)}
              >
                <h3 className="text-sm font-medium text-muted-foreground line-clamp-3">
                  {item.title}
                </h3>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
