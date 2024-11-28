import http from "@/lib/http";
import {
  BookExpertScheduleReqType,
  BookExpertScheduleResType,
  CreatePaymentRequestType,
  CreatePaymentResponseType,
  PaymentHistoryListResType,
} from "@/schemaValidations/payment.schema";

const paymentApiRequest = {
  listPaymentHistory: () =>
    http.get<PaymentHistoryListResType>("payment/api/payment/history"),

  bookExpertSchedule: (requestBody: BookExpertScheduleReqType) =>
    http.post<BookExpertScheduleResType>(
      "expert/api/appointment/book",
      requestBody
    ),

  createPayment: (payload: CreatePaymentRequestType) =>
    http.post<CreatePaymentResponseType>("payment/api/payment/create", payload),
};
export default paymentApiRequest;
