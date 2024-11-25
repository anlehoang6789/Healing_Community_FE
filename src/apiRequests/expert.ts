import http from "@/lib/http";
import {
  CreateAvailableTimeSlotBodyType,
  CreateAvailableTimeSlotResponseSchema,
  CreateAvailableTimeSlotResponseType,
  DeleteCertificateResponseSchema,
  DeleteCertificateResponseType,
  GetAllCertificatesResponseType,
  GetCertificateTypeResponseType,
  GetExpertAvailabilityExpertProfileIdResponseType,
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

  createAvailableTimeSlot: (data: CreateAvailableTimeSlotBodyType) => {
    return http.post<CreateAvailableTimeSlotResponseType>(
      "expert/api/expertavailability/create",
      data
    );
  },

  getExpertAvailabilityByExpertProfileId: (expertProfileId: string) => {
    return http
      .get<GetExpertAvailabilityExpertProfileIdResponseType>(
        `expert/api/expertavailability/get/${expertProfileId}`
      )
      .then((response) => {
        return response;
      });
  },
};

export default expertApiRequest;
