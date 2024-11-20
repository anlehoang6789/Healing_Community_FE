import http from "@/lib/http";
import { PaymentHistoryListResType } from "@/schemaValidations/payment.schema";

const paymentApiRequest = {
  listPaymentHistory: () =>
    http.get<PaymentHistoryListResType>("payment/api/payment/history"),
};
export default paymentApiRequest;
