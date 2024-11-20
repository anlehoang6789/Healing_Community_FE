"use client";

import ButtonTestAgain from "@/app/(registered-user)/test-result/button-test-again";
import ContentTestResultTabs from "@/app/(registered-user)/test-result/content-test-result-tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Dass21ScoreResponseType } from "@/schemaValidations/quizz.schema";

export default function TestResult() {
  const [quizResult, setQuizResult] = useState<Dass21ScoreResponseType | null>(
    null
  );

  useEffect(() => {
    const storedResult = localStorage.getItem("quizResult");

    if (storedResult) {
      try {
        const parsedResult = JSON.parse(
          storedResult
        ) as Dass21ScoreResponseType;
        setQuizResult(parsedResult);
      } catch (error) {
        console.error("Error parsing quiz result:", error);
      }
    }
  }, []);

  // Nếu chưa có kết quả, hiển thị loading
  if (!quizResult) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-8">
      <Card className="w-full max-w-6xl mx-auto">
        <div className="w-full">
          <CardHeader className="relative">
            <CardTitle className="text-green-500 text-3xl font-bold text-center mb-2">
              Kết Quả Kiểm Tra Tâm Lý DASS-21
            </CardTitle>
            <div className="relative w-full h-[300px]">
              <Image
                src="https://firebasestorage.googleapis.com/v0/b/healing-community.appspot.com/o/banner%2Flotus-login.jpg?alt=media&token=b948162c-1908-43c1-8307-53ea209efc4d"
                alt="Test Result Illustration"
                fill
                className="rounded-lg object-cover"
              />
            </div>
          </CardHeader>
          <CardContent className="p-6 mb-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-green-100 p-4 rounded-lg">
                <h3 className="font-bold text-green-700">Căng thẳng</h3>
                <p className="text-gray-700">
                  Điểm số: {quizResult.data.stressScore}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {quizResult.data.sressDescription}
                </p>
              </div>
              <div className="bg-blue-100 p-4 rounded-lg">
                <h3 className="font-bold text-blue-700">Lo Âu</h3>
                <p className="text-gray-700">
                  Điểm số: {quizResult.data.anxietyScore}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {quizResult.data.anxietyDescription}
                </p>
              </div>
              <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="font-bold text-red-700">Trầm Cảm</h3>
                <p className="text-gray-700">
                  Điểm số: {quizResult.data.depressionScore}
                </p>
                <p className="text-sm mt-2 text-gray-700">
                  {quizResult.data.depressionDescription}
                </p>
              </div>
            </div>
          </CardContent>
        </div>
        <ContentTestResultTabs />
        <ButtonTestAgain />
      </Card>
    </div>
  );
}
