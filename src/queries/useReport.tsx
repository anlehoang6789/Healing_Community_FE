import reportApiRequest from "@/apiRequests/report";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetReportPostQuery = () => {
  return useQuery({
    queryKey: ["reportPost"],
    queryFn: reportApiRequest.getReportPost,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetReportExpertQuery = () => {
  return useQuery({
    queryKey: ["reportExpert"],
    queryFn: reportApiRequest.getReportExpert,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
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
    refetchOnWindowFocus: true,
    refetchOnMount: true,
  });
};

export const useGetSystemReportQuery = () => {
  return useQuery({
    queryKey: ["systemReport"],
    queryFn: reportApiRequest.getSystemReport,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
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
