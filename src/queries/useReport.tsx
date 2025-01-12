import reportApiRequest from "@/apiRequests/report";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetReportPostQuery = () => {
  return useQuery({
    queryKey: ["reportPost"],
    queryFn: reportApiRequest.getReportPost,
  });
};

export const useAddReportPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportApiRequest.addReportPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reportPost"],
      });
    },
  });
};

export const useApproveOrRejectReportPostMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportApiRequest.approveOrRejectReportPost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reportPost"],
      });
    },
  });
};
