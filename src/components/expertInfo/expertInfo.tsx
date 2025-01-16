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
  const { userId } = useParams();

  const {
    data: expertProfileResponse,
    isLoading,
    error,
  } = useGetExpertProfileQuery(userId as string);

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
    return <div className="text-textChat">Chưa có thông tin chuyên gia</div>;
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

  const certificateImages = {
    "01JGCC46KCD84GRNKV9789GKMJ":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FBangcunhan.png?alt=media&token=c43246b0-4146-4849-baf9-a2dbead19541",
    "01JGCC65AF3ZQ6E6MT5112VAY3":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FBangcunhan.png?alt=media&token=c43246b0-4146-4849-baf9-a2dbead19541",
    "01JGCC6B99E5NJ0EG7REMGJW9W":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FBangtiensi.png?alt=media&token=aa4d4118-b278-402a-b16a-3481442427bb",
    "01JGCC6K4S44TQBDSW9G1XQCX3":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FScreenshot%202025-01-16%20132756.png?alt=media&token=2f75a882-3298-43c5-acb0-332246859305",
    "01JGCC726DNCJCQDXAJQXS63VD":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FCCCD.png?alt=media&token=22a781df-2321-4344-bff1-804d79033f45",
    "01JGCC79VX3NH6ZVKA1KSG6D41":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FHinhthe.png?alt=media&token=2c75e758-77ec-49b4-8c81-75a490f73756",
    "01JGCC7GS0CYJQ5TGN90Z0TJYZ":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2FAm-nhac-chua-benh-chua-benh-tram-cam.jpg?alt=media&token=976b83e3-a439-4bf0-8d2f-b659407ac7de",
    "01JGCC7QVP5VAJQDVDAS1416TS":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2Fhoi-tho-trong-yoga-chua-lanh-co-the-jpg.webp?alt=media&token=95f47195-1936-4747-8966-06c029f476f1",
    "01JGCC7YMEQ0JT5GSWBS9MTX0F":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2Fpositive-psychology-1.webp?alt=media&token=51b193e7-2a76-449a-bcbb-696938b5e80a",
    "01JGCC85MWRTAGS2GM5VQB6KZG":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2Fyoga.png?alt=media&token=880cd851-02a0-4b10-9929-5813817614b1",
    "01JGCC8CEP8M8X940RPPE17K0M":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2F1-uk4yrucg-yewyea3f_tnga.webp?alt=media&token=9458ba55-6a8f-482d-bb29-071bf12d76fd",
    "01JGCC8W6HD0FGFVJG6RVC6QMZ":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2Fchungchikhac.jpg?alt=media&token=5550c9da-e166-447f-887d-a9b86e628c41",
    "01JGCC6VGQE7HJZJ333Y7N6WYZ":
      "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/certificates%2Fchua-lanh-avatar.jpg?alt=media&token=11fb5a5c-c74b-4a62-ae7f-5de7793855c7",
  };

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
            expertProfile.certificates.some(
              (certificate) => certificate.status === 1
            ) && (
              <>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  {" "}
                  <Album className="mr-2" />
                  Chứng chỉ
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {expertProfile.certificates
                    .filter((certificate) => certificate.status === 1)
                    .map((certificate) => {
                      // Lấy tên chứng chỉ
                      const certificateTypeName =
                        certificateTypeMap[certificate.certificateTypeId] ||
                        "Chứng chỉ chưa xác định";

                      const certificateImageUrl =
                        certificateImages[
                          certificate.certificateTypeId as keyof typeof certificateImages
                        ] ||
                        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/logo%2Fch%E1%BB%A9ngchi3.png?alt=media&token=ba977637-d658-4d41-9eb0-c78bf9397356";

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
                                src={certificateImageUrl}
                                alt={`Chứng chỉ ${certificateTypeName}`}
                                width={300}
                                height={300}
                                className="rounded-lg object-cover"
                              />
                            </Link>
                            <p className="text-sm font-medium mt-2">
                              {certificateTypeName}
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
