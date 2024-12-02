import groupApiRequest from "@/apiRequests/group";
import { GetAllGroupsJoinedByUserIdResponseType } from "@/schemaValidations/group.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGroupsQuery = () => {
  return useQuery({
    queryKey: ["get-all-groups"],
    queryFn: groupApiRequest.getAllGroups,
  });
};

export const useGetGroupsByUserIdQuery = (userId: string) => {
  return useQuery({
    queryKey: ["get-groups-by-user-id", userId],
    queryFn: () => groupApiRequest.getGroupsJoinedByUserId(userId),
    enabled: !!userId,
  });
};
