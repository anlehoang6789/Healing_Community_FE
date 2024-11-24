import http from "@/lib/http";
import { GetCertificateTypeResponseType } from "@/schemaValidations/expert.schema";

const certificateApiRequest = {
  getCertificateTypes: () =>
    http.get<GetCertificateTypeResponseType>("expert/api/certificatetype/all"),
};

export default certificateApiRequest;
