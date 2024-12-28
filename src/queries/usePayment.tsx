import paymentApiRequest from "@/apiRequests/payment";
import { CreatePaymentRequestType } from "@/schemaValidations/payment.schema";

import { useMutation, useQuery } from "@tanstack/react-query";

export const usePaymentHistoryQuery = () => {
  return useQuery({
    queryKey: ["payment-history-list"],
    queryFn: paymentApiRequest.listPaymentHistory,
  });
};

export const useBookExpertScheduleMutation = () => {
  return useMutation({
    mutationFn: paymentApiRequest.bookExpertSchedule,
  });
};

export const useCreatePaymentMutation = () => {
  return useMutation({
    mutationFn: (payload: CreatePaymentRequestType) =>
      paymentApiRequest.createPayment(payload),
  });
};

export const usePaymentHistoryDetailsQuery = ({
  paymentId,
  enabled,
}: {
  paymentId: string;
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["payment-history-details", paymentId],
    queryFn: () => paymentApiRequest.getPaymentHistoryDetails(paymentId),
    enabled,
  });
};
