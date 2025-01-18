"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Bookmark, Ellipsis, Flag, Globe, LockKeyhole } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  useAddUserReferenceMutation,
  useGetAllCategoryQuery,
  useGetHomePageLazyLoadQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import {
  formatDateTime,
  getUserIdFromLocalStorage,
  handleErrorApi,
} from "@/lib/utils";
import { useRouter } from "next/navigation";
import ReactionEmoji from "@/components/homePage/reactionEmoji";
import { useAppContext } from "@/components/app-provider";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import BookmarkDialogMobile from "@/app/user/bookmark/bookmark-dialog-mobile";
import ReactionCount from "@/components/homePage/reactionCount";
import ShareSection from "@/components/shareSection/shareSection";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { Role } from "@/constants/type";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import ShareCount from "@/components/shareSection/shareCount";
import ReportPostSection from "@/components/reportSection/report-post-section";

type UserProfileProps = {
  userId: string;
  postDate: string;
  isPostPublic: boolean;
  postId: string;
};

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  postDate,
  isPostPublic,
  postId,
}) => {
  const { isAuth } = useAppContext();
  const { theme } = useTheme();
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const { data: roleByUserId } = useGetRoleByUserIdQuery(userId, !!userId);
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  const { data, isLoading, isError } = useGetUserProfileQuery(
    userId,
    !isExpert && !!userId
  );
  const { data: expertProfile } = useGetExpertProfileQuery(
    userId,
    isExpert && !!userId
  );
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const isOwner = userId === userIdFromLocalStorage;

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Error fetching user profile</div>;

  const user = data.payload.data;
  const openBookmarkDialog = () => {
    setIsBookmarkDialogOpen(true);
  };

  const openReportPostDialog = () => {
    setIsReportDialogOpen(true);
  };

  return (
    <div className="flex items-center gap-4 mb-6">
      <Avatar className="w-10 h-10 sm:w-10 sm:h-10 border-2 border-rose-300 mb-2">
        <AvatarImage
          src={
            user.profilePicture ||
            expertProfile?.payload.data.profileImageUrl ||
            "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
          }
          alt={
            user.fullName || expertProfile?.payload.data.fullname || "Anonymous"
          }
        />
        <AvatarFallback>
          {isExpert
            ? expertProfile?.payload.data.fullname ||
              expertProfile?.payload.data.email
            : user.fullName || user.userName || "Anonymous"}
        </AvatarFallback>
      </Avatar>
      <div>
        <div className="flex items-center space-x-2">
          <h2 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500 mb-2">
            {isExpert
              ? expertProfile?.payload.data.fullname ||
                expertProfile?.payload.data.email
              : user.fullName || user.userName || "Anonymous"}
          </h2>
          {isExpert && (
            <div className="text-xs text-gray-100 font-semibold px-2 py-1 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] rounded-full shadow-md">
              Chuyên gia
            </div>
          )}
        </div>

        {/* Ngày tạo acc người dùng */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-gray-500">{formatDateTime(postDate)}</p>

          <p className="text-gray-500">
            {isPostPublic ? (
              <Globe className="h-4 w-4" />
            ) : (
              <LockKeyhole className="h-4 w-4" />
            )}
          </p>
        </div>
      </div>
      {isAuth && !isOwner && (
        <div className="ml-auto">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="ml-auto">
              <Button variant="iconSend" size="icon">
                <Ellipsis className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-56 mt-4 z-50${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <DropdownMenuItem
                onClick={(e) => {
                  openBookmarkDialog();
                  e.stopPropagation();
                }}
              >
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Lưu bài viết</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  openReportPostDialog();
                  e.stopPropagation();
                }}
              >
                <Flag className="mr-2 h-4 w-4" />
                <span>Báo cáo bài viết</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BookmarkDialogMobile
            postId={postId}
            isOpen={isBookmarkDialogOpen}
            setIsOpen={setIsBookmarkDialogOpen}
          />
          <ReportPostSection
            postId={postId}
            isOpen={isReportDialogOpen}
            setIsOpen={setIsReportDialogOpen}
          />
        </div>
      )}
    </div>
  );
};

