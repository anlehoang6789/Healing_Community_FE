import { userApiRequest } from "@/apiRequests/user";
import { GetUsersResponseType } from "@/schemaValidations/user.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetAllUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userApiRequest.getAllUsers,
    select: (response) => response.payload.data,
  });
};

export const useGetToManageUser = () => {
  return useQuery({
    queryKey: ["manage-users"],
    queryFn: userApiRequest.getToManageUser,
  });
};
