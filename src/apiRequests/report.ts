import http from "@/lib/http";
import {
  AddReportPostBodyType,
  ApproveOrRejectReportPostBodyType,
  GetReportPostListResType,
} from "@/schemaValidations/report.schema";

const reportApiRequest = {
  getReportPost: () =>
    http.get<GetReportPostListResType>("report/api/report/get-post-report"),
  addReportPost: (body: AddReportPostBodyType) =>
    http.post<{ message: string }>("post/api/report/report-post", body),
  approveOrRejectReportPost: (body: ApproveOrRejectReportPostBodyType) =>
    http.post<{ message: string }>("post/api/ban/ban-post", body),
};

export default reportApiRequest;
