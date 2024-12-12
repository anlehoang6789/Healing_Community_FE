import expertApiRequest from "@/apiRequests/expert";

import { CreateAvailableTimeSlotBodyType } from "@/schemaValidations/expert.schema";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetCertificateTypesQuery = () => {
  return useQuery({
    queryKey: ["certificate-types"],
    queryFn: () => expertApiRequest.getCertificateTypes(),
  });
};

export const useUploadFileForExpert = () => {
  return useMutation({
    mutationFn: ({
      formData,
      certificationTypeId,
    }: {
      formData: FormData;
      certificationTypeId: string;
    }) => expertApiRequest.uploadFileForExpert(formData, certificationTypeId),
  });
};

export const useUploadProfileImageForExpert = () => {
  return useMutation({
    mutationFn: expertApiRequest.uploadProfileImageForExpert,
  });
};

export const useGetExpertProfileQuery = (
  expertId: string,
  enabled?: boolean
) => {
  return useQuery({
    queryKey: ["expert-profile", expertId],
    queryFn: () => expertApiRequest.getExpertProfile(expertId),
    enabled,
  });
};

export const useUpdateProfileExpertMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expertApiRequest.updateProfileExpert,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-profile"],
        exact: true,
      });
    },
  });
};

export const useDeleteCertificate = () => {
  return useMutation({
    mutationFn: (certificateId: string) =>
      expertApiRequest.deleteCertificate(certificateId),
  });
};

export const useGetAllCertificates = () => {
  return useQuery({
    queryKey: ["certificates"],
    queryFn: () => expertApiRequest.getAllCertificates(),
  });
};

export const useGetAppointmentForUser = () => {
  return useQuery({
    queryKey: ["appointments-for-user"],
    queryFn: expertApiRequest.getAppointmentForUser,
  });
};

export const useGetAppointmentForExpert = () => {
  return useQuery({
    queryKey: ["appointments-for-expert"],
    queryFn: expertApiRequest.getAppointmentForExpert,
  });
};

export const useCreateAvailableTimeSlot = (expertProfileId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateAvailableTimeSlotBodyType) =>
      expertApiRequest.createAvailableTimeSlot(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-availability", expertProfileId],
      });
    },
    onError: (error) => {
      console.error("Mutation Error:", error);
    },
  });
};

export const useGetExpertAvailability = (expertProfileId: string) => {
  return useQuery({
    queryKey: ["expert-availability", expertProfileId],
    queryFn: () =>
      expertApiRequest.getExpertAvailabilityByExpertProfileId(expertProfileId),
    // Thêm cấu hình để xử lý trường hợp không có dữ liệu
    enabled: !!expertProfileId, // Chỉ chạy query khi expertProfileId có giá trị
  });
};

export const useDeleteAvailableTimeSlotByIdMutation = (
  expertProfileId: string
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expertApiRequest.deleteAvailableTimeSlotById,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-availability", expertProfileId],
      });
    },
  });
};

export const useGetExpertExperienceList = () => {
  return useQuery({
    queryKey: ["expert-experience-list"],
    queryFn: expertApiRequest.getExpertExperienceList,
  });
};

export const useAddExpertExperienceMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: expertApiRequest.addExpertExperience,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["expert-experience-list"],
      });
    },
  });
};
