import expertApiRequest from "@/apiRequests/expert";
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
