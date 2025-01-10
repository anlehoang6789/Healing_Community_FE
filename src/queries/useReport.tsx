import reportApiRequest from "@/apiRequests/report";
import { useQuery } from "@tanstack/react-query";

export const useGetReportPostQuery = () => {
  return useQuery({
    queryKey: ["reportPost"],
    queryFn: reportApiRequest.getReportPost,
  });
};
