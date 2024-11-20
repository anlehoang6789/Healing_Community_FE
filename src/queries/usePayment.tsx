import paymentApiRequest from "@/apiRequests/payment";
import { useQuery } from "@tanstack/react-query";

export const usePaymentHistoryQuery = () => {
  return useQuery({
    queryKey: ["payment-history-list"],
    queryFn: paymentApiRequest.listPaymentHistory,
  });
};
