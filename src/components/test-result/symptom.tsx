import React, { useEffect, useState } from "react";
import { Dass21ScoreResponseType } from "@/schemaValidations/quizz.schema";

export default function Symptom() {
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

  // Hàm phân tách và render các yếu tố
  const renderFactors = (factors: any[]) => {
    return factors.map((factor, index) => (
      <li key={index} className="mb-2 pl-4 relative text-textChat">
        <span className="absolute left-0 top-1 text-green-500">•</span>
        {factor}
      </li>
    ));
  };

  if (!quizResult) {
    return <div>Không có dữ liệu kết quả</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 uppercase">
        Các Yếu Tố Ảnh Hưởng Đến Tình Trạng Tâm Lý
      </h2>

      <div
        className=" rounded-lg"
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
        }}
      >
        {quizResult.data.factors && quizResult.data.factors.length > 0 ? (
          <ul className="list-none space-y-2">
            {renderFactors(quizResult.data.factors)}
          </ul>
        ) : (
          <p className="text-gray-700">
            Không có thông tin chi tiết về các yếu tố ảnh hưởng
          </p>
        )}
      </div>
    </div>
  );
}
