import React, { useEffect, useState } from "react";
import { Dass21ScoreResponseType } from "@/schemaValidations/quizz.schema";

export default function Reason() {
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

  // Hàm phân tách văn bản thành các đoạn
  const parseOverallComment = (comment: string) => {
    // Loại bỏ các ký tự trắng thừa
    const cleanComment = comment.trim();

    // Tách văn bản thành các đoạn sử dụng các điểm mấu chốt
    const sections = cleanComment
      .split(/(?=\n|Nguyên nhân:|Lời khuyên:)/)
      .map((section) => section.trim())
      .filter((section) => section !== "");

    return sections;
  };

  // Hàm render các phần của comment
  const renderCommentSections = (comment: string) => {
    const sections = parseOverallComment(comment);

    return sections.map((section, index) => {
      // Xử lý các phần đặc biệt
      if (section.startsWith("Nguyên nhân:")) {
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-red-600 mb-2">
              Nguyên nhân
            </h3>
            <p className="text-textChat">
              {section.replace("Nguyên nhân:", "").trim()}
            </p>
          </div>
        );
      }

      if (section.startsWith("Lời khuyên:")) {
        return (
          <div key={index} className="mb-4">
            <h3 className="text-lg font-semibold text-green-600 mb-2">
              Lời khuyên
            </h3>
            <p className="text-textChat">
              {section.replace("Lời khuyên:", "").trim()}
            </p>
          </div>
        );
      }

      // Các đoạn văn bản chính
      return (
        <p key={index} className="mb-3 text-textChat">
          {section}
        </p>
      );
    });
  };

  if (!quizResult) {
    return <div>Không có dữ liệu kết quả</div>;
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 uppercase">
        NHẬN ĐỊNH TỔNG THỂ VỀ SỨC KHỎE TÂM LÝ
      </h2>

      <div className="rounded-lg">
        <div className="space-y-4">
          {quizResult.data.overallComment ? (
            <>{renderCommentSections(quizResult.data.overallComment)}</>
          ) : (
            <p>Không có nhận định chi tiết</p>
          )}
        </div>
      </div>
    </div>
  );
}
