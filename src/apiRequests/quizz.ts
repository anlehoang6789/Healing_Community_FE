import http from "@/lib/http";
import {
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

  submitDass21Quiz: (body: SubmitQuizScoreType) =>
    http.post<{ message: string }>("quizz/api/quiz/submit_dass21_quizz", body),
};

export default quizApiRequest;
