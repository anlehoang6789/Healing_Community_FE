"use client";
import React from "react";
import { useGetMBTIResultQuery } from "@/queries/useQuizz";

export default function SolutionMBTI() {
  const { data: quizResult } = useGetMBTIResultQuery();

  // Hàm phân tách và render các tác động ngắn hạn
  const renderLongTermEffects = (effects: any[]) => {
    return effects.map((effect, index) => (
      <li key={index} className="mb-2 pl-4 relative text-textChat">
        <span className="absolute left-0 top-1 text-red-500">•</span>
        {effect}
      </li>
    ));
  };

  if (!quizResult) {
    return <div>Không có dữ liệu kết quả</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 uppercase">
        Tác Động Ngắn Hạn
      </h2>

      <div
        className="rounded-lg"
        style={{
          overflowWrap: "break-word",
          wordWrap: "break-word",
        }}
      >
        {quizResult.payload.data.longTermEffects &&
        quizResult.payload.data.longTermEffects.length > 0 ? (
          <ul className="list-none space-y-2 ">
            {renderLongTermEffects(quizResult.payload.data.longTermEffects)}
          </ul>
        ) : (
          <p className="text-gray-700">
            Không có thông tin về tác động dài hạn
          </p>
        )}
      </div>
    </div>
  );
}
