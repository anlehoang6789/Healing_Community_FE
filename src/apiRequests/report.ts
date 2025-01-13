import http from "@/lib/http";
import {
  AddReportPostBodyType,
  ApproveOrRejectReportPostBodyType,
  AprroveOrRejectReportExpertBodyType,
  GetModeratorActivityReportPostListResType,
  GetReportExpertListResType,
  GetReportPostListResType,
} from "@/schemaValidations/report.schema";

const reportApiRequest = {
  getReportPost: () =>
    http.get<GetReportPostListResType>("report/api/report/get-post-report"),
  addReportPost: (body: AddReportPostBodyType) =>
    http.post<{ message: string }>("post/api/report/report-post", body),
  approveOrRejectReportPost: (body: ApproveOrRejectReportPostBodyType) =>
    http.post<{ message: string }>("post/api/ban/ban-post", body),
  getModeratorActivityReportPost: () =>
    http.get<GetModeratorActivityReportPostListResType>(
      "report/api/moderatoractivity/get-post-report-activity"
    ),
  getReportExpert: () =>
    http.get<GetReportExpertListResType>(
      "report/api/report/get-appointment-report"
    ),
  approveOrRejectReportExpert: (body: AprroveOrRejectReportExpertBodyType) =>
    http.post<{ message: string }>(
      "expert/api/moderateappointment/moderate-appointment-report",
      body
    ),
};

export default reportApiRequest;
