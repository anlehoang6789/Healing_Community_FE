"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Album, BookOpenCheck, Briefcase, ClipboardList } from "lucide-react";
import { getUserIdFromLocalStorage, handleErrorApi } from "@/lib/utils";
import {
  useGetCertificateTypesQuery,
  useGetExpertProfileQuery,
} from "@/queries/useExpert";
import { GetExpertProfileSchemaType } from "@/schemaValidations/expert.schema";
import Link from "next/link";
import { useParams } from "next/navigation";
import ViewRatingExpert from "@/components/expertInfo/view-rating-expert";

export default function ExpertProfile() {
  const { expertId } = useParams();

  const {
    data: expertProfileResponse,
    isLoading,
    error,
  } = useGetExpertProfileQuery(expertId as string);

  const { data: certificateTypesResponse } = useGetCertificateTypesQuery();

  // Xử lý trường hợp loading và error
  if (isLoading) {
    return (
      <div className="container mx-auto">
        <Card>
          <CardContent className="mt-4">
            <h3 className="text-lg font-semibold mb-2 animate-pulse bg-gray-300 rounded w-3/4 h-6"></h3>
            <p className="mb-4 animate-pulse bg-gray-300 rounded w-full h-4"></p>

            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Briefcase className="mr-2" />
              <span className="animate-pulse bg-gray-300 rounded w-1/2 h-6"></span>
            </h3>
            <p className="mb-4 animate-pulse bg-gray-300 rounded w-full h-4"></p>

            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Briefcase className="mr-2" />
              <span className="animate-pulse bg-gray-300 rounded w-1/2 h-6"></span>
            </h3>
            <p className="mb-4 animate-pulse bg-gray-300 rounded w-full h-4"></p>

            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Album className="mr-2" />
              <span className="animate-pulse bg-gray-300 rounded w-1/2 h-6"></span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[...Array(4)].map((_, index) => (
                <Card key={index} className="animate-pulse">
                  <CardContent className="flex flex-col items-center pt-4">
                    <div className="w-full h-48 bg-gray-300 rounded mb-2"></div>
                    <p className="text-sm font-medium mt-2 bg-gray-300 rounded w-3/4 h-4"></p>
                    <p className="text-xs text-gray-500 bg-gray-300 rounded w-1/2 h-4"></p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    handleErrorApi({ error });
  }

  if (
    !expertProfileResponse ||
    !expertProfileResponse.payload ||
    !certificateTypesResponse ||
    !certificateTypesResponse.payload
  ) {
    return <div>Chưa có thông tin chuyên gia</div>;
  }

  // Lấy dữ liệu từ response
  const expertProfile: GetExpertProfileSchemaType =
    expertProfileResponse.payload.data;

  // Tạo map từ certificateTypeId sang tên chứng chỉ
  const certificateTypeMap = certificateTypesResponse.payload.data.reduce(
    (acc, certificateType) => {
      acc[certificateType.certificateTypeId] = certificateType.name;
      return acc;
    },
    {} as Record<string, string>
  );

  return (
    <div className="container mx-auto mb-4">
      <Card>
        <CardContent className="mt-4">
          {expertProfile.bio && expertProfile.bio.length > 0 && (
            <>
              <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
              <p className="mb-4">{expertProfile.bio}</p>
            </>
          )}

          {expertProfile.specialization &&
            expertProfile.specialization.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <ClipboardList className="mr-2" /> Chuyên môn
                </h3>
                <p className="mb-4">{expertProfile.specialization}</p>
              </>
            )}

          {expertProfile.expertiseAreas &&
            expertProfile.expertiseAreas.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <BookOpenCheck className="mr-2" /> Lĩnh vực chuyên nghiệp
                </h3>
                <p className="mb-4">{expertProfile.expertiseAreas}</p>
              </>
            )}

          {expertProfile.workExperiences &&
            expertProfile.workExperiences.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Briefcase className="mr-2" /> Kinh nghiệm làm việc
                </h3>
                <ul className="mb-4 list-disc pl-6">
                  {expertProfile.workExperiences.map((experience, index) => (
                    <li key={index} className="mb-2">
                      Đã từng làm {experience.positionTitle} ở{" "}
                      <strong>{experience.companyName}</strong> từ ngày{" "}
                      {new Date(experience.startDate).toLocaleDateString(
                        "vi-VN"
                      )}{" "}
                      -{" "}
                      {experience.endDate
                        ? new Date(experience.endDate).toLocaleDateString(
                            "vi-VN"
                          )
                        : "nay"}
                      {experience.description && ` (${experience.description})`}
                    </li>
                  ))}
                </ul>
              </>
            )}

          {expertProfile.certificates &&
            expertProfile.certificates.length > 0 && (
              <>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  {" "}
                  <Album className="mr-2" />
                  Chứng chỉ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expertProfile.certificates.map((certificate) => {
                    // Lấy tên chứng chỉ
                    const certificateTypeName =
                      certificateTypeMap[certificate.certificateTypeId] ||
                      "Chứng chỉ chưa xác định";

                    return (
                      <Card key={certificate.certificateId}>
                        <CardContent className="flex flex-col items-center pt-4">
                          <Link
                            href={certificate.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mb-2"
                          >
                            <Image
                              src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/logo%2Fch%E1%BB%A9ngchi3.png?alt=media&token=ba977637-d658-4d41-9eb0-c78bf9397356"
                              alt={`Chứng chỉ ${certificateTypeName}`}
                              width={300}
                              height={300}
                              className="rounded-lg object-cover"
                            />
                          </Link>
                          <p className="text-sm font-medium mt-2">
                            {certificateTypeName}
                          </p>
                          <p className="text-xs text-gray-500">
                            Ngày cấp:{" "}
                            {new Date(
                              certificate.issueDate
                            ).toLocaleDateString()}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </>
            )}
          <ViewRatingExpert expertProfileId={expertProfile.expertProfileId} />
        </CardContent>
      </Card>
    </div>
  );
}
