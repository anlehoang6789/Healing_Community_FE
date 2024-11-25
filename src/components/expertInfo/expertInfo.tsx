"use client";

import * as React from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Album, Briefcase } from "lucide-react";
import { getUserIdFromLocalStorage } from "@/lib/utils";
import {
  useGetCertificateTypesQuery,
  useGetExpertProfileQuery,
} from "@/queries/useExpert";
import { GetExpertProfileSchemaType } from "@/schemaValidations/expert.schema";
import Link from "next/link";

export default function ExpertProfile() {
  // Thêm kiểm tra null và gán giá trị mặc định
  const expertId = getUserIdFromLocalStorage() ?? "";

  const {
    data: expertProfileResponse,
    isLoading,
    error,
  } = useGetExpertProfileQuery(expertId);

  const { data: certificateTypesResponse } = useGetCertificateTypesQuery();

  // Xử lý trường hợp loading và error
  if (isLoading) {
    return <div>Đang tải thông tin...</div>;
  }

  if (error) {
    return <div>Có lỗi xảy ra khi tải thông tin chuyên gia</div>;
  }

  // Kiểm tra nếu không có dữ liệu
  if (
    !expertProfileResponse ||
    !expertProfileResponse.payload ||
    !certificateTypesResponse ||
    !certificateTypesResponse.payload
  ) {
    return <div>Không tìm thấy thông tin</div>;
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
    <div className="container mx-auto ">
      <Card>
        <CardContent className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
          <p className="mb-4">{expertProfile.bio}</p>

          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Briefcase className="mr-2" /> Chuyên môn
          </h3>
          <p className="mb-4">{expertProfile.specialization}</p>

          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Briefcase className="mr-2" /> Lĩnh vực chuyên nghiệp
          </h3>
          <p className="mb-4">{expertProfile.expertiseAreas}</p>

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
                      {new Date(certificate.issueDate).toLocaleDateString()}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
