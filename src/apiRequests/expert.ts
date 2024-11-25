import http from "@/lib/http";
import {
  DeleteCertificateResponseSchema,
  DeleteCertificateResponseType,
  GetAllCertificatesResponseType,
  GetCertificateTypeResponseType,
  UploadFileForExpertResponseType,
} from "@/schemaValidations/expert.schema";

const expertApiRequest = {
  getCertificateTypes: () =>
    http.get<GetCertificateTypeResponseType>("expert/api/certificatetype/all"),

  

  uploadFileForExpert: (formData: FormData, certificationTypeId: string) =>
    http.post<UploadFileForExpertResponseType>(
      `expert/api/certificate/upload?certificationTypeId=${certificationTypeId}`,
      formData
    ),

  deleteCertificate: (certificateId: string) => {
    return http
      .delete<DeleteCertificateResponseType>(
        `expert/api/certificate/delete/${certificateId}`
      )
      .then((response) => {
        return DeleteCertificateResponseSchema.parse(response);
      });
  },

  getAllCertificates: () =>
    http.get<GetAllCertificatesResponseType>("expert/api/certificate/all"),
};

export default expertApiRequest;
