import reportApiRequest from "@/apiRequests/report";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetReportPostQuery = () => {
  return useQuery({
    queryKey: ["reportPost"],
    queryFn: reportApiRequest.getReportPost,
    refetchOnWindowFocus: true,
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
      queryClient.invalidateQueries({
        queryKey: ["moderatorActivityReportExpert"],
      });
    },
  });
};

export const useGetModeratorActivityReportExpertQuery = () => {
  return useQuery({
    queryKey: ["moderatorActivityReportExpert"],
    queryFn: reportApiRequest.getModeratorActivityReportExpert,
  });
};

export const useAddReportExpertMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportApiRequest.addReportExpert,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["reportExpert"],
      });
    },
  });
};

export const useGetModeratorActivityReportCommentQuery = () => {
  return useQuery({
    queryKey: ["moderatorActivityReportComment"],
    queryFn: reportApiRequest.getModeratorActivityReportComment,
  });
};

export const useGetSystemReportQuery = () => {
  return useQuery({
    queryKey: ["systemReport"],
    queryFn: reportApiRequest.getSystemReport,
  });
};

export const useAddSystemReportMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: reportApiRequest.addSystemReport,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["systemReport"],
      });
    },
  });
};
