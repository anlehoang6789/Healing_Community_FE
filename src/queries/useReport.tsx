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
      queryClient.invalidateQueries({
        queryKey: ["moderatorActivityReportPost"],
      });
    },
  });
};

export const useGetModeratorActivityReportPostQuery = () => {
  return useQuery({
    queryKey: ["moderatorActivityReportPost"],
    queryFn: reportApiRequest.getModeratorActivityReportPost,
  });
};

export const useGetReportExpertQuery = () => {
  return useQuery({
    queryKey: ["reportExpert"],
    queryFn: reportApiRequest.getReportExpert,
  });
};

export const useApproveOrRejectReportExpertMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportApiRequest.approveOrRejectReportExpert,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reportExpert"],
      });
    },
  });
};
