"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  useGetGroupDetailsByGroupIdQuery,
  useGetGroupInfoQuery,
  useGetRecommendGroupQuery,
  useJoinGroupMutation,
} from "@/queries/useGroup";
import { Users as UserIcon, ChevronsRight, Ellipsis } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { toast } from "@/hooks/use-toast";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";

const colors = [
  "bg-red-100",
  "bg-orange-100",
  "bg-yellow-100",
  "bg-green-100",
  "bg-blue-100",
  "bg-indigo-100",
  "bg-purple-100",
  "bg-pink-100",
  "bg-cyan-100",
  "bg-teal-100",
];

const RecommendGroup = ({
  groupId,
  totalRecommendGroup,
  index,
  onCloseDialog,
}: {
  groupId: string;
  totalRecommendGroup: number;
  index: number;
  onCloseDialog: () => void;
}) => {
  const router = useRouter();
  const userIdFromLocalStorage = getUserIdFromLocalStorage();
  const [isOpen, setIsOpen] = React.useState(false);
  const { data } = useGetGroupDetailsByGroupIdQuery({ groupId });
  const color = colors[index % colors.length];
  const { theme } = useTheme();
  const { data: groupJoin } = useGetGroupInfoQuery({
    userId: userIdFromLocalStorage as string,
  });
  const groupJoinList = groupJoin?.payload.data || [];
  const isMember = groupJoinList.some((group) => group.groupId === groupId);
  const joinGroupMutation = useJoinGroupMutation(
    userIdFromLocalStorage as string
  );
  const handleJoinGroup = async (groupId: string) => {
    try {
      const result = await joinGroupMutation.mutateAsync({ groupId });
      toast({
        description: result.payload.message || "Tham gia nhóm thành công!",
        variant: "success",
      });
      setIsOpen(false);
      onCloseDialog();
    } catch (error) {
      handleErrorApi({ error });
    }
  };

  const handleNavigation = () => {
    setIsOpen(false);
    onCloseDialog();
    router.push(`/user/group/${groupId}`);
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-textChat">
        {totalRecommendGroup} nhóm phù hợp với tâm lý của bạn
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          className={`${color} rounded-lg p-4 flex items-center space-x-4 text-black cursor-pointer relative`}
        >
          <Avatar>
            <AvatarImage
              src={
                data?.payload.data.avatarGroup ||
                `https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d`
              }
              alt={data?.payload.data.groupName}
            />
            <AvatarFallback>{data?.payload.data.groupName}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold">{data?.payload.data.groupName}</h3>
            <p className="text-sm text-muted-foreground">
              Hiện có: {data?.payload.data.currentMemberCount} thành viên
            </p>
          </div>
          <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger asChild className="absolute right-2 top-2">
              <Button variant="iconSend" size={"sm"}>
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className={`w-56 mt-4 ${
                theme === "dark" ? "bg-black text-white" : "bg-white text-black"
              }`}
            >
              {!isMember && (
                <DropdownMenuItem onClick={() => handleJoinGroup(groupId)}>
                  <span>Tham gia nhóm</span>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={handleNavigation}>
                <span>Truy cập nhóm</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default function DialogRecommendGroup() {
  const { data: recommendGroup } = useGetRecommendGroupQuery();
  const recommendGroupList = recommendGroup?.payload.data || [];

  //check xem có bao nhiêu data trả về
  const totalRecommendGroup = recommendGroupList.length;
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <Dialog modal={false} open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button className=" rounded-xl w-full py-2 bg-gray-100 hover:border hover:border-green-500 flex items-center justify-between">
          <div className="flex items-center px-3">
            <UserIcon className="text-green-500 mr-2" />
            <div className="flex flex-col items-start">
              <strong className="text-green-500 text-sm">10 nhóm</strong>
              <div className="flex items-center text-xs text-gray-600">
                <p>Phù hợp với</p> <b className="pl-1">Tâm lý của bạn</b>
              </div>
            </div>
          </div>
          <ChevronsRight className="text-green-500 pr-2" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl ">
        <DialogTitle className="sr-only">Edit profile</DialogTitle>
        <DialogDescription className="sr-only">
          Make changes to your profile here. Click save when done.
        </DialogDescription>
        <ScrollArea className="h-[60vh]">
          {recommendGroupList.map((group, index) => (
            <RecommendGroup
              key={group.groupId}
              groupId={group.groupId}
              totalRecommendGroup={totalRecommendGroup}
              index={index}
              onCloseDialog={handleCloseDialog}
            />
          ))}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
