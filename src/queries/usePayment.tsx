import paymentApiRequest from "@/apiRequests/payment";
import { CreatePaymentRequestType } from "@/schemaValidations/payment.schema";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

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

export const useGetFeeServiceQuery = () => {
  return useQuery({
    queryKey: ["fee-service"],
    queryFn: paymentApiRequest.getFeeService,
  });
};

export const useUpdateFeeServiceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: paymentApiRequest.updateFeeService,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fee-service"],
      });
    },
  });
};

export const usePaymentHistoryForModeratorQuery = () => {
  return useQuery({
    queryKey: ["payment-history-moderator"],
    queryFn: paymentApiRequest.getPaymentHistoryForModerator,
  });
};

export const usePaymentHistoryForUserQuery = ({
  enabled,
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["payment-history-user"],
    queryFn: paymentApiRequest.getPaymentHistoryForUser,
    enabled,
  });
};

export const usePaymentHistoryForExpertQuery = ({
  enabled,
}: {
  enabled: boolean;
}) => {
  return useQuery({
    queryKey: ["payment-history-expert"],
    queryFn: paymentApiRequest.getPaymentHistoryForExpert,
    enabled,
  });
};

export const useGetTotalRevenueForExpert = () => {
  return useQuery({
    queryKey: ["totalRevenueForExpert"],
    queryFn: paymentApiRequest.getTotalRevenueForExpert,
  });
};
