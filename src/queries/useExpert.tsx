import expertApiRequest from "@/apiRequests/expert";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { GetAllCertificatesResponseType } from "@/schemaValidations/expert.schema";

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

export const useGetExpertProfileQuery = (expertId: string) => {
  return useQuery({
    queryKey: ["expert-profile", expertId],
    queryFn: () => expertApiRequest.getExpertProfile(expertId),
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
