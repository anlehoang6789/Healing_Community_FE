"use client";
import { Card, CardContent } from "@/components/ui/card";
import { useGetQuickPost } from "@/queries/usePost";
// import { useGetQuickPostHomePageQuery } from "@/queries/usePost";
import { QuickPostType } from "@/schemaValidations/post.schema";
import { useQuickPostStore } from "@/store/postStore";
import Image from "next/image";
import Link from "next/link";

export default function QuickViewNews({
  quickPostList,
}: {
  quickPostList: QuickPostType[];
}) {
  // const { data } = useGetQuickPost();
  // const quickPostList = data?.payload.data || [];
  const { setPostData } = useQuickPostStore();
  const handleClickedPost = (postId: string, userId: string) => {
    setPostData(postId, userId);
  };
  return (
    <aside className="pl-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Xem nhanh
        </h2>
      </div>
      <ul className="space-y-4 relative">
        <div className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-yellow-700"></div>
        {quickPostList.map((item) => (
          <li key={item.postId} className="flex items-start space-x-4 relative">
            <div className="absolute left-[-6px] top-2 w-[15px] h-[15px]">
              <Image
                src={"/leaf.png"}
                alt="leaf"
                className="w-full h-full object-contain"
                width={15}
                height={15}
              />
            </div>
            <Card className="w-full transition-all duration-300">
              <CardContent className="p-3">
                <Link
                  href={`/content/${item.postId}`}
                  onClick={() => handleClickedPost(item.postId, item.userId)}
                >
                  <h3 className="text-sm font-medium text-textChat line-clamp-3">
                    {item.title}
                  </h3>
                </Link>
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
    </aside>
  );
}
