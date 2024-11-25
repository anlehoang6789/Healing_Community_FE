import http from "@/lib/http";
import {
  GetCertificateTypeResponseType,
  GetExpertProfileResType,
  UpdateProfileExpertBodyType,
  UploadFileForExpertResponseType,
  UploadProfileImageForExpertResponseType,
} from "@/schemaValidations/expert.schema";

const expertApiRequest = {
  getCertificateTypes: () =>
    http.get<GetCertificateTypeResponseType>("expert/api/certificatetype/all"),

  uploadFileForExpert: (formData: FormData, certificationTypeId: string) =>
    http.post<UploadFileForExpertResponseType>(
      `expert/api/certificate/upload?certificationTypeId=${certificationTypeId}`,
      formData
    ),
  uploadProfileImageForExpert: (formData: FormData) =>
    http.post<UploadProfileImageForExpertResponseType>(
      "expert/api/expertprofile/upload-profile-image",
      formData
    ),
  updateProfileExpert: (body: UpdateProfileExpertBodyType) =>
    http.put<{ message: string }>("expert/api/expertprofile/update", body),
  getExpertProfile: (expertId: string) =>
    http.get<GetExpertProfileResType>(
      `expert/api/expertprofile/profile/${expertId}`
    ),
};

export default expertApiRequest;
