import React, { useEffect, useState } from "react";
import { Dass21ScoreResponseType } from "@/schemaValidations/quizz.schema";

export default function Solution() {
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

  // Hàm phân tách và render các tác động ngắn hạn
  const renderLongTermEffects = (effects: any[]) => {
    return effects.map((effect, index) => (
      <li key={index} className="mb-2 pl-4 relative text-muted-foreground">
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
        {quizResult.data.longTermEffects &&
        quizResult.data.longTermEffects.length > 0 ? (
          <ul className="list-none space-y-2 ">
            {renderLongTermEffects(quizResult.data.longTermEffects)}
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
