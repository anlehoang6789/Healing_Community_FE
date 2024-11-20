import http from "@/lib/http";
import {
  Dass21ScoreResponseType,
  QuizResponseType,
  SubmitQuizScoreType,
} from "@/schemaValidations/quizz.schema";

const quizApiRequest = {
  getDass21Quiz: async () => {
    try {
      const response = await http.get<QuizResponseType>(
        "quizz/api/quiz/get_dass21_quizz"
      );

      if (response.status === 200) {
        return response.payload;
      }

      throw new Error(response.payload.message);
    } catch (error) {
      console.error("Failed to fetch DASS21 quiz:", error);
      throw error;
    }
  },

  // Phương thức mới để submit quiz và lấy kết quả
  submitAndGetDass21QuizResult: async (body: SubmitQuizScoreType) => {
    try {
      const response = await http.post<Dass21ScoreResponseType>(
        "quizz/api/quiz/submit_dass21_quizz",
        body
      );

      if (response.status === 200) {
        return response.payload;
      }

      throw new Error(response.payload.message);
    } catch (error) {
      console.error("Failed to submit DASS21 quiz and get result:", error);
      throw error;
    }
  },
};

export default quizApiRequest;
