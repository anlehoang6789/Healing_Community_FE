"use client";
import Image from "next/image";
import Link from "next/link";

interface QuickView {
  id: number;
  title: string;
  author: string;
  img: string;
}

const quickItems: QuickView[] = [
  {
    id: 1,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Sony",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 2,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 3,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 4,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 5,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 6,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 7,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
  {
    id: 8,
    title:
      "Tổng hợp rò rỉ iPhone SE 4 mới nhất: Lộ ảnh ốp lưng, hỗ trợ Apple Intelligence, ra mắt năm 2025?",
    author: "Apple",
    img: "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
  },
];

export default function QuickViewNews() {
  return (
    <div className="pl-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-muted-foreground">
          Xem nhanh
        </h2>
      </div>
      <ul className="space-y-4 relative">
        <div className="absolute left-[-2px] top-0 bottom-0 w-0.5 bg-blue-400"></div>
        {quickItems.map((item) => (
          <li key={item.id} className="flex items-start space-x-4 relative">
            <div className="absolute left-[-6px] top-2 w-[10px] h-[10px] bg-blue-400    rounded-full"></div>
            <div className="flex-1">
              <Link href="#" className="hover:underline">
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
