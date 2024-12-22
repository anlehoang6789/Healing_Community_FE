import detectorApiRequest from "@/apiRequests/detector";
import { useMutation } from "@tanstack/react-query";

export const useCheckContentByAIMutation = () => {
  return useMutation({
    mutationFn: detectorApiRequest.checkContentByAI,
  });
};
