import ButtonTestAgain from "@/app/(registered-user)/test-result/button-test-again";
import ContentTestResultTabs from "@/app/(registered-user)/test-result/content-test-result-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";

export default function TestResult() {
  return (
    <div className="min-h-screen p-8">
      <Card className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <CardHeader className="relative">
            <CardTitle className=" text-green-500 text-3xl font-bold text-center mb-2">
              Stress cấp tính (Acute Stress)
            </CardTitle>
            <div className="relative w-full h-[300px]">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                alt="INFP Illustration"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 mb-4">
            <p className="text-muted-foreground mb-4 border-l-4 border-green-400 pl-2 text-base md:text-xl">
              Đây là dạng stress ngắn hạn, thường phát sinh từ các tình huống cụ
              thể hoặc sự kiện gây căng thẳng như công việc, học tập, hay vấn đề
              cá nhân. Người trải qua stress cấp tính thường cảm thấy lo lắng,
              căng thẳng hoặc sợ hãi trong một khoảng thời gian ngắn
            </p>
            <ButtonTestAgain />
          </CardContent>
        </div>

        <ContentTestResultTabs />
      </Card>
    </div>
  );
}
