import expertApiRequest from "@/apiRequests/expert";
import { GetAllCertificatesResponseType } from "@/schemaValidations/expert.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

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
