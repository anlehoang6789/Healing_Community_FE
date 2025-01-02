import http from "@/lib/http";
import {
  BookExpertScheduleReqType,
  BookExpertScheduleResType,
  CreatePaymentRequestType,
  CreatePaymentResponseType,
  GetFeeServiceResType,
  PaymentHistoryDetailsResType,
  PaymentHistoryListResType,
  UpdateFeeServiceType,
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
  getPaymentHistoryDetails: (paymentId: string) =>
    http.get<PaymentHistoryDetailsResType>(
      `payment//api/payment/details/${paymentId}`
    ),
  getFeeService: () =>
    http.get<GetFeeServiceResType>("payment/api/platformfee/get-fees"),
  updateFeeService: (body: UpdateFeeServiceType) =>
    http.put<{ message: string }>("payment/api/platformfee/update-fee", body),
};
export default paymentApiRequest;
