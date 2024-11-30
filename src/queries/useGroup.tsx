import groupApiRequest from "@/apiRequests/group";
import { useQuery } from "@tanstack/react-query";

export const useGetAllGroupsQuery = () => {
  return useQuery({
    queryKey: ["get-all-groups"],
    queryFn: groupApiRequest.getAllGroups,
  });
};
