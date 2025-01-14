"use client";
import ButtonTestAgain from "@/app/(registered-user)/test-result/button-test-again";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { useGetMBTIResultQuery } from "@/queries/useQuizz";
import ContentTestResultMBTITabs from "@/app/(registered-user)/test-result-mtbi/content-test-result-mbti-tabs";

export default function TestResultMBTI() {
  const { data: quizMTBIResult } = useGetMBTIResultQuery();

  // Nếu chưa có kết quả, hiển thị loading
  if (!quizMTBIResult) {
    return (
      <div className="min-h-screen p-8">
        <Card className="w-full max-w-6xl mx-auto">
          <div className="w-full">
            <CardHeader className="relative">
              <CardTitle className="text-green-500 text-3xl font-bold text-center mb-2 bg-gray-300 rounded h-8"></CardTitle>
              <div className="relative w-full h-[300px] bg-gray-300 rounded"></div>
            </CardHeader>
            <CardContent className="p-6 mb-4">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-green-100 p-4 rounded-lg animate-pulse">
                  <h3 className="font-bold text-green-700 mb-2 bg-gray-300 rounded h-6"></h3>
                  <p className="text-gray-700 bg-gray-300 rounded h-4 mb-2"></p>
                  <p className="text-sm mt-2 text-gray-700 bg-gray-300 rounded h-4"></p>
                </div>
                <div className="bg-blue-100 p-4 rounded-lg animate-pulse">
                  <h3 className="font-bold text-blue-700 mb-2 bg-gray-300 rounded h-6"></h3>
                  <p className="text-gray-700 bg-gray-300 rounded h-4 mb-2"></p>
                  <p className="text-sm mt-2 text-gray-700 bg-gray-300 rounded h-4"></p>
                </div>
                <div className="bg-red-100 p-4 rounded-lg animate-pulse">
                  <h3 className="font-bold text-red-700 mb-2 bg-gray-300 rounded h-6"></h3>
                  <p className="text-gray-700 bg-gray-300 rounded h-4 mb-2"></p>
                  <p className="text-sm mt-2 text-gray-700 bg-gray-300 rounded h-4"></p>
                </div>
              </div>
            </CardContent>
          </div>
          <div className="animate-pulse">
            <ContentTestResultMBTITabs />
          </div>
          <div className="animate-pulse">
            <ButtonTestAgain />
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <Card className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <CardHeader className="relative">
            <CardTitle className="text-green-500 text-3xl font-bold text-center mb-2">
              Kết Quả Kiểm Tra Tâm Lý MBTI
            </CardTitle>
            <div className="relative w-full h-[300px]">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Ftest_result.jpg?alt=media&token=6c41e6bb-b27e-4191-9cf5-068c74f3267a"
                alt="Test Result Illustration"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 mb-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold text-green-700">
                  Giác Quan (S) / Trực Giác (N)
                </h3>
                <p className="text-gray-700">
                  Điểm số: {quizMTBIResult.payload.data.judgingScore}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {quizMTBIResult.payload.data.judgingDescription}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700">
                  Hướng Ngoại (E) / Hướng Nội (I)
                </h3>
                <p className="text-gray-700">
                  Điểm số: {quizMTBIResult.payload.data.extroversionScore}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {quizMTBIResult.payload.data.extroversionDescription}
                </p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="font-bold text-red-700">
                  Lý Trí (T) / Cảm Xúc (F)
                </h3>
                <p className="text-gray-700">
                  Điểm số: {quizMTBIResult.payload.data.sensingScore}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {quizMTBIResult.payload.data.sensingDescription}
                </p>
              </div>
            </div>
            <div className="bg-red-100 p-4 rounded-lg text-center mt-4">
              <h3 className="font-bold text-red-700">
                Nguyên Tắc (J) / Linh Hoạt (P)
              </h3>
              <p className="text-gray-700">
                Điểm số: {quizMTBIResult.payload.data.thinkingScore}
              </p>
              <p className="text-sm mt-2 text-gray-700">
                {quizMTBIResult.payload.data.thinkingDescription}
              </p>
            </div>
          </CardContent>
        </div>
        <ContentTestResultMBTITabs />
        <ButtonTestAgain />
      </Card>
    </div>
  );
}
