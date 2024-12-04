import groupApiRequest from "@/apiRequests/group";
import { CreateGroupRequestType } from "@/schemaValidations/group.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useCreateGroupMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateGroupRequestType) =>
      groupApiRequest.createGroup(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["get-all-groups"] });
    },
    onError: (error) => {
      console.error("Failed to create group:", error);
    },
  });
};
