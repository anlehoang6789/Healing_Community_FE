"use client";

import * as React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Album, Briefcase, GraduationCap } from "lucide-react";

type Expert = {
  id: string;
  name: string;
  avatar: string;
  introduction: string;
  education: string[];
  experience: string[];
  certificates: { title: string; image: string }[];
};

const expert: Expert = {
  id: "1",
  name: "Nguyễn Văn A",
  avatar: "/placeholder.svg?height=100&width=100",
  introduction:
    "Chuyên gia tâm lý với hơn 10 năm kinh nghiệm trong lĩnh vực tư vấn và trị liệu tâm lý.",
  education: [
    "Tiến sĩ Tâm lý học, Đại học Quốc gia Hà Nội",
    "Thạc sĩ Tâm lý học lâm sàng, Đại học Y Hà Nội",
  ],
  experience: [
    "Giảng viên tại Khoa Tâm lý học, Đại học Khoa học Xã hội và Nhân văn (2010-hiện tại)",
    "Chuyên gia tư vấn tại Trung tâm Tư vấn Tâm lý ABC (2015-hiện tại)",
  ],
  certificates: [
    {
      title: "Chứng chỉ Trị liệu Nhận thức Hành vi",
      image:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
    {
      title: "Chứng nhận Chuyên gia Tâm lý Lâm sàng",
      image:
        "https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d",
    },
  ],
};

export default function ExpertProfile() {
  return (
    <div className="container mx-auto ">
      <Card>
        <CardContent className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Giới thiệu</h3>
          <p className="mb-4">{expert.introduction}</p>

          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <GraduationCap className="mr-2" /> Học vấn
          </h3>
          <ul className="list-disc list-inside mb-4">
            {expert.education.map((edu, index) => (
              <li key={index}>{edu}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-2 flex items-center">
            <Briefcase className="mr-2" /> Kinh nghiệm
          </h3>
          <ul className="list-disc list-inside mb-4">
            {expert.experience.map((exp, index) => (
              <li key={index}>{exp}</li>
            ))}
          </ul>

          <h3 className="text-lg font-semibold mb-2 flex items-center">
            {" "}
            <Album className="mr-2" />
            Chứng chỉ và Bằng cấp
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {expert.certificates.map((cert, index) => (
              <Card key={index}>
                <CardContent className="flex flex-col items-center pt-4">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    width={300}
                    height={200}
                    className="rounded-lg mb-2"
                  />
                  <p className="text-sm font-medium">{cert.title}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
