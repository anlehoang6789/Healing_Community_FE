import http from "@/lib/http";
import {
  Dass21ScoreResponseType,
  MBTIScoreResponseType,
  QuizMBTIResponseType,
  QuizResponseType,
  SubmitQuizMBTIScoreType,
  SubmitQuizScoreType,
} from "@/schemaValidations/quizz.schema";

const quizApiRequest = {
  getDass21Quiz: async () => {
    try {
      const response = await http.get<QuizResponseType>(
        "quiz/api/quiz/get_dass21_quizz"
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
        "quiz/api/quiz/submit_dass21_quizz",
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

  getMTBIQuiz: async () => {
    try {
      const response = await http.get<QuizMBTIResponseType>(
        "quiz/api/quiz/get-mbti21-quiz"
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

  submitAndGetMBTIQuizResult: async (body: SubmitQuizMBTIScoreType) => {
    try {
      const response = await http.post<MBTIScoreResponseType>(
        "quiz/api/quiz/submit-mbti21-quizz",
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
  getDass21Result: () =>
    http.get<Dass21ScoreResponseType>("quiz/api/quiz/get_dass21_result"),
  getMBTIResult: () =>
    http.get<MBTIScoreResponseType>("quiz/api/quiz/get-mbti21-result"),
};

export default quizApiRequest;
