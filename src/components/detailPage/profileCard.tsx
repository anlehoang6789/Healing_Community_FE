"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Role } from "@/constants/type";
import { toast } from "@/hooks/use-toast";
import {
  formatDate,
  getUserIdFromLocalStorage,
  handleErrorApi,
} from "@/lib/utils";
import {
  useFollowUserMutation,
  useGetFollowingQuery,
  useGetUserProfileQuery,
  useUnfollowUserMutation,
} from "@/queries/useAccount";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import { useGetPostByPostIdQuery } from "@/queries/usePost";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const isValidUrl = (url: string) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export default function ProfileCard() {
  // const postId = "01JDHS5Z5ECX2AWNKGQ2NHG2Z8";
  // const { postId } = useQuickPostStore();
  const param = useParams();
  const postIdFromUrl = param?.postId;
  const { data: postById } = useGetPostByPostIdQuery({
    postId: postIdFromUrl as string,
    enabled: true,
  });
  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    postById?.payload.data.userId as string,
    !!postById?.payload.data.userId
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data: expertProfile } = useGetExpertProfileQuery(
    postById?.payload.data.userId as string,
    isExpert && !!postById?.payload.data.userId
  );
  const { data: userById } = useGetUserProfileQuery(
    postById?.payload.data.userId as string
  );
  const userId = getUserIdFromLocalStorage();
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const postUserId = postById?.payload.data.userId;
  const unFollowUser = useUnfollowUserMutation(postUserId as string); //unfollow người ta
  const followUser = useFollowUserMutation(postUserId as string); //follow người ta
  const { data } = useGetFollowingQuery(userId as string); //lấy danh sách người đang theo dõi của chính mình
  const getFollowingList = data?.payload.data;
  const handleFollowUser = () => {
    if (followUser.isPending) return;
    try {
      followUser.mutateAsync({ followerId: postUserId as string });
      setIsFollowing(true);
      toast({
        description: "Đã theo dõi người dùng",
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  const handleUnfollow = (userId: string) => {
    if (unFollowUser.isPending) return;
    try {
      unFollowUser.mutateAsync(userId);
      setIsFollowing(false);
      toast({
        description: "Đã bỏ theo dõi người dùng",
        variant: "success",
      });
    } catch (error: any) {
      handleErrorApi(error);
    }
  };

  useEffect(() => {
    const fetchFollowStatus = () => {
      if (!getFollowingList || !postUserId) return;

      // Kiểm tra xem userId mục tiêu có trong danh sách theo dõi không
      const isUserFollowing = getFollowingList.some(
        (followedUser) => followedUser.userId === postUserId
      );

      setIsFollowing(isUserFollowing);
    };

    fetchFollowStatus();
  }, [getFollowingList, postUserId]);

  // Check if the postUserId matches the logged-in userId
  if (userId === postUserId) {
    return null; // Do not render the component if they match
  }

  const renderSocialLinks = () => {
    const socialLinks = userById?.payload.data.socialLink;
    if (!socialLinks) return null;

    return Object.entries(socialLinks).map(([platform, url]) => {
      if (!url) return null;

      const socialIcons: Record<string, React.ElementType> = {
        facebook: Facebook,
        instagram: Instagram,
        twitter: Twitter,
        linkedin: Linkedin,
      };

      const Icon = socialIcons[platform];
      if (!Icon) return null;

      const isValid = isValidUrl(url);

      return (
        <div key={platform} className="flex items-center gap-2 mt-2">
          <Icon size={16} className="text-gray-400" />
          <span className="text-sm">
            {isValid ? (
              <Link
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="lg:text-sm md:text-xl sm:text-xl text-blue-500 hover:underline"
              >
                {url}
              </Link>
            ) : (
              <span>{url}</span>
            )}
          </span>
        </div>
      );
    });
  };

  // console.log(
  //   "so dien thoai o profile card phan content details",
  //   userById?.payload.data.phoneNumber
  // );
  return (
    <Card className="w-full mx-auto mr-20">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Link href={`/user/profile/${postById?.payload.data.userId}`}>
          <Avatar className="w-12 h-12 border-2 border-rose-300">
            <AvatarImage
              src={
                isExpert
                  ? expertProfile?.payload.data.profileImageUrl
                  : userById?.payload.data.profilePicture ||
                    "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
              }
              alt={userById?.payload.data.userName}
            />
            <AvatarFallback>
              {isExpert
                ? expertProfile?.payload.data.fullname ||
                  expertProfile?.payload.data.email
                : userById?.payload.data.userName}
            </AvatarFallback>
          </Avatar>
        </Link>
        <h2 className="lg:text-2xl md:text-4xl sm:text-4xl text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
          {isExpert
            ? expertProfile?.payload.data.fullname ||
              userById?.payload.data.userName
            : userById?.payload.data.fullName ||
              userById?.payload.data.userName}
        </h2>
      </CardHeader>
      <div className="flex justify-center">
        <Button
          className="h-7 w-full ml-8 mr-8 mt-2 mb-4 bg-gradient-custom-left-to-right text-gray-600 font-bold"
          onClick={() =>
            isFollowing ? handleUnfollow(postUserId!) : handleFollowUser()
          }
        >
          {isFollowing ? "Bỏ theo dõi" : "Theo dõi"}
        </Button>
      </div>
      <CardContent>
        <p className="flex justify-center text-muted-foreground mb-4 lg:text-base md:text-2xl sm:text-2xl">
          {isExpert
            ? expertProfile?.payload.data.bio
            : userById?.payload.data.descrtiption}
        </p>
        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">
              {isExpert
                ? expertProfile?.payload.data.email
                : userById?.payload.data.email}
            </span>
          </div>
          <div className="flex items-center gap-2">
            {userById?.payload.data.phoneNumber && (
              <>
                <Phone size={16} className="text-gray-400" />
                <span className="lg:text-sm md:text-xl sm:text-xl">
                  {userById?.payload.data.phoneNumber}
                </span>
              </>
            )}
          </div>
          {/* Phần hiện social link */}
          <div className="space-y-2">{renderSocialLinks()}</div>
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="lg:text-sm md:text-xl sm:text-xl">
              Tham gia nền tảng:{" "}
              {formatDate(userById?.payload.data.createdAt as string)}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
