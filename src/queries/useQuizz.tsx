import quizApiRequest from "@/apiRequests/quizz";
import { Dass21ScoreResponseType, QuizResponseType, SubmitQuizScoreType } from "@/schemaValidations/quizz.schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook to get the DASS21 quiz questions
export const useGetDass21QuizQuery = () => {
  return useQuery<QuizResponseType>({
    queryKey: ["dass21-quiz"],
    queryFn: quizApiRequest.getDass21Quiz,
  });
};

// Hook to submit the quiz answers and get result
export const useSubmitDass21QuizMutation = (options?: {
  onSuccess?: (data: Dass21ScoreResponseType) => void;
  onError?: (error: Error) => void;
}) => {
  const queryClient = useQueryClient();

  return useMutation<Dass21ScoreResponseType, Error, SubmitQuizScoreType>({
    // Sử dụng phương thức mới submitAndGetDass21QuizResult
    mutationFn: quizApiRequest.submitAndGetDass21QuizResult,

    onSuccess: (data) => {
      // Invalidate bất kỳ query nào liên quan nếu cần
      queryClient.invalidateQueries({
        queryKey: ["dass21-quiz-result"],
      });

      // Gọi callback onSuccess nếu được truyền vào
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },

    onError: (error) => {
      // Xử lý lỗi
      console.error("Error submitting DASS21 quiz:", error);

      // Gọi callback onError nếu được truyền vào
      if (options?.onError) {
        options.onError(error);
      }
    },
  });
};
