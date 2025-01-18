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
import { ReactNode, useState } from "react";
import { useSharePostMutation } from "@/queries/usePost";
import { handleErrorApi } from "@/lib/utils";
import { useParams } from "next/navigation";

type ShareSectionProps = {
  postId: string | string[];
  children?: ReactNode;
};

export default function ShareSection({ postId, children }: ShareSectionProps) {
  const [description, setDescription] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const userId = getUserIdFromLocalStorage();
  const { userIdFromParams } = useParams();
  const { data: userById } = useGetUserProfileQuery(userId as string);
  const userData = userById?.payload.data;

  const sharePostMutation = useSharePostMutation(userIdFromParams as string);

  const handleShare = (platform: "facebook" | "gmail") => {
    const url = `https://fe-production-1a01.up.railway.app/content/${postId}`;
    const text = "Xem bài viết này nè";

    switch (platform) {
      case "facebook":
        sharePostMutation.mutate({
          postId: postId as string,
          platform: "Facebook",
        });
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        setIsDialogOpen(false);
        break;
      case "gmail":
        sharePostMutation.mutate({
          postId: postId as string,
          platform: "Email",
        });
        window.open(
          `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=${encodeURIComponent(
            text
          )}&body=${encodeURIComponent(url)}`,
          "_blank"
        );
        setIsDialogOpen(false);
        break;
    }
  };

  const handleInternalShare = async () => {
    try {
      const result = await sharePostMutation.mutateAsync({
        postId: postId as string,
        description,
        platform: "Internal",
      });

      toast({
        description: result.payload.message,
        variant: "success",
      });

      setIsDialogOpen(false);
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleCopyLink = () => {
    const url = `https://fe-production-1a01.up.railway.app/content/${postId}`;
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
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="iconDarkMod">
            <span className="flex items-center gap-2">
              <Share2 className="h-4 w-4" />
              Chia sẻ
            </span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-md"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-textChat">Chia sẻ</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10 border-2 border-rose-300">
              <AvatarImage
                src={
                  userData?.profilePicture ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
              />
              <AvatarFallback>
                {userData?.fullName || userData?.userName}
              </AvatarFallback>
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            placeholder="Hãy nói gì đó về nội dung này (không bắt buộc)"
            className="min-h-[100px] resize-none mb-2 text-textChat"
          />

          <div className="flex justify-end">
            <Button
              onClick={handleInternalShare}
              className="bg-gradient-to-r from-rose-400 to-violet-500 text-black"
            >
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
