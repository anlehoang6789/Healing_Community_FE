"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import { useAppContext } from "@/components/app-provider";
import { useLogoutMutation } from "@/queries/useAuth";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useGetUserProfileQuery } from "@/queries/useAccount";

const account = {
  name: "Hoàng An",
  avatar: "https://i.pravatar.cc/150",
};
export default function AdminAvatar() {
  const router = useRouter();
  const { setIsAuth } = useAppContext();

  const userId = getUserIdFromLocalStorage();

  const { data } = useGetUserProfileQuery(userId as string);

  const logoutMutation = useLogoutMutation();
  const handleLogout = async () => {
    if (logoutMutation.isPending) return;
    try {
      await logoutMutation.mutateAsync();
      setIsAuth(false);
      router.push("/");
    } catch (error) {
      handleErrorApi({ error });
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="overflow-hidden rounded-full"
        >
          <Avatar>
            <AvatarImage
              src={data?.payload.data.profilePicture}
              alt={data?.payload.data.fullName}
            />
            <AvatarFallback>
              {data?.payload.data.fullName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{data?.payload.data.fullName}</DropdownMenuLabel>
        <DropdownMenuSeparator className="bg-primary" />

        <DropdownMenuItem onClick={handleLogout}>Đăng xuất</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
