import certificateApiRequest from "@/apiRequests/expert";
import { GetCertificateTypeResponseType } from "@/schemaValidations/expert.schema";
import { useQuery } from "@tanstack/react-query";

export const useGetCertificateTypesQuery = () => {
  return useQuery({
    queryKey: ["certificate-types"],
    queryFn: () => certificateApiRequest.getCertificateTypes(),
  });
};
