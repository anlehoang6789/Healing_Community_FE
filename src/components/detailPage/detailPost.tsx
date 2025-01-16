"use client";

import { useEffect, useState } from "react";
import {
  Bookmark,
  Flag,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Share2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "next-themes";
import {
  useCreateCommentMutation,
  useDeleteCommentByCommnetIdMutation,
  useGetAllCategoryQuery,
  useGetCommentCountQuery,
  useGetCommentsByPostIdQuery,
  useGetPostByPostIdQuery,
  useGetReactionCountQuery,
} from "@/queries/usePost";
import { useGetUserProfileQuery } from "@/queries/useAccount";
import { formatDateTime, getUserIdFromLocalStorage } from "@/lib/utils";
import CommentSection from "@/components/commentSection/commentSection";
import { CommentType } from "@/schemaValidations/post.schema";
import postApiRequest from "@/apiRequests/post";
import { useParams } from "next/navigation";
import BookmarkDialog from "@/app/user/bookmark/bookmark-dialog";
import BookmarkDialogMobile from "@/app/user/bookmark/bookmark-dialog-mobile";
import ShareSection from "@/components/shareSection/shareSection";
import { useGetRoleByUserIdQuery } from "@/queries/useAuth";
import { Role } from "@/constants/type";
import { useGetExpertProfileQuery } from "@/queries/useExpert";
import ShareCount from "@/components/shareSection/shareCount";
import ReportPostSection from "@/components/reportSection/report-post-section";

export default function DetailPost() {
  const { theme } = useTheme();
  const [isBookmarkDialogOpen, setIsBookmarkDialogOpen] = useState(false);
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);

  const userIdComment = getUserIdFromLocalStorage() ?? "";
  const param = useParams();
  const postIdFromUrl = param?.postId;
  // console.log("postIdFromUrl", postIdFromUrl);
  const { data: reactionCount } = useGetReactionCountQuery(
    postIdFromUrl as string
  );

  const { data: commentCount } = useGetCommentCountQuery(
    postIdFromUrl as string
  );

  const { mutate: deleteComment } = useDeleteCommentByCommnetIdMutation();

  const { data: postById } = useGetPostByPostIdQuery({
    postId: postIdFromUrl as string,
    enabled: true,
  });
  const { data: roleByUserId } = useGetRoleByUserIdQuery(
    postById?.payload.data.userId as string
  );
  const isExpert = roleByUserId?.payload.data.roleName === Role.Expert;
  //data của user theo userId lấy từ api postById
  const { data: userById } = useGetUserProfileQuery(
    postById?.payload.data.userId as string,
    !isExpert && !!postById?.payload.data.userId
  );
  const { data: expertProfile } = useGetExpertProfileQuery(
    postById?.payload.data.userId as string,
    isExpert && !!postById?.payload.data.userId
  );
  const imageComment = useGetUserProfileQuery(userIdComment);
  const { data: commentsData } = useGetCommentsByPostIdQuery(
    postIdFromUrl as string
  );

  const { data: categoryData } = useGetAllCategoryQuery();

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

  const categoryId = postById?.payload?.data?.categoryId;

  // Lấy tên và màu của category
  const category = categoryData?.payload?.data
    ? categoryData.payload.data.find(
        (cat: { categoryId: string; name: string }) =>
          cat.categoryId === categoryId
      )
    : null;

  const categoryName = category?.name || "Không xác định";
  const categoryColor =
    categoryId && categoryColors[categoryId]
      ? categoryColors[categoryId]
      : "bg-gray-500";

  const { mutate: createComment } = useCreateCommentMutation();

  // Sử dụng kiểu CommentType từ schema
  const [comments, setComments] = useState<CommentType[]>([]);

  // Cập nhật comments khi data thay đổi
  useEffect(() => {
    if (commentsData?.payload?.data) {
      setComments(commentsData.payload.data);
    }
  }, [commentsData]);

  const handleDeleteComment = (commentId: string) => {
    deleteComment(
      {
        commentId,
        postId: postIdFromUrl as string,
      },
      {
        onSuccess: async () => {
          // Refetch toàn bộ comments của post
          try {
            const commentsResponse = await postApiRequest.getCommentsByPostId(
              postIdFromUrl as string
            );

            // Cập nhật lại toàn bộ comments
            setComments(commentsResponse.payload.data);
          } catch (error) {
            console.error("Error refetching comments:", error);
          }
        },
      }
    );
  };

  const handleAddComment = (comment: {
    content: string;
    coverImgUrl?: string | null;
  }) => {
    console.log("Comment Image URL in DetailPost:", comment.coverImgUrl);
    console.log("Comment content in DetailPost:", comment.content);
    console.log("Comment data being sent to API:", comment);

    // Gọi API để tạo bình luận
    createComment(
      {
        postId: postIdFromUrl as string,
        parentId: null,
        content: comment.content,
        coverImgUrl: comment.coverImgUrl,
      },
      {
        onSuccess: (data) => {
          const newCommentId = data.payload.data;

          // Tạo comment mới với commentId từ API
          const newComment: CommentType = {
            commentId: newCommentId, // Sử dụng commentId từ API
            postId: postIdFromUrl as string,
            parentId: null,
            userId: userIdComment as string,
            content: comment.content,
            createdAt: new Date().toISOString(),
            updatedAt: null,
            replies: [],
            coverImgUrl: comment.coverImgUrl,
          };

          // Cập nhật state comments với bình luận mới từ API
          setComments((prevComments) => [...prevComments, newComment]);
        },
        onError: (error) => {
          console.error("Error creating comment:", error);
        },
      }
    );
  };

  const handleAddReply = (
    parentId: string,
    reply: { content: string; coverImgUrl?: string | null }
  ) => {
    createComment(
      {
        postId: postIdFromUrl as string,
        parentId: parentId,
        content: reply.content,
        coverImgUrl: reply.coverImgUrl,
      },
      {
        onSuccess: async (data) => {
          try {
            // Fetch lại toàn bộ comments của post này
            const commentsResponse = await postApiRequest.getCommentsByPostId(
              postIdFromUrl as string
            );

            // Cập nhật lại toàn bộ comments
            setComments(commentsResponse.payload.data);
          } catch (error) {
            console.error("Error refetching comments:", error);
          }
        },
        onError: (error) => {
          console.error("Error creating reply:", error);
        },
      }
    );
  };

  const openBookmarkDialog = () => {
    setIsBookmarkDialogOpen(true);
  };

  const openReportPostDialog = () => {
    setIsReportDialogOpen(true);
  };

  return (
    <div className="w-full relative">
      {/* Vertical icon bar */}
      <div className="absolute h-64 left-0 top-10 bottom-0 p-1 flex-col items-center justify-center lg:flex hidden">
        <Button variant="ghost" size="icon" className="rounded-full">
          <Heart className="h-8 w-8 text-red-500" />
        </Button>
        <span className="text-xs font-semibold text-muted-foreground">
          {reactionCount?.payload.data?.total || 0}
        </span>
        <Button variant="ghost" size="icon" className="rounded-full mt-5">
          <MessageCircle className="h-8 w-8 text-blue-500" />
        </Button>
        <span className="text-xs font-semibold text-muted-foreground">
          {commentCount?.payload.data?.countTotalComment || 0}
        </span>
        <ShareSection postId={postIdFromUrl}>
          <div className="flex flex-col items-center">
            <Button variant="ghost" size="icon" className="rounded-full mt-5">
              <Share2 className="h-8 w-8 text-green-500" />
            </Button>
            <ShareCount postId={postIdFromUrl as string} showText={false} />
          </div>
        </ShareSection>
        <BookmarkDialog postId={postIdFromUrl as string} />
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full mt-7"
          onClick={openReportPostDialog}
        >
          <Flag className="h-8 w-8 text-red-500" />
        </Button>
        <ReportPostSection
          postId={postIdFromUrl as string}
          isOpen={isReportDialogOpen}
          setIsOpen={setIsReportDialogOpen}
        />
      </div>

      {/* Main content */}
      <div className="lg:ml-16 w-auto mx-auto border shadow-md rounded-md overflow-hidden relative">
        {/* Category */}
        <div
          className={`absolute top-[450px] right-0 text-base text-gray-100 font-semibold px-2 py-1   ${categoryColor}`}
        >
          {categoryName}
        </div>
        {postById?.payload.data && (
          <Image
            src={
              postById?.payload.data.coverImgUrl ||
              "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
            }
            alt="Banner"
            width={1000}
            height={500}
            className="w-full h-[450px] object-cover"
          />
        )}

        <div className="flex items-center gap-2 px-4 py-8">
          <Link href={`/user/profile/${postById?.payload.data.userId}`}>
            <Avatar className="w-12 h-12 border-2 border-rose-300">
              <AvatarImage
                src={
                  userById?.payload.data.profilePicture ||
                  expertProfile?.payload.data.profileImageUrl ||
                  "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                }
                alt={
                  isExpert
                    ? expertProfile?.payload.data.fullname
                    : userById?.payload.data.fullName ||
                      userById?.payload.data.userName
                }
              />
              <AvatarFallback>
                {isExpert
                  ? expertProfile?.payload.data.fullname
                  : userById?.payload.data.fullName ||
                    userById?.payload.data.userName}
              </AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link href={`/user/profile/${postById?.payload.data.userId}`}>
              <p className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-violet-500">
                {isExpert
                  ? expertProfile?.payload.data.fullname
                  : userById?.payload.data.fullName ||
                    userById?.payload.data.userName}
              </p>
            </Link>
            <p className="text-sm text-gray-500">
              {formatDateTime(postById?.payload.data.createAt as string)}
            </p>
          </div>

          {/* Mobile action buttons */}
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild className="ml-auto lg:hidden">
              <Button variant="iconSend" size="icon">
                <MoreHorizontal className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-56 mt-4 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              <DropdownMenuItem onClick={openBookmarkDialog}>
                <Bookmark className="mr-2 h-4 w-4" />
                <span>Lưu bài viết</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={openReportPostDialog}>
                <Flag className="mr-2 h-4 w-4" />
                <span>Báo cáo bài viết</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <BookmarkDialogMobile
            postId={postIdFromUrl as string}
            isOpen={isBookmarkDialogOpen}
            setIsOpen={setIsBookmarkDialogOpen}
          />
          <ReportPostSection
            postId={postIdFromUrl as string}
            isOpen={isReportDialogOpen}
            setIsOpen={setIsReportDialogOpen}
          />
        </div>

        <h1 className="flex justify-center text-3xl px-4 font-bold text-textChat">
          {postById?.payload.data.title}
        </h1>
        <div className="px-4 py-5 space-y-4 text-textChat">
          <div
            dangerouslySetInnerHTML={{
              __html: postById?.payload.data.description as string,
            }}
          />
        </div>
        <div className="flex bg-gray-500 w-auto h-0.5 mx-8 mb-8"></div>

        {/* Mobile action buttons */}
        <div className="flex items-center justify-between py-2 mb-4 border-t border-b lg:hidden">
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <Heart className="h-5 w-5 text-red-500" />
            Thích
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-2 text-muted-foreground"
          >
            <MessageCircle className="h-5 w-5 text-blue-500" />
            Bình luận
          </Button>
          <ShareSection postId={postIdFromUrl}>
            <Button
              variant="ghost"
              className="flex items-center gap-2 text-muted-foreground"
            >
              <Share2 className="h-5 w-5 text-green-500" />
              Chia sẻ
            </Button>
          </ShareSection>
        </div>

        {/* Comment section */}
        <div className="px-4 pb-3 space-y-4">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Bình luận
          </h2>
          <div className="w-full flex  relative gap-4">
            <Link href="#">
              <Avatar className="w-9 h-9 border-2 border-rose-300">
                <AvatarImage
                  src={imageComment.data?.payload.data.profilePicture}
                  alt={
                    imageComment.data?.payload.data.fullName ||
                    imageComment.data?.payload.data.userName
                  }
                />
                <AvatarFallback>
                  {imageComment.data?.payload.data.fullName ||
                    imageComment.data?.payload.data.userName}
                </AvatarFallback>
              </Avatar>
            </Link>
            <div className="w-full">
              <CommentSection
                comments={comments}
                onAddComment={handleAddComment}
                onAddReply={handleAddReply}
                deleteComment={handleDeleteComment}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
