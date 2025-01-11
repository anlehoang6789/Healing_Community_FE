import http from "@/lib/http";
import { GetReportPostListResType } from "@/schemaValidations/report.schema";

const reportApiRequest = {
  getReportPost: () =>
    http.get<GetReportPostListResType>("report/api/report/get-post-report"),
};

export default reportApiRequest;
