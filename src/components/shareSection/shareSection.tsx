"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Copy, Facebook, Mail, Share2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { toast } from "@/hooks/use-toast";
import { ReactNode } from "react";

type ShareSectionProps = {
  postId: string | string[];
  children?: ReactNode; //dùng để nhận css nút tùy chỉnh
};

export default function ShareSection({ postId, children }: ShareSectionProps) {
  const userId = getUserIdFromLocalStorage();
  const { data: userById } = useGetUserProfileQuery(userId as string);
  const userData = userById?.payload.data;

  const handleShare = (platform: "facebook" | "gmail") => {
    const url = `http://localhost:3000/content/${postId}`;
    const text = "Xem bài viết này nè";

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "gmail":
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(
            text
          )}&body=${encodeURIComponent(url)}`,
          "_blank"
        );
        break;
    }
  };

  const handleCopyLink = () => {
    const url = `http://localhost:3000/content/${postId}`;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        toast({
          title: "Đã sao chép liên kết",
          variant: "success",
        });
      })
      .catch(() => {
        toast({
          title: "Sao chép liên kết thất bại. Vui lòng thử lại!",
          variant: "destructive",
        });
      });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || ( // Hiển thị children nếu được truyền vào, nếu không hiển thị nút mặc định
          <Button variant="iconDarkMod">
            <span className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Chia sẻ
            </span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-textChat">Chia sẻ</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border-2 border-rose-300">
              <AvatarImage
                src={userData?.profilePicture || "/default-avatar.png"}
              />
              <AvatarFallback>GM</AvatarFallback>
            </Avatar>
            <div className="flex flex-col pt-2 justify-center gap-1">
              <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {userData?.fullName || userData?.userName}
              </span>
              <div className="flex items-center gap-1">
                <div className="h-7 text-xs text-textChat ">Tường nhà</div>
              </div>
            </div>
          </div>

          <Textarea
            placeholder="Hãy nói gì đó về nội dung này (không bắt buộc)"
            className="min-h-[100px] resize-none mb-2"
          />

          <div className="flex justify-end">
            <Button className=" bg-gradient-to-r from-rose-400 to-violet-500 text-black">
              Chia sẻ ngay
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="text-sm font-medium text-textChat">Chia sẻ lên</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={() => handleShare("facebook")}
              >
                <Facebook className="h-5 w-5 text-blue-600" />
                <div className="text-textChat">Facebook</div>
              </Button>
              <Button
                variant="outline"
                className="flex gap-2"
                onClick={() => handleShare("gmail")}
              >
                <Mail className="h-5 w-5 text-red-600" />
                <div className="text-textChat">Gmail</div>
              </Button>

              <Button
                variant="outline"
                className="flex gap-2"
                onClick={handleCopyLink}
              >
                <Copy className="h-5 w-5 text-gray-600" />
                <div className="text-textChat">Sao chép liên kết</div>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