export default function Posts() {
  const { isAuth } = useAppContext();
  const pageSizes = 5;
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  //Phần home page lazy load
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useGetHomePageLazyLoadQuery(pageSizes);
  const router = useRouter();
  const { data: categoryData } = useGetAllCategoryQuery();

  //hành vi người dùng
  const { mutateAsync } = useAddUserReferenceMutation();

  // Hàm xử lý sự kiện cuộn
  // Thêm sự kiện cuộn vào window
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >=
          document.body.scrollHeight * 0.8 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage()
          .catch((error) => {
            console.error("Error while fetching next page:", error);
          })
          .finally(() => setIsLoadingMore(false));
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Ghép các trang dữ liệu
  // const articles = data?.pages.flatMap((page) => page.payload.data) || [];
  const articles = Array.isArray(data?.pages)
    ? data.pages.flatMap((page) => page.payload?.data || [])
    : [];

  // console.log("Data:", data);
  // console.log("Articles:", articles);

  const handlePostClick = async (
    postId: string,
    categoryId: string,
    e: React.MouseEvent
  ) => {
    const target = e.target as HTMLElement;
    // Nếu click vào nút, ngừng sự kiện
    if (target.closest("button")) {
      e.stopPropagation();
    } else {
      try {
        await mutateAsync({ categoryId });
        // Nếu không phải nút, chuyển hướng tới bài viết
        router.push(`/content/${postId}`);
      } catch (error: any) {
        handleErrorApi(error);
      }
    }
  };

  if (!data || isLoading)
    return (
      <div className="p-4 rounded-lg shadow-lg border mb-6 animate-pulse w-[600px]">
        <div className="h-20 bg-gray-200 rounded"></div>
        <div className="whitespace-pre-wrap mb-4 text-textChat flex flex-col">
          <div className="h-6 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-16 bg-gray-200 rounded mb-2"></div>
          <div className="w-full h-64 bg-gray-200 rounded-md mt-4"></div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <div className="flex justify-between w-full">
            <div className="h-6 w-6 bg-gray-200 rounded mr-2"></div>
            <span className="justify-end text-sm text-gray-500">
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </span>
          </div>
          <div className="flex items-center justify-between w-full">
            <div className="h-6 w-6 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2 p-0">
              <div className="h-6 w-6 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );

  return (
    <div>
      {articles.map((article) => {
        const truncatedDescription =
          article.description.length > 300
            ? article.description.slice(0, 300) + "..."
            : article.description;
        const isPostPublic = article.status === 0;

        const categoryColors: { [key: string]: string } = {
          "01JCZM72A9K5176BQT82T821V1":
            "bg-gradient-to-r from-[#FAA6FF] to-[#E90000] ",
          "01JCZM8JW9YQC9TGBM8Q8TJ14C":
            "bg-gradient-to-r from-[#9ceda7] to-[#18A5A7] ",
          "01JCZM90KFECJ8EV9BETF6X4EA":
            "bg-gradient-to-r from-[#f6d365] to-[#fda085] ",
          "01JCZM99K9SC97S16ZG64APWF2":
            "bg-gradient-to-r from-[#30cfd0] to-[#330867] ",
          "01JFSFQ92FBQXYXSTPDQA45KFR":
            "bg-gradient-to-r from-[#0250c5] to-[#d43f8d] ",
        };

        // Lấy tên và màu của category
        const category =
          !isLoading && categoryData?.payload?.data
            ? categoryData.payload.data.find(
                (cat: { categoryId: string; name: string }) =>
                  cat.categoryId === article.categoryId
              )
            : null;

        const categoryName = category?.name || "Không xác định";
        const categoryColor =
          categoryColors[article.categoryId] || "bg-gray-500";
        return (
          <div
            key={article.postId}
            className="p-4 rounded-lg shadow-lg border mb-6 relative"
            onClick={(e) =>
              handlePostClick(article.postId, article.categoryId, e)
            }
          >
            {/* category */}
            <div
              className={`absolute top-0 right-0 text-sm text-gray-100 font-semibold px-2 py-1 rounded-lg ${categoryColor}`}
            >
              {categoryName}
            </div>
            <UserProfile
              userId={article.userId}
              postDate={article.createAt}
              isPostPublic={isPostPublic}
              postId={article.postId}
            />

            <div className="whitespace-pre-wrap mb-4 text-textChat flex flex-col">
              <h1 className="font-bold text-lg text-center mb-2">
                {article.title}
              </h1>
              <div
                dangerouslySetInnerHTML={{
                  __html: truncatedDescription,
                }}
              />

              <Image
                src={
                  article.coverImgUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt="Banner"
                width={1000}
                height={500}
                className="w-full h-auto md:h-[450px] object-cover mt-4 rounded-md"
              />
            </div>
            {isAuth && (
              <div className="flex flex-col items-start gap-4">
                <div className="flex justify-between w-full">
                  <ReactionCount postId={article.postId} />
                  <span className="justify-end text-sm text-gray-500">
                    <ShareCount postId={article.postId} showText={true} />
                  </span>
                </div>

                <div className="flex items-center justify-between w-full">
                  <ReactionEmoji postId={article.postId} />
                  {/* <Button
                    variant="iconDarkMod"
                    className="flex items-center gap-2 p-0"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Share2 className="w-4 h-4" />
                    Chia sẻ
                  </Button> */}
                  <ShareSection postId={article.postId} />
                </div>
              </div>
            )}
          </div>
        );
      })}
      {isLoadingMore && (
        <div className="animate-pulse p-4 bg-gray-500 rounded-lg shadow-lg border mb-6">
          <div className="whitespace-pre-wrap mb-4 text-gray-500 flex flex-col">
            <h1 className="h-6 mb-2 bg-gray-300 rounded"></h1>
            <div className="h-20 bg-gray-300 rounded mb-4"></div>
            <div className="h-48 bg-gray-300 rounded"></div>
          </div>
          <div className="flex flex-col items-start gap-4">
            <div className="flex justify-between w-full">
              <span className="h-4 w-24 bg-gray-300 rounded"></span>
              <span className="h-4 w-24 bg-gray-300 rounded"></span>
            </div>
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2 p-0 h-6 w-16 bg-gray-300 rounded"></div>
              <div className="flex items-center gap-2 p-0 h-6 w-16 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
