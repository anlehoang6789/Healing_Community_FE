import Link from "next/link";
import React from "react";

interface HighlightPost {
  id: number;
  title: string;
  author: string;
}

const highlightPosts: HighlightPost[] = [
  {
    id: 1,
    title:
      "Top những điểm ấn tượng Apple Watch Series 10: Bản titan RẤT đẹp, mua",
    author: "Anh Tú",
  },
  {
    id: 2,
    title:
      "Trên tay Apple Watch Series 10 Natural Titanium: máy đẹp, mỏng và nhẹ, hoàn thiện đẳng bóng",
    author: "Pnghuy",
  },
  {
    id: 3,
    title:
      "LG nộp bằng sáng chế mới về smartphone màn hình cuộn, dấu hiệu cho sự quay trở lại của LG?",
    author: "Cao - Foxtek",
  },
  {
    id: 4,
    title: "7 yếu tố mà Samsung cần nâng cấp trên Galaxy S25 Series",
    author: "Cao - Foxtek",
  },
  {
    id: 5,
    title: "Hình ảnh Marshall tại sự kiện V1Z10N Launch Event",
    author: "HThanhLoi",
  },
  {
    id: 6,
    title: "StreamCast Asia ra mắt KEF Q Series tại Việt Nam",
    author: "HThanhLoi",
  },
];
export default function HighlightPosts() {
  return (
    <div className="w-full mx-auto">
      <div>
        <h2 className="text-2xl font-bold mb-4 text-muted-foreground">
          Bài nổi bật
        </h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-4">
          {highlightPosts.map((post) => (
            <div key={post.id} className="flex items-start space-x-3">
              <div className="text-4xl font-bold text-rose-400 w-10 flex-shrink-0 -mt-1">
                #{post.id}
              </div>
              <div>
                <Link href="#">
                  <h3 className="font-bold text-base mb-1 text-muted-foreground ">
                    {post.title}
                  </h3>
                </Link>
                <Link href="#">
                  <p className="text-sm text-muted-foreground">{post.author}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
