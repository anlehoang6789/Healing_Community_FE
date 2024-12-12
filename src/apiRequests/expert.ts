import http from "@/lib/http";
import {
  AppointmentExpertListResType,
  AppointmentUserListResType,
  CreateAvailableTimeSlotBodyType,
  CreateAvailableTimeSlotResponseType,
  CreateExpertExperienceBodyType,
  DeleteCertificateResponseType,
  ExpertExperienceListResType,
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
    return http.delete<DeleteCertificateResponseType>(
      `expert/api/certificate/delete/${certificateId}`
    );
  },
  getAllCertificates: () =>
    http.get<GetAllCertificatesResponseType>("expert/api/certificate/all"),

  getAppointmentForUser: () =>
    http.get<AppointmentUserListResType>("expert/api/appointment/user"),
  getAppointmentForExpert: () =>
    http.get<AppointmentExpertListResType>("expert/api/appointment/expert"),

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

  deleteAvailableTimeSlotById: (expertAvailabilityId: string) =>
    http.delete<{ message: string }>(
      `expert/api/expertavailability/delete/${expertAvailabilityId}`
    ),
  getExpertExperienceList: () =>
    http.get<ExpertExperienceListResType>("expert/api/workexperience/get"),
  addExpertExperience: (body: CreateExpertExperienceBodyType) =>
    http.post<{ message: string }>("expert/api/workexperience/create", body),
  deleteExpertExperience: (workExperienceId: string) =>
    http.delete<{ message: string }>(
      `expert/api/workexperience/delete/${workExperienceId}`
    ),
};

export default expertApiRequest;
