import http from "@/lib/http";
import {
  AddReportExpertBodyType,
  AddReportPostBodyType,
  AddSystemReportBodyType,
  ApproveOrRejectReportPostBodyType,
  AprroveOrRejectReportExpertBodyType,
  GetModeratorActivityReportCommentListResType,
  GetModeratorActivityReportExpertListResType,
  GetModeratorActivityReportPostListResType,
  GetReportExpertListResType,
  GetReportPostListResType,
  GetSystemReportListResType,
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
  getModeratorActivityReportExpert: () =>
    http.get<GetModeratorActivityReportExpertListResType>(
      "report/api/moderatoractivity/get-appointment-report-activity"
    ),
  addReportExpert: (body: AddReportExpertBodyType) =>
    http.post<{ message: string }>(
      "expert/api/report/report-appointment",
      body
    ),
  getModeratorActivityReportComment: () =>
    http.get<GetModeratorActivityReportCommentListResType>(
      "report/api/moderatoractivity/get-comment-report-activity"
    ),
  getSystemReport: () =>
    http.get<GetSystemReportListResType>("report/api/report/get-system-report"),
  addSystemReport: (body: AddSystemReportBodyType) =>
    http.post<{ message: string }>("user/api/report/send-report-system", body),
};

export default reportApiRequest;
